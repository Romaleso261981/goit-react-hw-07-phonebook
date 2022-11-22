import ContactForm from '../components/ContactForm/ContactForm';
import { NotificationSpan } from './AppStyle.js';
import { useSelector } from 'react-redux';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { getItems } from "../redux/tasksSlice";

import Notification from './Notification/Notification';

export const App = () => {
  const items = useSelector(getItems);
  return (
    
    <>
      <ContactForm />
      {items.length > 0 && <Filter />}
      {items.length > 0 ? (
        <ContactList />
      ) : (
        <NotificationSpan>
          <Notification message="No contacts yet" />
        </NotificationSpan>
      )}
    </>
  );
};

export default App;
