export interface CacheParams {
    /**Defines the max quantity of keys that will be stored, in some caches this param is required, default is `undefined` */
    maxsize?: number
    /**If true, will create a **deep copy** of all data before store, default is `false` */
    useClones?: boolean
}

export interface TTLParams extends CacheParams {
    /** It's the **Time to Live** of cache in **ms**, if you dont provide `ttl` param in `set` function, this ttl will be used, if not provided, the cache will not delete keys */
    ttl?: number
}

export interface RRParams extends CacheParams {
    /**Random logic for deletion of keys in cache, default is `Math.floor(Math.random * length)` */
    randomLogic?: (length: number) => number
}

export type ParamsLike = CacheParams | TTLParams | RRParams

export interface CachePoolParams {
    /**Defines the max quantity of caches that will be stored, this param is optional, default is `undefined` */
    maxsize?: number
}
