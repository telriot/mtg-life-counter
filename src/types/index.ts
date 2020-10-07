export type TUser = {
  username: string;
  life: number;
  active: boolean;
  socketID: string;
  roomName: string;
};
export type TRoom = {
  name: string;
  users: Array<TUser>;
  maxPlayers?: number;
  password?: string;
};
