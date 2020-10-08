import { TRoom, TUser } from "./types/index";
export const joinedRoom: TRoom = {
  name: "TestRoom",
  users: [
    {
      username: "TestUser1",
      life: 27,
      active: true,
      socketID: "12345460",
      roomName: "TestRoom",
      commanderDamage: { TestUser2: 12, TestUser3: 0, TestUser4: 2 },
    },
    {
      username: "TestUser2",
      life: 7,
      active: true,
      socketID: "12345461",
      roomName: "TestRoom",
      commanderDamage: { TestUser1: 5, TestUser3: 0, TestUser4: 2 },
    },
    {
      username: "TestUser3",
      life: 17,
      active: true,
      socketID: "12345462",
      roomName: "TestRoom",
      commanderDamage: { TestUser2: 1, TestUser1: 3, TestUser4: 4 },
    },
    {
      username: "TestUser4",
      life: 17,
      active: false,
      socketID: "123454621",
      roomName: "TestRoom",
      commanderDamage: { TestUser2: 12, TestUser3: 0, TestUser1: 2 },
    },
  ],
  maxPlayers: 4,
  password: "test",
};
export const myUserProfile = {
  username: "TestUser1",
  life: 27,
  active: true,
  socketID: "12345460",
  roomName: "TestRoom",
  commanderDamage: { TestUser2: 12, TestUser3: 0, TestUser4: 2 },
};
