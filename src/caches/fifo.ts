import { CacheParams, Keyable } from '../types'
import { Cache } from './cache'
import { MissingSize } from '../utils'

/**
 * ### About
 * This cache remove values based in **FIFO (First In, First Out)**,
 * when cache is full, will remove the first key stored
 *
 * ### Example
 * ```typescript
 * const cache = new FIFOCache({maxsize: 2})
 *
 * //store some keys
 * cache['foo'] = 'bar'
 * cache['bar'] = 'foo'
 *
 * //get 'bar' key
 * cache['bar']
 *
 * //try to store another key
 * cache['baz'] = 'foo'
 * //'foo' key will be removed, because was added before 'bar' key
 *
 * ```
*/
export class FIFOCache extends Cache {
    /**
    * Creates a new FIFOCache.
    */
    constructor(params: CacheParams){
        if (!params.maxsize){
            throw new MissingSize()
        }

        super({
            maxsize: params.maxsize,
            useClones: params.useClones
        })
    }

    set(key: Keyable, value: unknown){
        if (this.length() === this._params.maxsize){
            const toDel = this._cache.keys().next().value

            this.del(toDel)
            this.emit('expired', toDel)
        }

        super.set(key, value)
    }
}
