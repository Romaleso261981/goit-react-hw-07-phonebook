import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { nanoid } from 'nanoid';
import { addContactApi} from '../../redux/operations/operations';
import { fetchContact} from '../../redux/operations/operations';
import { getItems } from '../../redux/tasksSlice';
import Notiflix from 'notiflix';

import {
  InputLabel,
  FormWrap,
  InputSpan,
  InputSpanName,
  FormBtn,
  InputForm,
} from './ContactFormStyle.js';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const items = useSelector(getItems);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmitForm = event => {
    if (items.find(item => item.name === name)) {
      Notiflix.Notify.warning('This contact is already exists');
      return;
    }
    event.preventDefault();
    dispatch(addContactApi({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <FormWrap onSubmit={handleSubmitForm}>
      <InputLabel>
        <InputSpanName>Name</InputSpanName>
        <InputForm
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
        />
      </InputLabel>
      <InputLabel>
        <InputSpan>Number</InputSpan>
        <InputForm
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
        />
      </InputLabel>
      <FormBtn type="submit">Add contact</FormBtn>
    </FormWrap>
  );
};

export default ContactForm;
