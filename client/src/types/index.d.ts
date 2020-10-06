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
  maxUsers?: number;
  password?: string;
};
export type TRoomsData = {
  roomName: string;
  usersLength: number;
  maxUsers: number;
};