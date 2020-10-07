import React from "react";
import { TRoomsData } from "../types/index";
import { useSocketState } from "../contexts/socketContext";
import styled from "styled-components";
import Button from "./Button";
import Modal from "./Modal";

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
  font-size: 20px;
  color: ${(props) => props.theme.palette.text.primary};
  padding: 0 12px;
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
        <div>
          {/* <ListText>{`${room.usersLength}/${room.maxUsers}`}</ListText> */}
          {!joinedRoom && (
            <Button onClick={handleOpen} slim>
              Join
            </Button>
          )}
        </div>
      </ListItemDiv>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        roomName={room.roomName}
      />
    </>
  );
};

export default RoomListItem;
