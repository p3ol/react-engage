// jsdom is weird
// @ts-expect-error - setImmediate is readonly
global.setImmediate = global.setImmediate ||
  ((fn: (...args: any[]) => void, ...args: any[]) =>
    global.setTimeout(() => fn(...args), 0));
