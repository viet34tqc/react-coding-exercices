import { ComponentPropsWithoutRef } from 'react';

const Label = (props: ComponentPropsWithoutRef<'label'>) => {
  return <label {...props} />;
};

export default Label;
