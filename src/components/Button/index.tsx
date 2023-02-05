import React from "react";
import { Button } from "./styled";

interface Props {
  text: string;
}

const Buttons = ({ text }: Props) => {
  return <Button>{text}</Button>;
};

export default Buttons;
