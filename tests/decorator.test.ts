import { Cache, cacheDecorator, CacheLike } from '../src'

describe('Decorator', () => {
    let fn: (...args: number[]) => number
    let cache: CacheLike
    let cachedFunc: (...args: number[]) => number

    beforeEach(() => {
        fn = (...args) => args.reduce((p, c) => p + c)
        cache = new Cache({maxsize: 10})
        cachedFunc = cacheDecorator(fn, cache)
    })

    test('should get a cached value', async () => {
        //store a value
        await cachedFunc(1, 2, 3)

        //get a value
        expect(
            cache['1.2.3']
        ).toBe(6)

        //use a value
        await cachedFunc(1, 2, 3)

        //store new value
        await cachedFunc(1, 2, 3, 4)

        //get a value
        expect(
            cache['1.2.3.4']
        ).toBe(10)

        //check cache length -- 2 values
        expect(
            cache.length()
        ).toBe(2)
    })
})