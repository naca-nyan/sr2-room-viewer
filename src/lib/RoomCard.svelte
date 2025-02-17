<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import { tags as i18n_tags } from "../i18n";
  import { temporaryMode } from "../store";
  let { room }: { room: Room } = $props();

  function joinUri(groupname, password, pid, mode, room_id) {
    const obj = { mode, pid, groupname, password, room_id };
    const params = new URLSearchParams(obj);
    const str = "joingroup?" + params.toString();
    return "syncroom2:" + btoa(str);
  }
  function linkify(text: string) {
    if (!text) return "";
    const maxLength = 36;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      const truncated =
        url.length > maxLength ? url.substring(0, maxLength - 3) + "..." : url;
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${truncated}</a>`;
    });
  }
  const lockImg = `https://syncroom.yamaha.com/assets-v2/img/play/room/icon_lock.png`;
  const members = room.members.filter(
    (m, i, arr) => arr.findIndex((n) => n.userId === m.userId) === i, // uniq by userId
  );
  const mode = $derived($temporaryMode ? 3 : 2);
</script>

<article>
  {#if room.needPasswd}
    <img class="lock" src={lockImg} alt="lock" />
  {/if}
  <h1>
    <a href={joinUri(room.name, "", 4, mode, room.roomId)}>{room.name}</a>
    <small>({room.members.length}/{room.maxMemberCount})</small>
  </h1>

  <ul class="avatar">
    {#each members as member (member.userId)}
      <Avatar {member} />
    {:else}
      <small>（メンバーなし）</small>
    {/each}
  </ul>
  <div class="tag">
    {#each room.tags as tag}
      <span>{i18n_tags(tag)}</span>
    {/each}
    {#each room.customTags as tag}
      <span>{tag}</span>
    {/each}
  </div>
  <p class="description">
    {#if room.description}
      {@html linkify(room.description)}
    {:else}
      <small>（説明なし）</small>
    {/if}
  </p>
</article>

<style>
  article {
    background-color: #191d52;
    @media (prefers-color-scheme: light) {
      background-color: #fff;
    }
    border-radius: 23px;
    padding: 15px;
    margin: 10px;
    width: 100%;
    @media (min-width: 700px) {
      width: 300px;
    }
  }
  img.lock {
    float: right;
    position: relative;
    width: 50px;
    top: -15px;
    right: -15px;
  }
  h1 {
    text-align: center;
    font-size: 1em;
  }
  ul.avatar {
    padding-inline-start: 5px;
  }
  p.description {
    white-space: pre-wrap;
    max-height: 200px;
    overflow: auto;
  }
  p.description small {
    color: #c4c4c4;
  }
  div.tag {
    display: flex;
    flex-wrap: wrap;
  }
  div.tag span {
    color: #78789c;
    background-color: #000636;
    @media (prefers-color-scheme: light) {
      color: #020055;
      background-color: #eff1ff;
    }
    font-size: 0.8rem;
    border-radius: 20px;
    margin: 2px;
    padding: 2px 10px;
  }
</style>
