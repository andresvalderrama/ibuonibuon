var n = -1

export var UID_PREFIX = '_ui.'

export function nextUid (t = '_ui.') {
  return t + ++n
}

export default {
  UID_PREFIX: UID_PREFIX,
  nextUid: nextUid
}