import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

const Input = styled.input``;
interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function TextField({ handleChange, ...props }: ITextField) {
  return <Input {...props} onChange={handleChange}></Input>;
}

export default TextField;
