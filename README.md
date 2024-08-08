
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

### Pooling Caches
You can store all your caches in one variable, recommended in big projects to organize code

#### Create new pool
```typescript
import { CachePool } from 'cachetools-js'

const pool = new CachePool({maxsize: 10})
```
#### Create a cache in pool
```typescript
//create a new TTLCache in pool, this function return the new cache
pool.createCache('c1', 'ttl', {ttl: 10})
```
#### Get a cache in pool
```typescript
const cache = pool.getCache('c1')
```
#### Del a cache in pool
```typescript
pool.delCache('c1')
```
#### Del all caches in pool
```typescript
pool.delAllCaches()
```
#### Set a key in some cache in pool
```typescript
pool.createCache('c1', 'ttl', {ttl: 10})

pool.set('c1', 'key', 'value')
```
#### Get a key in some cache in pool
```typescript
pool.createCache('c1', 'ttl', {ttl: 10})

const cache = pool.get('c1', 'key')
```
#### Del a key in some cache in pool
```typescript
pool.createCache('c1', 'ttl', {ttl: 10})

pool.del('c1', 'key')
```
#### Del all keys in some cache in pool
```typescript
pool.createCache('c1', 'ttl', {ttl: 10})

pool.delAll('c1')
```
#### Get the length of pool
```typescript
pool.createCache('c1', 'ttl', {ttl: 10})

const length = pool.length()
```

### Decorator
You can decore a function to apply caching if you use same args

#### How to Use
```typescript
import { cacheDecorator, TTLCache } from 'cachetools-js'

//function to sum values
const fn = (...args: number[]) => args.reduce((p, c) => p + c)
const cache = new TTLCache({ttl: 1000})
const decoredFn = cacheDecorator(fn, cache)

//will store result in cache and return
await decoredFn(1, 2, 3)

//will return cached value -- second call
await decoredFn(1, 2, 3)

//if you change args, the process will repeat
```
