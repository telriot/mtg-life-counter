import React from "react";
import { TUser } from "../types/index";
import { useSocketState } from "../contexts/socketContext";
import styled from "styled-components";
import CmdDmgCounter from "./CmdDmgCounter";

const CmdDmgSectionContainer = styled.div`
  grid-row: opponents-toggle-start/opponents-toggle-end;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
function CmdDmgSection({ opponents }: { opponents?: Array<TUser> }) {
  const { joinedRoom } = useSocketState();

  return (
    <CmdDmgSectionContainer>
      {opponents?.map((opponent, i) => (
        <CmdDmgCounter opponent={opponent} />
      ))}
    </CmdDmgSectionContainer>
  );
}

export default CmdDmgSection;
