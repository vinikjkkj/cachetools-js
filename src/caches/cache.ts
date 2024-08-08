import { CacheEmitter, SizeError } from '../utils'
import { CacheParams, Keyable } from '../types'

/**
 * ### About
 * Simple cache base class, based on `Proxy`, which allows getting and setting keys like a regular object.
 *
 * This class is useful if you want to create custom cache logic.
 *
 * It can also be used for personal purposes, although its specific application might not be obvious in all cases.
 *
 * ### Example
 * ```typescript
 * const cache = new Cache({maxsize: 2})
 *
 * //store some keys
 * cache['foo'] = 'bar'
 * cache['bar'] = 'foo'
 *
 * //get 'bar' key
 * cache['bar']
 *
 * //try to store another key
 * cache['baz'] = 'foo'
 * //throws SizeError, you need to delete some key to store another key
 *
 * ```
*/
export class Cache extends CacheEmitter {
    protected _cache: Map<Keyable, unknown>
    protected _params: CacheParams

    [key: string | symbol]: unknown

    /**
    * Creates a new Cache.
    */
    constructor(params: CacheParams){
        super()
        this._cache = new Map()
        this._params = params

        return new Proxy(this, {
            get: (target, key) => {
                if ((target as any)[key]) {
                    return (target as any)[key]
                } else {
                    return target.get(key)
                }
            },
            set: (target, key, value) => {
                if (typeof key === 'string' && key.startsWith('_')) {
                    (target as any)[key] = value
                } else {
                    target.set(key, value)
                }

                return true
            }
        });
    }

    get(key: Keyable){
        this.emit('get', key)
        return this._cache.get(key)
    }

    set(key: Keyable, value: unknown){
        this.emit('set', { key, value })
        if (
            this._params.maxsize &&
            this.length() === this._params.maxsize
        ){
            throw new SizeError()
        }
        this._cache.set(key, this._params.useClones ?
            structuredClone(value) :
            value
        )
    }

    take(key: Keyable){
        const value = this.get(key)
        this.del(key)
        return value
    }

    del(key: Keyable){
        this.emit('del', key)
        this._cache.delete(key)
    }

    delAll(){
        this._cache.clear()
    }

    keys(){
        return Array.from(this._cache.keys())
    }

    values(){
        return Array.from(this._cache.values())
    }

    length(){
        return this._cache.size
    }
}
