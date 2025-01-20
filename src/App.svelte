<script lang="ts">
  import { onDestroy } from "svelte";
  import RoomCard from "./lib/RoomCard.svelte";
  import Switch from "./lib/Switch.svelte";
  import { online } from "./store";
  const lockValues = ["かぎなし", "かぎあり", "どっちも"] as const;
  let filterLock = $state<(typeof lockValues)[number]>("かぎなし");
  const countryValues = ["にほん", "かんこく", "どこでも"] as const;
  let filterCountry = $state<(typeof countryValues)[number]>("にほん");

  function filter(
    rooms: Room[],
    filterLock: (typeof lockValues)[number],
    filterCountry: (typeof countryValues)[number],
  ) {
    return rooms
      .filter((r) => {
        if (filterLock === "かぎなし") return r.needPasswd === false;
        if (filterLock === "かぎあり") return r.needPasswd === true;
        return true;
      })
      .filter((r) => {
        const provider = r.ownerUser.idProvider;
        if (filterCountry === "にほん") return provider === "ymid-jp";
        if (filterCountry === "かんこく") return provider === "ymid-kr";
        return true;
      });
  }

  let autosync = $state(true);
  const refreshRate = 30 * 1000;
  const interval = setInterval(() => {
    if (autosync) online.sync();
  }, refreshRate);
  onDestroy(() => clearInterval(interval));
</script>

<h1>SYNCROOM2 Room Viewer</h1>
<div class="selector">
  <select bind:value={filterLock}>
    {#each lockValues as v}<option>{v}</option>{/each}
  </select>
  <select bind:value={filterCountry}>
    {#each countryValues as v}<option>{v}</option>{/each}
  </select>
</div>
<div class="autosync">
  自動更新(30秒) <Switch bind:checked={autosync} />
</div>
<main>
  {#if $online === null}
    <h2>loading...</h2>
  {:else}
    {#each filter($online.rooms, filterLock, filterCountry) as room (room.roomId)}
      <RoomCard {room} />
    {:else}
      <h2>（ルームなし）</h2>
    {/each}
  {/if}
</main>

<style>
  h1 {
    text-align: center;
    font-size: 2.5rem;
  }
  h2 {
    margin-top: 50px;
    font-size: 1.3rem;
    color: #757575;
  }
  .selector {
    text-align: center;
  }
  select {
    width: 200px;
    height: 50px;
    text-align: center;
  }
  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .autosync {
    text-align: end;
    padding-right: 120px;
  }
</style>
