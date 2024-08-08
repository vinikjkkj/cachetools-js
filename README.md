
# CacheTools-Js

Best, faster, ligther, all-in-one, fully-typed cache library for JS, based on [cachetools](https://pypi.org/project/cachetools) from python, with events, pooling and decorators.

All of most used cache types are included here, if what you are looking for does not exist here, tell us.
## Installation

#### With NPM
```bash
  npm install cachetools-js
```

#### With Yarn
```bash
  yarn add cachetools-js
```
## How to Use

### How to do operations in caches

#### Create a cache instance
```typescript
//example cache
import { TTLCache } from 'cachetools-js'

const cache = new TTLCache({ttl: 1000})
```
#### Store a key in cache
```typescript
cache['foo'] = 'bar' //recommended method
cache.set('foo', 'bar', {ttl: 500}) //second method, use this method if you wanna pass custom options
```
#### Get a key from cache
```typescript
let key = cache['foo'] //recommended method
let key = cache.get('foo') //second method
```
#### Del a key from cache
```typescript
cache.del('foo')
```
#### Take a key from cache - Get and Delete
```typescript
let key = cache.take('foo')
cache['foo'] //will be undefined
```
#### Delete all keys
```typescript
cache.delAll()
```
#### Get all keys
```typescript
let keys = cache.keys()
```
#### Get all values
```typescript
let values = cache.values()
```
#### Get cache length
```typescript
let length = cache.length()
```

### Events

#### Get event
```typescript
cache.on('get', key => console.log(key))
```
#### Set event
```typescript
cache.on('set', ({key, value}) => console.log(key, value))
```
#### Del event
```typescript
cache.on('del', key => console.log(key))
```
#### Expire event
Trigged when key expires, by a TTL, LRU, LFU...
```typescript
cache.on('expired', key => console.log(key))
```
