import React from "react";
import { TRoomsData } from "../types/index";
import { useSocketState } from "../contexts/socketContext";
import styled from "styled-components";
import Button from "./Button";
import Modal from "./Modal";
import { ReactComponent as Icon1p } from "../assets/1pIcon.svg";
import { ReactComponent as Icon2p } from "../assets/2pIcon.svg";
import { ReactComponent as Icon3p } from "../assets/3pIcon.svg";
import { ReactComponent as Icon4p } from "../assets/4pIcon.svg";
import { ReactComponent as Icon5p } from "../assets/5pIcon.svg";

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
const RSideDiv = styled.div`
  display: flex;
`;

const ActivePlayersIcon = (num: number) =>
  num === 1 ? (
    <Icon1p />
  ) : num === 2 ? (
    <Icon2p />
  ) : num === 3 ? (
    <Icon3p />
  ) : num === 4 ? (
    <Icon4p />
  ) : num === 5 ? (
    <Icon5p />
  ) : (
    <div></div>
  );
const RoomListItem = ({ room, index }: { room: TRoomsData; index: number }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { joinedRoom } = useSocketState();
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const showJoinRoom = Boolean(
    !joinedRoom && room?.usersLength < room.maxPlayers
  );
  return (
    <>
      {index !== 0 && <Divider />}
      <ListItemDiv>
        <ListText>{room.roomName}</ListText>
        <RSideDiv>
          {ActivePlayersIcon(room?.usersLength)}
          {showJoinRoom && (
            <Button onClick={handleOpen} slim>
              Join
            </Button>
          )}
        </RSideDiv>
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
