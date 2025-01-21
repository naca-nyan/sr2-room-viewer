import { writable } from "svelte/store";

const URL = "https://webapi.syncroom.appservice.yamaha.com/rooms/guest/online";

function createOnlineStore() {
  const { set, subscribe } = writable<Online | null>(null);

  async function sync() {
    const resp = await fetch(URL);
    const online: Online = await resp.json();
    set(online);
  }

  sync();

  return { subscribe, sync };
}

export const online = createOnlineStore();

function createLocalStorageStore<T>(
  key: string,
  defaultValue: T,
  toString: (v: T) => string,
  parser: (s: string) => T,
) {
  const v = localStorage.getItem(key);
  const initialValue = v !== null ? parser(v) : defaultValue;
  const { set, subscribe } = writable<T>(initialValue);

  return {
    subscribe,
    set: (v: T) => {
      localStorage.setItem(key, toString(v));
      set(v);
    },
  };
}
export const lockValues = ["かぎなし", "かぎあり", "どっちも"] as const;
export type LockValue = typeof lockValues[number];
export const filterLock = createLocalStorageStore<LockValue>(
  "filterLock",
  "かぎなし",
  (v) => v,
  (s) => lockValues.includes(s as LockValue) ? s as LockValue : "かぎなし",
);

export const countryValues = ["にほん", "かんこく", "どこでも"] as const;
export type CountryValue = typeof countryValues[number];
export const filterCountry = createLocalStorageStore<CountryValue>(
  "filterCountry",
  "にほん",
  (v) => v,
  (s) =>
    countryValues.includes(s as CountryValue) ? s as CountryValue : "にほん",
);

export const autosync = createLocalStorageStore<boolean>(
  "autosync",
  true,
  (v) => v.toString(),
  (s) => s === "true",
);

export const temporaryMode = createLocalStorageStore<boolean>(
  "temporaryMode",
  false,
  (v) => v.toString(),
  (s) => s === "true",
);
