import { ContactItem } from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(contact => {
        return <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />;
      })}
    </ul>
  );
};
