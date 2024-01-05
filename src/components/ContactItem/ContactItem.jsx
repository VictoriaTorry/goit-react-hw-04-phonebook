import css from './ContactItem.module.css';

export const ContactItem = ({ contact: { id, name, number }, onDelete }) => {
  return (
    <li className={css.contactItem}>
      <p className={css.contactName}>
        {name}: {number}
      </p>
      <button
        onClick={() => onDelete(id)}
        type="button"
        className={css.contactBtn}
      >
        Delete
      </button>
    </li>
  );
};
