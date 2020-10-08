import React from "react";
import styled from "styled-components";
import { useSocketState } from "../contexts/socketContext";
import OpponentCard from "./OpponentCard";
import ActivePlayerMain from "./ActivePlayerMain";
import CmdDmgSection from "./CmdDmgSection";

const Grid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows:
    [top opponents-start]1fr [opponents-end main-start]1.75fr[main-end
    opponents-toggle-start]1.25fr[opponents-toggle-end end];
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
              index={i}
              playerData={opponent}
            />
          ))}
        </OpponentsDiv>
        <ActivePlayerMain />
        <CmdDmgSection opponents={opponents} />
      </Grid>
    </>
  );
}
export default ActiveRoomScreen;
