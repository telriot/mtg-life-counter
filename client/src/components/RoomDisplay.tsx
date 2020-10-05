import React from "react";
import styled from "styled-components";
import { TRoomsData } from "../types/index";
const rooms: Array<TRoomsData> = [
  { roomName: "room1", usersLength: 3, maxUsers: 4 },
  { roomName: "room1", usersLength: 3, maxUsers: 4 },
  { roomName: "room1", usersLength: 3, maxUsers: 4 },
  { roomName: "room1", usersLength: 3, maxUsers: 4 },
  { roomName: "room1", usersLength: 3, maxUsers: 4 },
];
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
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e7e7e7;
`;
const ListItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
`;
const ListText = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.palette.text.primary};
  padding: 0 12px;
`;

const RoomListItem = ({ room, index }: { room: TRoomsData; index: number }) => {
  return (
    <>
      {index !== 0 && <Divider />}
      <ListItemDiv>
        <ListText>{room.roomName}</ListText>
        <ListText>{`${room.usersLength}/${room.maxUsers}`}</ListText>
      </ListItemDiv>
    </>
  );
};

function RoomDisplay() {
  return (
    <DisplayBox>
      <RoomsContainer>
        {rooms.map((room, i) => (
          <>
            <RoomListItem room={room} index={i} />
          </>
        ))}
      </RoomsContainer>
    </DisplayBox>
  );
}

export default RoomDisplay;
