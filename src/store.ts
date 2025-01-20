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
