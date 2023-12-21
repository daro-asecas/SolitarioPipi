import { run_all } from "./fn";
import { useEffect, useState } from "react"; 

export type Readable<T> = {
  get: () => T;
  subscribe: (fn: (value: T) => void) => () => void;
}

export type Writable<T> = Readable<T> & {
  set: (value: T) => void;
  invalidate: () => void;
}

export const writable = <T>(start_value: T): Writable<T> => {
  
  type Fn = (v: T) => void; 

  let value = start_value;
  
  const subs = new Set<{ fn: Fn }>();

  const subscribe = (fn: Fn) => {
    const sub = { fn };
    subs.add(sub)
    return () => {
      subs.delete(sub);
    }
  }

  const set = (new_value: T) => {
    if(value === new_value) return;
    value = new_value;
    invalidate();
  }

  const get = () => value;

  const invalidate = () => {
    for(const { fn } of subs) fn(value);
  }

  return { get, set, invalidate, subscribe };
}

/** One or more `Readable`s. */
export type Stores = Readable<any> | [Readable<any>, ...Array<Readable<any>>] | Array<Readable<any>>;

/** One or more values from `Readable` stores. */
export type StoresValues<T> = T extends Readable<infer U> ? U : { [K in keyof T]: T[K] extends Readable<infer U> ? U : never };

export function derived<S extends Stores, O>($stores: S, fn: (values: StoresValues<S>) => O): Readable<O> {
  if(!($stores instanceof Array)) {
    return derived([$stores], ([ value ]) => fn(value));
  }

  const values = () => $stores.map($store => $store.get()) as StoresValues<S>;

  const $target = writable(fn(values()))

  const onchange = () => $target.set(fn(values()));

  let count = 0;
  let unsub_all: (() => void) | null = null;

  const subscribe = (sub: (value: O) => void) => {
    count++;
    if(count === 1) {
      $target.set(fn(values()))
      const unsubs = $stores.map($store => $store.subscribe(onchange));
      unsub_all = () => run_all(unsubs);
    }

    const unsub = $target.subscribe(sub);

    return () => {
      count--;
      unsub();
      if(count === 0 && unsub_all) {
        unsub_all();
        unsub_all = null;
      }
    }
  }

  const get = () => {
    if(count === 0) return fn(values());
    return $target.get();
  }

  return { get, subscribe }
}

export const readonly = <T>(store: Writable<T>): Readable<T> => {
  const { get, subscribe } = store;
  return { get, subscribe };
}

export const useStore = <T>(store: Readable<T>): T => {
  const [value, setValue] = useState(store.get());
  useEffect(() => store.subscribe(setValue), []);
  return value;
}