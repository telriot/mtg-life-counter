export type TUser = {
  username: string;
  life: number;
  active: boolean;
  socketID: string;
  roomName: string;
  commanderDamage: any;
};
export type TRoom = {
  name: string;
  users: Array<TUser>;
  maxPlayers?: number;
  password?: string;
};
export type TRoomsData = {
  roomName: string;
  usersLength: number;
  maxPlayers: number;
};
