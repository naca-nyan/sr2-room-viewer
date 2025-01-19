<script lang="ts">
  import RoomCard from "./Room.svelte";
  async function load() {
    const resp = await fetch(
      `https://webapi.syncroom.appservice.yamaha.com/rooms/guest/online`,
    );
    return (await resp.json()) as Online;
  }

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
  {#await load()}
    <p>loading...</p>
  {:then data}
    {#each filter(data.rooms, filterLock, filterCountry) as room}
      <RoomCard {room} />
    {/each}
  {/await}
</main>

<style>
  h1 {
    text-align: center;
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
