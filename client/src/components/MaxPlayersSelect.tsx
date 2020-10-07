import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { ReactComponent as Icon2p } from "../assets/2pIcon.svg";
import { ReactComponent as Icon3p } from "../assets/3pIcon.svg";
import { ReactComponent as Icon4p } from "../assets/4pIcon.svg";
import { ReactComponent as Icon5p } from "../assets/5pIcon.svg";
import { useAppState, useAppDispatch } from "../contexts/appContext";

interface ISquaredIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  last?: boolean;
  selected?: boolean;
}
const MaxPlayersContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  height: 4rem;
  margin-bottom: 2.5rem;

  background-color: ${(props) => props.theme.palette.secondary.main};
  border-radius: 4px;
  ${(props) => props.theme.breakpoints.down("sm")} {
    height: 6.5rem;
  }
`;
const MaxPlayersDiv = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
`;
const MaxPlayersSpan = styled.span`
  font-size: 1.25rem;
  color: ${(props) => props.theme.palette.text.primary};
  ${(props) => props.theme.breakpoints.down("sm")} {
    margin-bottom: 1rem;
  }
`;
const MaxPlayersSelectorDiv = styled.div`
  display: flex;
  flex: 0.6;
  justify-content: space-between;
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

const IconButton = styled.button<ISquaredIconButtonProps>`
  background: ${(props) =>
    props.selected ? props.theme.palette.secondary.light : "transparent"};
  margin-right: ${(props) => (props.last ? "0" : " 0.5rem")};
  outline: none;
  transition: background-color 0.2s;
  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.selected
        ? props.theme.palette.secondary.light
        : props.theme.palette.secondary.dark};
  }
`;

function SquaredIconButton({
  selected,
  last,
  onClick,
  children,
}: {
  selected: boolean;
  last?: boolean;
  onClick: any;
  children: any;
}) {
  return (
    <IconButton selected={selected} last={last} onClick={onClick}>
      {children}
    </IconButton>
  );
}
function MaxPlayersSelect() {
  const { maxPlayers } = useAppState();
  const dispatch = useAppDispatch();
  const handleClick = (num: 2 | 3 | 4 | 5) => () => {
    dispatch({ type: "setMaxPlayers", payload: num });
  };

  return (
    <MaxPlayersContainer>
      <MaxPlayersDiv>
        <MaxPlayersSpan>Max Players</MaxPlayersSpan>
        <MaxPlayersSelectorDiv>
          <SquaredIconButton
            selected={maxPlayers === 2}
            onClick={handleClick(2)}
          >
            <Icon2p />
          </SquaredIconButton>

          <SquaredIconButton
            selected={maxPlayers === 3}
            onClick={handleClick(3)}
          >
            <Icon3p />
          </SquaredIconButton>

          <SquaredIconButton
            selected={maxPlayers === 4}
            onClick={handleClick(4)}
          >
            <Icon4p />
          </SquaredIconButton>

          <SquaredIconButton
            selected={maxPlayers === 5}
            onClick={handleClick(5)}
            last
          >
            <Icon5p />
          </SquaredIconButton>
        </MaxPlayersSelectorDiv>
      </MaxPlayersDiv>
    </MaxPlayersContainer>
  );
}

export default MaxPlayersSelect;
