import storage from 'good-storage'

const SELL_KEY = '__seller__'

export function saveToLocal(id, key, val) {
  const seller = storage.get(SELL_KEY, {})
  if (!seller[id]) {
    seller[id] = {}
  }
  seller[id][key] = val
  storage.set(SELL_KEY, seller)
}
export function loadFromLocal(id, key, def) {
  const seller = storage.get(SELL_KEY, {})
  if (!seller[id]) {
    return def
  }
  return seller[id][key] || def
}
