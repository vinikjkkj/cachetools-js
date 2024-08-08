import { CacheTypes, Keyable } from './cache'

export interface CacheEvents {
    'get': (key: Keyable) => void
    'del': (key: Keyable) => void
    'set': (param: { key: Keyable, value: unknown }) => void
    'expired': (key: Keyable) => void
}

export interface CachePoolEvents {
    'get-cache': (name: Keyable) => void
    'del-cache': (name: Keyable) => void
    'create-cache': (param: { key: Keyable, type: CacheTypes }) => void
}
