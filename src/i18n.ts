const ja_jp = {
  tags: {
    practicing: "練習中",
    chatting: "おしゃべり",
    streaming: "配信中",
    recording: "録音中",
    testing: "テスト中",
    eventInProgress: "イベント開催中",
    seekingMembers: "メンバー募集中",
    beginnersWelcome: "初心者OK",
    noVoiceWelcome: "無言OK",
    seekingVocalists: "ボーカル募集",
    seekingKeyboardist: "キーボード募集",
    seekingGuitarists: "ギター募集",
    seekingBassist: "ベース募集",
    seekingDrummers: "ドラム募集",
    seekingAccompaniment: "伴奏募集",
    classic: "Classic",
    countryFolk: "Country/Folk",
    clubMusicEdm: "ClubMusic/EDM",
    hipHopRap: "HipHop/Rap",
    rnbSoul: "R&B/Soul",
    jazz: "Jazz",
    fusion: "Fusion",
    rock: "Rock",
    hardRockHardMetal: "HR/HM",
    pop: "洋楽",
    jPop: "J-Pop",
    kPop: "K-Pop",
    idol: "アイドル",
    anime: "アニメ",
    games: "ゲーム",
    vocaloid: "ボカロ",
    world: "World",
  },
};

export function tags(key: string) {
  if (!(key in ja_jp.tags)) {
    return key;
  }
  return ja_jp.tags[key as keyof typeof ja_jp.tags];
}
