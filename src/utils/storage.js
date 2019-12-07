/**
 * 本地存储实现,封装localStorage和sessionStorage
 * set(key, val)
 set storage with key and val

 get(key, def)
 get storage with key, return def if not find

 remove(key)
 remove storage with key

 has(key)
 determine storage has the key

 clear()
 clear all storages

 getAll()
 get all the storages

 forEach(callback)
 forEach the storages and call the callback function with each storage
 *
 *
 */
let localStore = {
  /* eslint-disable no-undef */
  version: '1.1.0',
  storage: window.localStorage,
  session: {
    storage: window.sessionStorage
  }
}

const api = {
  set (key, val) {
    if (this.disabled) {
      return
    }
    if (val === undefined) {
      return this.remove(key)
    }
    this.storage.setItem(key, serialize(val))
    return val
  },

  get (key, def) {
    if (this.disabled) {
      return def
    }
    let val = deserialize(this.storage.getItem(key))
    return (val === undefined ? def : val)
  },

  has (key) {
    return this.get(key) !== undefined
  },

  remove (key) {
    if (this.disabled) {
      return
    }
    this.storage.removeItem(key)
  },

  clear () {
    if (this.disabled) {
      return
    }
    this.storage.clear()
  },

  getAll () {
    if (this.disabled) {
      return null
    }
    let ret = {}
    this.forEach((key, val) => {
      ret[key] = val
    })
    return ret
  },

  forEach (callback) {
    if (this.disabled) {
      return
    }
    for (let i = 0; i < this.storage.length; i++) {
      let key = this.storage.key(i)
      callback(key, this.get(key))
    }
  }
}

Object.assign(localStore, api)

Object.assign(localStore.session, api)

function serialize (val) {
  return JSON.stringify(val)
}

function deserialize (val) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}

try {
  const testKey = '__localStore__'
  localStore.set(testKey, testKey)
  if (localStore.get(testKey) !== testKey) {
    localStore.disabled = true
  }
  localStore.remove(testKey)
} catch (e) {
  localStore.disabled = true
}

export default localStore
