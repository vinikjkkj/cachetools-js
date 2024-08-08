import EventEmitter from 'events'
import { CacheEvents, CachePoolEvents } from '../types'

export class CacheEmitter {
    protected _emitter

    constructor(){
        this._emitter = new EventEmitter()
    }

    emit(event: keyof CacheEvents, ...args: any[]) {
        return this._emitter.emit(event, ...args)
    }

    on<Event extends keyof CacheEvents>(event: Event, listener: CacheEvents[Event]) {
        return this._emitter.on(event, listener)
    }
}

export class CachePoolEmitter {
    protected _emitter

    constructor(){
        this._emitter = new EventEmitter()
    }

    emit(event: keyof CachePoolEvents, ...args: any[]) {
        return this._emitter.emit(event, ...args)
    }

    on<Event extends keyof CachePoolEvents>(event: Event, listener: CachePoolEvents[Event]) {
        return this._emitter.on(event, listener)
    }
}
