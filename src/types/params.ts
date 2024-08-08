export interface CacheParams {
    /**
     * Defines the maximum number of keys that will be stored.
     * In some caches, this parameter is required; the default is `undefined`.
     */
    maxsize?: number

    /**
     * If true, a **deep copy** of all data will be created before storing.
     * The default is `false`.
     */
    useClones?: boolean
}

export interface TTLParams extends CacheParams {
    /**
     * The **Time to Live** of the cache in **ms**.
     * If you don't provide the `ttl` parameter in the `set` function, this `ttl` will be used.
     * If not provided, the cache will not delete keys.
     */
    ttl?: number
}

export interface RRParams extends CacheParams {
    /**
     * Random logic for the deletion of keys in the cache.
     * The default is `Math.floor(Math.random() * length)`.
     */
    randomLogic?: (length: number) => number
}

export type ParamsLike = CacheParams | TTLParams | RRParams

export interface CachePoolParams {
    /**
     * Defines the maximum number of caches that will be stored.
     * This parameter is optional; the default is `undefined`.
     */
    maxsize?: number
}
