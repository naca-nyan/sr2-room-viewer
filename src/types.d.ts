type UUID = string;

interface Part {
  part: string | "custom";
  customPart?: string;
}

interface User {
  userId: UUID;
  nickname: string;
  idProvider: "ymid-jp" | "ymid-kr";
  avatar: {
    type: "url" | "preset";
    url: string;
    preset?: { colorCode: string; shapeKey: string };
  };
  isBeginner: boolean;
  lastPlayedPart: Part;
}

interface UserMember extends User {
  roomEnterType: "normal" | "temporary";
}

interface Room {
  roomId: UUID;
  name: string;
  description: string;
  roomPurpose: "normal";
  roomPublishType: "public";
  needPasswd: boolean;
  roomStatus: "online";
  tags: string[];
  customTags: string[];
  isTestRoom: boolean;
  ownerUser: User;
  members: UserMember[];
  maxMemberCount: number;
}

interface Online {
  rooms: Room[];
}
