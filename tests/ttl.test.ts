import { TTLCache, SizeError } from '../src'

describe('TTLCache', () => {
    let cache: TTLCache

    beforeEach(() => {
        cache = new TTLCache({maxsize: 2})
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

    test('should take a key correctly', () => {
        cache.set('key', 'value')
        let key = cache.take('key')

        expect(key).not.toBe(cache['key'])
    })

    test('should expire keys after TTL', (done) => {
        cache.set('key', 'value', 100)
        setTimeout(() => {
            expect(cache.get('key')).toBeUndefined()
            done()
        }, 150)
    })

    test('should throw SizeError when exceeding maxsize', () => {
        cache.set('key', 'value')
        cache.set('key1', 'value')
        
        expect(() => {
            cache.set('key2', 'value')
        }).toThrow(SizeError)
    })

    test('should delete all keys', () => {
        cache.set('key', 'value')
        cache.set('key1', 'value')

        cache.delAll()

        expect(cache.length()).toBe(0)
    })

    test('should clear timeout on delete', (done) => {
        cache.set('key', 'value', 100)
        cache.del('key')
        setTimeout(() => {
            expect(cache.get('key')).toBeUndefined()
            done()
        }, 150)
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

        cache.set('key1', 'value', 100)
        setTimeout(() => {
            expect(expireMock).toHaveBeenCalledTimes(1)
        }, 200)
    })
})