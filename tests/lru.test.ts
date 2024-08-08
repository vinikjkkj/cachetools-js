import { LRUCache } from '../src'

describe('LRUCache', () => {
    let cache: LRUCache

    beforeEach(() => {
        cache = new LRUCache({maxsize: 5})
    })

    test('should set and get value correctly', () => {
        cache.set('key', 'value')
        expect(cache['key']).toBe('value')
    })

    test('should delete a key correctly', () => {
        cache.set('key', 'value')
        let key = cache['key']

        cache.del('key')
        expect(key).not.toBe(cache['key'])
    })

    
    test('should delete a key based in LRU correctly', () => {
        //set 5 keys in cache -- maxsize
        cache.set('key', 'value')
        cache.set('key1', 'value')
        cache.set('key2', 'value')
        cache.set('key3', 'value')
        cache.set('key4', 'value')

        //get some keys
        cache['key']
        cache['key1']

        //key deleted need to be 'key2' when add one key
        cache.set('key6', 'value')
        expect(cache['key2']).toBeUndefined()
    })

    test('should take a key correctly', () => {
        cache.set('key', 'value')
        let key = cache.take('key')

        expect(key).not.toBe(cache['key'])
    })

    test('should delete all keys', () => {
        cache.set('key', 'value')
        cache.set('key1', 'value')
        cache.set('key2', 'value')

        cache.delAll()

        expect(cache.length()).toBe(0)
    })

    test('should return keys and values', () => {
        cache.set('key', 'value')

        expect(cache.keys()).toBeInstanceOf(Array)
        expect(cache.keys().length).toBe(cache.length())

        expect(cache.values()).toBeInstanceOf(Array)
        expect(cache.values().length).toBe(cache.length())
    })

    test('should emit events correctly', () => {
        //set event
        const setMock = jest.fn()
        cache.on('set', setMock)
        cache['key'] = 'value'
        expect(setMock).toHaveBeenCalledTimes(1)

        //get event
        const getMock = jest.fn()
        cache.on('get', getMock)
        cache['key']
        expect(getMock).toHaveBeenCalledTimes(1)

        //del event
        const delMock = jest.fn()
        cache.on('del', delMock)
        cache.del('key')
        expect(delMock).toHaveBeenCalledTimes(1)

        //expired event
        const expireMock = jest.fn()
        cache.on('expired', expireMock)

        //maxsize is 5 -- one will be deleted
        cache.set('key1', 'value')
        cache.set('key2', 'value')
        cache.set('key3', 'value')
        cache.set('key4', 'value')
        cache.set('key5', 'value')
        cache.set('key6', 'value')

        expect(expireMock).toHaveBeenCalledTimes(1)
    })
})