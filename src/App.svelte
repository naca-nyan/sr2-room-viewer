<script lang="ts">
  import RoomCard from "./lib/RoomCard.svelte";
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
    margin-bottom: 20px;
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
</style>
