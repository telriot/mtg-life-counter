import React from "react";
import { useSocketState } from "../contexts/socketContext";
import styled from "styled-components";
import { TUser } from "../types";
import { getUserNumber } from "../lib/helpers";
interface ICmdDmgDisplayDivProps {
  userNumber: number;
}
const SectionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  height: 2rem;
  width: 100%;
`;
const CmdDmgDisplayDiv = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CmdDmg = styled.span<ICmdDmgDisplayDivProps>`
  color: ${(props) => props.theme.palette.players[`p${props.userNumber}`].main};
  font-weight: 500;
`;

function OppCmdDmgSection({ opponent }: { opponent?: TUser }) {
  const { joinedRoom } = useSocketState();

  return (
    <SectionContainer>
      {Object.entries(opponent?.commanderDamage).map(
        ([username, damage]: Array<any>, i) => {
          return (
            <CmdDmgDisplayDiv key={`${username}-${i}`}>
              <CmdDmg userNumber={getUserNumber(username, joinedRoom?.users)}>
                {damage}
              </CmdDmg>
            </CmdDmgDisplayDiv>
          );
        }
      )}
    </SectionContainer>
  );
}

export default OppCmdDmgSection;
