import { CachePool, FIFOCache, LFUCache, LRUCache, RRCache, TTLCache } from '../src'
import { AlreadyExists } from '../src/utils'

describe('CachePool', () => {
    let caches: CachePool

    beforeEach(() => {
        caches = new CachePool({maxsize: 10})
    })

    test('should create a cache and get it', () => {
        const cache = caches.createCache('c1', 'ttl', {ttl: 10})

        expect(caches.getCache('c1')).toBe(cache)
    })

    test('should create a cache with corretly instances', () => {
        expect(
            caches.createCache('c1', 'ttl', {ttl: 10})
        ).toBeInstanceOf(TTLCache)

        expect(
            caches.createCache('c2', 'fifo', {maxsize: 10})
        ).toBeInstanceOf(FIFOCache)

        expect(
            caches.createCache('c3', 'lru', {maxsize: 10})
        ).toBeInstanceOf(LRUCache)

        expect(
            caches.createCache('c4', 'lfu', {maxsize: 10})
        ).toBeInstanceOf(LFUCache)

        expect(
            caches.createCache('c5', 'rr', {maxsize: 10})
        ).toBeInstanceOf(RRCache)
    })

    test('should throw AlreadyExists error', () => {
        caches.createCache('c1', 'ttl', {ttl: 10})
        expect(
            () => caches.createCache('c1', 'ttl', {ttl: 10})
        ).toThrow(AlreadyExists)
    })

    test('should delete a cache and update length', () => {
        caches.createCache('c1', 'ttl', {ttl: 10})
        caches.delCache('c1')

        expect(caches.length()).toBe(0)
        expect(caches.getCache('c1')).toBeUndefined()
    })
})