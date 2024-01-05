import css from './App.module.css';
import { nanoid } from 'nanoid';

import { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onCheckingNewContact = contact => {
    const { name, number } = contact;
    const { contacts } = this.state;
    const existingName = contacts.map(item => item.name).includes(name);
    const existingNumber = contacts.map(item => item.number).includes(number);

    existingName || existingNumber
      ? alert(`${existingNumber ? number : name} is already in contacts`)
      : this.onAddingNewContact(contact);
  };

  onAddingNewContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  onFilter = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const filterName = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filterName)
    );
    return filteredContacts;
  };

  onDelete = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(item => item.id !== contactId),
    }));
  };

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidMount() {
    const initialContacts = JSON.parse(localStorage.getItem('contacts'));
    if (initialContacts) {
      this.setState({ contacts: initialContacts });
    }
  }

  render() {
    return (
      <div className={css.main}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.onCheckingNewContact} />
        <h2 className={css.title}>Contacts</h2>
        <Filter filterField={this.state.filter} onFilter={this.onFilter} />
        <ContactList
          contacts={this.getFilteredContacts()}
          onDelete={this.onDelete}
        />
      </div>
    );
  }
}
