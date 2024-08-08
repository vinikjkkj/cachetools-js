import { CacheLike } from '../types'

export function cacheDecorator
    <T extends (...args: any[]) => Promise<any> | any>
    (fn: T, cache: CacheLike): T {
    return async function (...args: Parameters<T>): Promise<ReturnType<T>> {
        const key = args.join('.')

        const cachedResult = cache.get(key)
        if (cachedResult) {
            return cachedResult as ReturnType<T>
        }

        const result = await fn(...args)

        if (cache) {
            cache.set(key, result)
        }

        return result
    } as T
}
