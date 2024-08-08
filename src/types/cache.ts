import { Cache, LRUCache, LFUCache, TTLCache, RRCache, FIFOCache } from '../caches'

export type Keyable = string | number | symbol

export type CacheTypes = 'cache' | 'ttl' | 'lru' | 'lfu' | 'rr' | 'fifo'

export type CacheLike = Cache | TTLCache | LRUCache | LFUCache | RRCache | FIFOCache

export const CachesObj = {
    'cache': Cache,
    'ttl': TTLCache,
    'lru': LRUCache,
    'lfu': LFUCache,
    'rr': RRCache,
    'fifo': FIFOCache
}
