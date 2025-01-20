<script lang="ts">
  import RoomCard from "./lib/RoomCard.svelte";
  import { online } from "./store";
  let filterLock = "かぎなし";
  let filterCountry = "にほん";

  function filter(rooms: Room[], filterLock: string, filterCountry: string) {
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
  <select on:change={(e) => (filterLock = e.currentTarget.value)}>
    <option>かぎなし</option>
    <option>かぎあり</option>
    <option>どっちも</option>
  </select>
  <select on:change={(e) => (filterCountry = e.currentTarget.value)}>
    <option>にほん</option>
    <option>かんこく</option>
    <option>どこでも</option>
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
