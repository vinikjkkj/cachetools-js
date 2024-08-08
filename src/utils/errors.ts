export class SizeError extends Error {
    constructor() {
        super('Attempted to set a key in a cache or pool that is full.')
    }
}

export class MissingSize extends Error {
    constructor() {
        super('The `maxsize` parameter must be provided for this cache type.')
    }
}

export class CacheNotExists extends Error {
    constructor() {
        super('Attempted to access a cache that does not exist in the pool.')
    }
}

export class CacheTypeNotExists extends Error {
    constructor() {
        super('The cache type passed to `createCache` does not exist.')
    }
}

export class AlreadyExists extends Error {
    constructor() {
        super('This cache already exists.')
    }
}

