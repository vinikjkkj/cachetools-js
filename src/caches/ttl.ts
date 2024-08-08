import { Cache } from './cache'
import { TTLParams, Keyable } from '../types'
import { SizeError } from '../utils'

/**
 * ### About
 * This cache remove values based in TTL (Time-To-Live),
 * if you store a key with TTL of 1 second, in 1 second this key will be removed.
 *
 * ### Example
 * ```typescript
 * const cache = new TTLCache({maxsize: 2, ttl: 1000})
 *
 * //store some keys
 *
 * //default ttl will be used (1000)
 * cache['foo'] = 'bar'
 *
 * //custom ttl will be used (500)
 * cache.set('bar', 'foo', 500)
 * 
 * //store another key
 * cache['baz'] = 'foo'
 * //throws SizeError, you need to delete some key to store another key
 *
 * //will log: undefined
 * setTimeout(() => console.log(cache['bar']), 1000)
 *
 * ```
 */
export class TTLCache extends Cache {
    protected _timeouts: Map<Keyable, NodeJS.Timeout>
    protected _defaultTTL?: number

    /**
    * Creates a new TTLCache.
    */
    constructor(params: TTLParams){
        super({
            maxsize: params.maxsize,
            useClones: params.useClones
        })

        this._timeouts = new Map()
        if (params.ttl) {
            this._defaultTTL = params.ttl
        }
    }

    set(key: Keyable, value: unknown, ttl = 0){
        super.set(key, value)

        if (this._timeouts.has(key)) {
            clearTimeout(
                this._timeouts.get(key)
            )

            this._timeouts.delete(key)
        }

        if (ttl || this._defaultTTL){
            this._timeouts.set(
                key,
                setTimeout(
                    () => {
                        this.del(key)
                        this.emit('expired', key)
                    },
                    ttl || this._defaultTTL
                )
            )
        }
    }

    del(key: Keyable){
        super.del(key)
        if (this._timeouts.has(key)) {
            clearTimeout(
                this._timeouts.get(key)
            )
            this._timeouts.delete(key)
        }
    }
}
