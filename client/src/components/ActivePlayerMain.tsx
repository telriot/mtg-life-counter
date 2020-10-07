import React from "react";
import styled from "styled-components";
import { TUser, TRoom } from "../types/index";
import LifeCounter from "./LifeCounter";
import { useSocketState } from "../contexts/socketContext";
interface IHiglightProps {
  userNumber?: number;
}
const ActivePlayerContainer = styled.div`
  grid-row: main-start/main-end;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const UsernameDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const ActivePlayerName = styled.span`
  font-family: Roboto;
  font-size: 2.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.text.primary};
`;
const Highlight = styled.div<IHiglightProps>`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: ${(props) =>
    props.theme.palette.players[`p${props.userNumber}`]};
`;
const ActivePlayerLife = styled.span`
  position: relative;
  font-family: Roboto;
  font-size: 5.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette.text.primary};
`;
// const joinedRoom: TRoom = {
//   name: "TestRoom",
//   users: [
//     {
//       username: "TestUser1",
//       life: 27,
//       active: true,
//       socketID: "12345460",
//       roomName: "TestRoom",
//     },
//     {
//       username: "TestUser2",
//       life: 7,
//       active: true,
//       socketID: "12345461",
//       roomName: "TestRoom",
//     },
//     {
//       username: "TestUser3",
//       life: 17,
//       active: true,
//       socketID: "12345462",
//       roomName: "TestRoom",
//     },
//     {
//       username: "TestUser4",
//       life: 17,
//       active: true,
//       socketID: "123454621",
//       roomName: "TestRoom",
//     },
//   ],
//   maxUsers: 4,
//   password: "test",
// };
function ActivePlayerMain({ playerData }: { playerData?: TUser }) {
  const { joinedRoom } = useSocketState();

  const userNumber = joinedRoom?.users.findIndex(
    (user) => playerData?.username === user.username
  );
  return (
    <ActivePlayerContainer>
      <UsernameDiv>
        <ActivePlayerName>{playerData?.username}</ActivePlayerName>
        <Highlight userNumber={userNumber} />
      </UsernameDiv>
      <ActivePlayerLife>{playerData?.life}</ActivePlayerLife>
      <LifeCounter />
    </ActivePlayerContainer>
  );
}

export default ActivePlayerMain;
