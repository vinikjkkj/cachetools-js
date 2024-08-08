import { CacheParams, Keyable } from '../types'
import { Cache } from './cache'
import { MissingSize } from '../utils'

/**
 * ### About
 * This cache removes values based on **LRU (Least Recently Used)**.
 *
 * When the cache is full, it will remove the least recently used key.
 *
 * ### Example
 * ```typescript
 * const cache = new LRUCache({maxsize: 2})
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
 * //'foo' key will be removed, because is less recently used
 *
 * ```
*/
export class LRUCache extends Cache {
    /**
    * Creates a new LRUCache.
    */
    constructor(params: CacheParams){
        if (!params.maxsize){
            throw new MissingSize()
        }

        super({
            maxsize: params.maxsize,
            useClones: params.useClones
        })
    }

    get(key: Keyable){
        const value = super.get(key)

        if (value) {
            this._cache.delete(key)
            this._cache.set(key, value)
        }

        return value
    }

    set(key: Keyable, value: unknown){
        if (this.length() === this._params.maxsize){
            const toDel = this._cache.keys().next().value

            this._cache.delete(toDel)
            this.emit('expired', toDel)
        }
        super.set(key, value)
    }
}
