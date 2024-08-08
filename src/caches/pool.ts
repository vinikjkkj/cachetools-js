import { AlreadyExists, CacheNotExists, CachePoolEmitter, CacheTypeNotExists, SizeError } from '../utils'
import { CacheLike, CachePoolParams, CachesObj, CacheTypes, Keyable, ParamsLike } from '../types'

/**
 * ### About
 * Pool of caches to store all your caches in a unique variable, making your code more cleaner and easier,
 * you can create/get/delete all types of caches, and use standard methods from caches more simplier
 *
 * ### Example
 * ```typescript
 * const caches = new CachePool({maxsize: 2})
 *
 * //create some caches
 * caches.createCache('AwesomeTTL', 'ttl', {ttl: 100})
 * caches.createCache('AwesomeLRU', 'lru', {maxsize: 4})
 *
 * //store some keys in caches
 * caches.set('AwesomeTTL', 'foo', 'bar')
 * caches.set('AwesomeLRU', 'bar', 'foo')
 *
 * //get keys in caches
 * cache['baz'] = 'foo'
 * //throws SizeError, you need to delete some key to store another key
 *
 * ```
*/
export class CachePool extends CachePoolEmitter {
    protected _caches: Map<Keyable, CacheLike>
    protected _params: CachePoolParams

    [key: string | symbol]: unknown

    constructor(params: CachePoolParams){
        super()
        this._caches = new Map()
        this._params = params
    }

    protected _getCache(cacheName: Keyable){
        const cache = this._caches.get(cacheName)

        if (!cache) {
            throw new CacheNotExists()
        }

        return cache
    }

    createCache(name: Keyable, type: CacheTypes, params?: ParamsLike){
        if (!CachesObj[type]) {
            throw new CacheTypeNotExists()
        }

        if (this._caches.has(name)) {
            throw new AlreadyExists()
        }

        if (this._params.maxsize && this.length() === this._params.maxsize) {
            throw new SizeError()
        }

        this.emit('create-cache', { name, type })
        const cache: CacheLike = new CachesObj[type](params || {})
        this._caches.set(
            name,
            cache
        )

        return cache
    }

    getCache(name: Keyable){
        this.emit('get-cache', name)
        return this._caches.get(name)
    }

    delCache(name: Keyable){
        this.emit('del-cache', name)
        this._caches.delete(name)
    }

    delAllCaches(){
        this._caches.clear()
    }

    get(cacheName: Keyable, key: Keyable){
        const cache = this._getCache(cacheName)
        return cache.get(key)
    }

    set(cacheName: Keyable, key: Keyable, value: unknown){
        const cache = this._getCache(cacheName)
        cache.set(key, value)
    }

    del(cacheName: Keyable, key: Keyable){
        const cache = this._getCache(cacheName)
        cache.del(key)
    }

    delAll(cacheName: Keyable){
        const cache = this._getCache(cacheName)
        cache.delAll()
    }

    length(){
        return this._caches.size
    }
}
