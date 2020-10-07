import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface IInputDivProps {
  isFocused: boolean;
  margin: string;
}
interface ITextDecoratorProps {
  isFocused: boolean;
}
const InputDiv = styled.div<IInputDivProps>`
  position: relative;
  display: "flex";
  margin: ${(props) => props.margin};
  display: flex;
  padding: 0 1rem;
  transition: background 0.2s;
  background-color: ${(props) =>
    props.theme.palette.secondary[props.isFocused ? "light" : "main"]};
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.light};
    div:nth-of-type(1) {
      div:nth-of-type(1) {
        background-color: ${(props) => props.theme.palette.primary.dark};
      }
    }
  }
`;
const TextBox = styled.div`
  position: relative;
  flex: 1;
  height: 4rem;
`;
const Input = styled.input`
  position: absolute;
  bottom: 1.375rem;
  left: 0;
  border: 0;
  background-color: inherit;
  color: ${(props) => props.theme.palette.text.primary};
  font-size: 1.25rem;
  width: 100%;
  outline: none;
`;
const TextDecorator = styled.div<ITextDecoratorProps>`
  color: white;
  position: absolute;
  bottom: 1rem;
  left: 0;
  transition: background 0.2s;

  background-color: ${(props) =>
    props.isFocused
      ? props.theme.palette.primary.dark
      : props.theme.palette.secondary.light};
  height: 2px;
  width: 100%;
`;
interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  margin?: string;
}
function TextField({
  margin = "0 0 2.5rem 0",
  placeholder,
  handleChange,
  ...props
}: ITextField) {
  const [isFocused, setIsFocused] = React.useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <>
      <InputDiv isFocused={isFocused} margin={margin}>
        <TextBox>
          <Input
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
            onChange={handleChange}
            placeholder={placeholder}
          ></Input>
          <TextDecorator isFocused={isFocused} />
        </TextBox>
      </InputDiv>
    </>
  );
}

export default TextField;
