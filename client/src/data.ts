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
      commanderDamage: {},
    },
    {
      username: "TestUser2",
      life: 7,
      active: true,
      socketID: "12345461",
      roomName: "TestRoom",
      commanderDamage: {},
    },
    {
      username: "TestUser3",
      life: 17,
      active: true,
      socketID: "12345462",
      roomName: "TestRoom",
      commanderDamage: {},
    },
    {
      username: "TestUser4",
      life: 17,
      active: true,
      socketID: "123454621",
      roomName: "TestRoom",
      commanderDamage: {},
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
  commanderDamage: {},
};
