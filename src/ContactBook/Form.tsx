import { useReducer } from 'react';
import { Button } from '../ui/Button';
import { FormControl } from '../ui/FormFields/FormControl';
import InputField2 from '../ui/FormFields/InputField/InputField2';
import { Label } from '../ui/FormFields/Label';
import { Person } from './ContactBook';

type Props = {
  initialValue?: Person;
  onSubmit: (person: Person) => void;
};

const defaultValue = { id: '', name: '', city: '' };

const Form = ({ onSubmit, initialValue = defaultValue }: Props) => {
  const [person, updatePerson] = useReducer(
    (prev: Person, next: Partial<Person>) => ({ ...prev, ...next }),
    initialValue
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(person);
    updatePerson(defaultValue);
  };

  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <FormControl className="items-center">
        <Label>Name</Label>
        <InputField2
          value={person.name}
          onChange={e => updatePerson({ name: e.target.value })}
        />
      </FormControl>
      <FormControl className="items-center">
        <Label>City</Label>
        <InputField2
          value={person.city}
          onChange={e => updatePerson({ city: e.target.value })}
        />
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
