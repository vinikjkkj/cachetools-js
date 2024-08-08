import { CacheParams, Keyable } from '../types'
import { Cache } from './cache'
import { MissingSize } from '../utils'

/**
 * ### About
 * This cache removes values based on **LFU (Least Frequently Used)**.
 *
 * When the cache is full, it will remove the least frequently used key.
 *
 * ### Example
 * ```typescript
 * const cache = new LFUCache({maxsize: 2})
 *
 * //store some keys
 * cache['foo'] = 'bar'
 * cache['bar'] = 'foo'
 *
 * //get 'bar' key, increment use
 * cache['bar']
 *
 * //try to store another key
 * cache['baz'] = 'foo'
 * //'foo' key will be removed, because have 0 uses, and 'bar' have 1 use
 *
 * ```
*/
export class LFUCache extends Cache {
    protected _uses: { [key: Keyable]: number }

    /**
    * Creates a new LFUCache.
    */
    constructor(params: CacheParams){
        if (!params.maxsize){
            throw new MissingSize()
        }

        super({
            maxsize: params.maxsize,
            useClones: params.useClones
        })

        this._uses = {}
    }

    get(key: Keyable){
        const value = super.get(key)

        if (value) {
            this._uses[key] = (this._uses[key] || 0) + 1
        }

        return value
    }

    set(key: Keyable, value: unknown){
        if (this.length() === this._params.maxsize){
            const keys = Object.entries(this._uses)
            const toDelNumber = Math.min(...keys.map(v => v[1]))
            const toDel = keys.find(v => v[1] === toDelNumber)?.[0] as Keyable

            this.del(toDel)

            delete this._uses[toDel]
            this.emit('expired', toDel)
        }

        this._uses[key] = 1
        super.set(key, value)
    }
}
