import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { FieldError } from '../ui/FormFields/FieldError';
import { FormControl } from '../ui/FormFields/FormControl';
import InputField from '../ui/FormFields/InputField/InputField';
import { Label } from '../ui/FormFields/Label';
import { useMultiFormContext } from './FormContext';

export type Step1FormData = {
  firstName: string;
  email: string;
};

const Step1 = () => {
  const { formData, setFormData } = useMultiFormContext();
  const methods = useForm<Step1FormData>({
    defaultValues: {
      firstName: formData.firstName,
      email: formData.email,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = methods;
  const navigate = useNavigate();
  const onSubmit = (data: Step1FormData) => {
    setFormData({ ...formData, ...data });
    navigate('/step2');
  };
  return (
    <FormProvider {...methods}>
      <form className="w-full md:w-[50%]" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <FormControl className="flex-col">
            <Label htmlFor="firstName">First Name</Label>
            <InputField
              id="firstName"
              {...register('firstName', { required: true })}
            />
            <FieldError name="firstName" />
          </FormControl>
          <FormControl className="flex-col">
            <Label htmlFor="email">Email</Label>
            <InputField
              id="email"
              type="email"
              {...register('email', { required: true })}
            />
            <FieldError name="email" />
          </FormControl>
          <Button type="submit">Next &gt;</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Step1;
