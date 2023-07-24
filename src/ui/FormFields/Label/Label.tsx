import { ComponentPropsWithoutRef } from 'react';

const Label = ({ children, ...props }: ComponentPropsWithoutRef<'label'>) => {
  return <label {...props} />;
};

export default Label;
