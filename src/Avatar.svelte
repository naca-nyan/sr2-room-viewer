<script lang="ts">
    const { member }: { member: UserMember } = $props();
    const { avatar, nickname } = member;
    function getURL(avatar: User["avatar"]) {
        if (avatar.type === "url") {
            return avatar.url;
        } else {
            const base = `https://syncroom.yamaha.com/assets-v2/img/play/room/preset`;
            const shapeKey = avatar.preset?.shapeKey ?? "user2";
            const colorCode = avatar.preset?.colorCode ?? "e9ebff";
            return `${base}/avatar_${shapeKey}_${colorCode}.png`;
        }
    }
</script>

<div>
    <img src={getURL(avatar)} alt={avatar.url} />
    <span>{nickname}</span>
</div>

<style>
    div {
        display: flex;
        align-items: center;
        padding: 3px 0px;
    }
    img {
        width: 35px;
        border-radius: 50%;
    }
    span {
        padding-left: 5px;
    }
</style>
