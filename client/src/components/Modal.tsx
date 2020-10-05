import React from "react";
import styled from "styled-components";
import CreateRoomForm from "./CreateRoomForm";
const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;
const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  max-width: 100%;
  height: 300px;
  max-height: 100%;
  background-color: #fff;
  z-index: 11;
`;
interface IModal {
  isOpen: boolean;
  handleClose: () => void;
}
function Modal({ isOpen, handleClose }: IModal) {
  return (
    <Container style={!isOpen ? { display: "none" } : {}}>
      <StyledOverlay>
        <StyledModal>
          <CreateRoomForm handleClose={handleClose} />
        </StyledModal>
      </StyledOverlay>
    </Container>
  );
}

export default Modal;
