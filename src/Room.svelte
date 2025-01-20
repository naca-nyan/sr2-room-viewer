<script lang="ts">
    import Avatar from "./Avatar.svelte";
    export function joinUri(groupname, password, pid, mode, room_id) {
        const obj = { mode, pid, groupname, password, room_id };
        const params = new URLSearchParams(obj);
        const str = "joingroup?" + params.toString();
        return "syncroom2:" + btoa(str);
    }
    const lockImg =
        "https://syncroom.yamaha.com/assets-v2/img/play/room/icon_lock.png";
    let { room }: { room: Room } = $props();

    function linkify(text: string) {
        if (!text) return "";
        const maxLength = 36;
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url) => {
            const truncated =
                url.length > maxLength
                    ? url.substring(0, maxLength - 3) + "..."
                    : url;
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${truncated}</a>`;
        });
    }
</script>

<article>
    {#if room.needPasswd}
        <img class="lock" src={lockImg} alt="lock" />
    {/if}
    <h1>
        <a href={joinUri(room.name, "", 4, 2, room.roomId)}>
            {room.name}
        </a>
    </h1>

    <ul class="avatar">
        {#each room.members as member (member.userId)}
            <Avatar {member} />
        {/each}
    </ul>
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
        background-color: #fff;
        border-radius: 23px;
        padding: 15px;
        margin: 10px;
        width: 100%;
        @media (min-width: 600px) {
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
</style>
