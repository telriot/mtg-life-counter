import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Modal from "./Modal";
import { TRoomsData } from "../types/index";
import { useSocketState } from "../contexts/socketContext";
// const rooms: Array<TRoomsData> = [
//   { roomName: "room1", usersLength: 3, maxUsers: 4 },
//   { roomName: "room1", usersLength: 3, maxUsers: 4 },
//   { roomName: "room1", usersLength: 3, maxUsers: 4 },
//   { roomName: "room1", usersLength: 3, maxUsers: 4 },
//   { roomName: "room1", usersLength: 3, maxUsers: 4 },
// ];
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
  background-color: #444;
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
const WarningText = styled.p`
  font-size: 1.625rem;
  color: ${(props) => props.theme.palette.text.primary};
  padding: 0 12px;
  text-align: center;
`;

const RoomListItem = ({ room, index }: { room: TRoomsData; index: number }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { joinedRoom } = useSocketState();
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      {index !== 0 && <Divider />}
      <ListItemDiv>
        <ListText>{room.roomName}</ListText>
        {/* <ListText>{`${room.usersLength}/${room.maxUsers}`}</ListText> */}
        {!joinedRoom && (
          <Button onClick={handleOpen} slim>
            Join
          </Button>
        )}
      </ListItemDiv>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        roomName={room.roomName}
      />
    </>
  );
};

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
