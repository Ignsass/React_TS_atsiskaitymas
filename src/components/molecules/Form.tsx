import React from 'react';
import Button from '../atoms/Button';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <Button onClick={() => {}}>Submit</Button>
    </form>
  );
};

export default Form;