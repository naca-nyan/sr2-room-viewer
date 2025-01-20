<script lang="ts">
  const { member }: { member: UserMember } = $props();
  const { avatar, nickname } = member;
  function getURL(avatar: User["avatar"]) {
    if (avatar.type === "url") return avatar.url;
    const base = `https://syncroom.yamaha.com/assets-v2/img/play/room/preset`;
    const shapeKey = avatar.preset?.shapeKey ?? "user2";
    const colorCode = avatar.preset?.colorCode ?? "e9ebff";
    return `${base}/avatar_${shapeKey}_${colorCode}.png`;
  }
  function getPart(p: User["lastPlayedPart"]) {
    if (!p) return "";
    if (p.part === "none") return "";
    if (p.part === "custom") return p.customPart;
    const capitalize = (s: string) =>
      s && s.charAt(0).toUpperCase() + s.slice(1);
    return capitalize(p.part);
  }
  function linkifyXAccount(text: string) {
    if (!text) return "";
    const regex = /@[^\s]+/g;
    return text.replace(regex, (match) => {
      const screenName = match.slice(1);
      return `<a href="https://x.com/${screenName}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });
  }
</script>

<div class="avatar">
  <img src={getURL(avatar)} alt={avatar.url} />
  <div class="name">
    <span>{@html linkifyXAccount(nickname)}</span>
    <small>{getPart(member.lastPlayedPart)}</small>
  </div>
</div>

<style>
  div.avatar {
    display: flex;
    align-items: center;
    padding: 3px 0px;
  }
  div.name {
    padding-left: 5px;
  }
  div.name small {
    display: block;
    font-size: 0.7rem;
    line-height: 5px;
    color: #bbc6ca;
  }
  img {
    width: 35px;
    border-radius: 50%;
  }
</style>
