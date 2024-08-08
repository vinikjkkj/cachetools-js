export class SizeError extends Error {
    constructor(){
        super('Tried to set key in cache or pool that is full')
    }
}

export class MissingSize extends Error {
    constructor(){
        super('The maxsize param need to be passed in this cache type')
    }
}

export class CacheNotExists extends Error {
    constructor(){
        super('Tried to access cache that not exists in a pool')
    }
}

export class CacheTypeNotExists extends Error {
    constructor(){
        super('Cache type passed to \'createCache\' not exists')
    }
}

export class AlreadyExists extends Error {
    constructor(){
        super('This cache already exists')
    }
}
