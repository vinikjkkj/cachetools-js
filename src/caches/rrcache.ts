import { Keyable, RRParams } from '../types'
import { Cache } from './cache'
import { MissingSize } from '../utils'

/**
 * ### About
 * This cache removes values based on **Random Logic**.
 *
 * When the cache is full, a random key will be removed according to the provided random logic.
 *
 * ### Example
 * ```typescript
 * const cache = new RRCache({maxsize: 2})
 *
 * //store some keys
 * cache['foo'] = 'bar'
 * cache['bar'] = 'foo'
 *
 * //try to store another key
 * cache['baz'] = 'foo'
 * //we dont know which key will be removed, is random
 *
 * ```
 */
export class RRCache extends Cache {
    protected _logic: (length: number) => number

    /**
    * Creates a new RRCache.
    */
    constructor(params: RRParams){
        if (!params.maxsize) {
            throw new MissingSize()
        }

        super({
            maxsize: params.maxsize,
            useClones: params.useClones
        })

        this._logic = params.randomLogic ||
            ((length) => Math.floor(Math.random() * length))
    }

    set(key: Keyable, value: unknown){
        if (this.length() === this._params.maxsize){
            const keys = this._cache.keys()
            const toDel = Array.from(keys)[this._logic(this.length())]

            this.del(toDel)
            this.emit('expired', toDel)
        }

        super.set(key, value)
    }
}
