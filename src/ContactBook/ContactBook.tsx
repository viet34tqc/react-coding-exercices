import { useState } from 'react';
import { uniqueId } from '../util';
import Form from './Form';
import List from './List';

export type Person = {
  id: string;
  name: string;
  city: string;
};

export type Persons = Record<Person['id'], Person>;

const ContactBook = () => {
  const [persons, setPersons] = useState<Persons>({});
  const handleSubmit = (person: Person) => {
    const id = uniqueId();
    setPersons(prev => ({ ...prev, [id]: { ...person, id } }));
  };
  return (
    <div>
      <fieldset className="mb-4">
        <legend>Form:</legend>
        <Form onSubmit={handleSubmit} />
      </fieldset>
      <fieldset className="space-y-4">
        <legend>List:</legend>
        <List persons={persons} onSubmit={setPersons} />
      </fieldset>
    </div>
  );
};

export default ContactBook;
