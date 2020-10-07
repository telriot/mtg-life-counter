import React from "react";
import styled from "styled-components";
import { TRoom } from "../types/index";
import Footer from "./Footer";
import { useSocketState } from "../contexts/socketContext";
import OpponentCard from "./OpponentCard";
import ActivePlayerMain from "./ActivePlayerMain";

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
// const myUserProfile = {
//   username: "TestUser1",
//   life: 27,
//   active: true,
//   socketID: "12345460",
//   roomName: "TestRoom",
// };

const Grid = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows:
    [top opponents-start]1fr [opponents-end main-start]2fr[main-end
    opponents-toggle-start]1fr[opponents-toggle-start end];
`;
const OpponentsDiv = styled.div`
  display: flex;
  grid-row: top / opponents-end;
`;

function ActiveRoomScreen() {
  const { joinedRoom, myUserProfile } = useSocketState();

  const opponents = joinedRoom?.users.filter(
    (user) => user.username !== myUserProfile?.username
  );

  return (
    <>
      <Grid>
        <OpponentsDiv>
          {opponents?.map((opponent, i) => (
            <OpponentCard
              key={`opponent-card-${i}`}
              playerData={opponent}
              joinedRoom={joinedRoom}
            />
          ))}
        </OpponentsDiv>
        <ActivePlayerMain playerData={myUserProfile} />
      </Grid>
      <Footer />
    </>
  );
}
export default ActiveRoomScreen;
