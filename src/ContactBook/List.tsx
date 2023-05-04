import { useState } from 'react';
import { Button } from '../ui/Button';
import { Person, Persons } from './ContactBook';
import Form from './Form';

type Props = {
  persons: Persons;
  onSubmit: React.Dispatch<React.SetStateAction<Persons>>;
};

const List = ({ persons, onSubmit }: Props) => {
  const [editedItem, setEditedItem] = useState<string>('');

  if (Object.keys(persons).length === 0) return <>List is empty</>;

  const handleEditContact = (person: Person) => {
    onSubmit(prev => ({ ...prev, [person.id]: { ...person, id: person.id } }));
    setEditedItem('');
  };

  return (
    <>
      {Object.values(persons).map(person =>
        editedItem === person.id ? (
          <Form
            key={person.id}
            onSubmit={handleEditContact}
            initialValue={person}
          />
        ) : (
          <div
            key={person.id}
            className="flex gap-4 items-center justify-between"
          >
            <span>Name: {person.name}</span>
            <span>City: {person.city}</span>
            <Button onClick={() => setEditedItem(person.id)}>Edit</Button>
          </div>
        )
      )}
    </>
  );
};

export default List;
