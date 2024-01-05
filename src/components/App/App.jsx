import css from './App.module.css';
import { nanoid } from 'nanoid';

import { useState, useEffect } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const App = () => {
  const initialContacts = JSON.parse(localStorage.getItem('contacts'));
  const [contacts, setContacts] = useState(
    initialContacts ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  const onCheckingNewContact = contact => {
    const { name, number } = contact;
    const existingName = contacts.map(item => item.name).includes(name);
    const existingNumber = contacts.map(item => item.number).includes(number);

    existingName || existingNumber
      ? alert(`${existingNumber ? number : name} is already in contacts`)
      : onAddingNewContact(contact);
  };

  const onAddingNewContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(contacts => [newContact, ...contacts]);
  };

  const onFilter = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const filterName = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filterName)
    );
    return filteredContacts;
  };

  const onDelete = contactId => {
    setContacts(prev => prev.filter(item => item.id !== contactId));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.main}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={onCheckingNewContact} />
      <h2 className={css.title}>Contacts</h2>
      <Filter filterField={filter} onFilter={onFilter} />
      <ContactList contacts={getFilteredContacts()} onDelete={onDelete} />
    </div>
  );
};
