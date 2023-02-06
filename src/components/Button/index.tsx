import { Button } from "./styled";

interface Props {
  text: string;
  type: 'edit' | 'delete';
}

const Buttons = ({ text, type }: Props) => {
  return <Button btnType={type}>{text}</Button>;
};

export default Buttons;
