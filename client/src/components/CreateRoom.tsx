import React from "react";
import Button from "./Button";
import Modal from "./Modal";
function CreateRoom() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Create room</Button>
      <Modal isOpen={isOpen} handleClose={handleClose} />
    </div>
  );
}

export default CreateRoom;
