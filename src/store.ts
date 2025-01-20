import { writable } from "svelte/store";

const URL = "https://webapi.syncroom.appservice.yamaha.com/rooms/guest/online";
const refreshRate = 30 * 1000;

function createOnlineStore() {
  let intervalId: number;
  const { set, subscribe } = writable<Online | null>(null, () => {
    return () => clearInterval(intervalId);
  });
  async function load() {
    const resp = await fetch(URL);
    const online: Online = await resp.json();
    set(online);
  }

  function init() {
    if (!intervalId) {
      load();
      intervalId = setInterval(load, refreshRate);
    }
  }
  init();
  return { subscribe };
}

export const online = createOnlineStore();
