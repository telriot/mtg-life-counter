import React from "react";
import { useSocketState } from "../contexts/socketContext";
import styled from "styled-components";
import RoomListItem from "./RoomListItem";

const DisplayBox = styled.div`
  background-color: ${(props) => props.theme.palette.secondary.main};
  width: 100%;
  max-width: 100%;
  height: 100%;
  margin: 2rem 0;
  padding: 0.5rem 0;
  border-radius: 8px;
`;
const RoomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 1rem;
`;
const WarningText = styled.p`
  font-size: 1.625rem;
  color: ${(props) => props.theme.palette.text.primary};
  padding: 0 12px;
  text-align: center;
`;

function RoomDisplay() {
  const { rooms } = useSocketState();
  return (
    <DisplayBox>
      <RoomsContainer>
        {rooms.length ? (
          rooms.map((room, i) => (
            <>
              <RoomListItem room={room} index={i} />
            </>
          ))
        ) : (
          <WarningText>There's nobody here!</WarningText>
        )}
      </RoomsContainer>
    </DisplayBox>
  );
}

export default RoomDisplay;
