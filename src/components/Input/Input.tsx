import React, { InputHTMLAttributes } from 'react';
import { Input } from './styled';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputForm = (props: InputProps) => {
  return <Input {...props} />
}

export default InputForm;