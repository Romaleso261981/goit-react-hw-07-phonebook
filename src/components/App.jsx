import ContactForm from '../components/ContactForm/ContactForm';
import { useSelector } from 'react-redux';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { getItems } from "../redux/tasksSlice";
import { getError } from "../redux/tasksSlice";
import { getIsLoading } from "../redux/tasksSlice";

import Notification from './Notification/Notification';
import { NotificationSpan, TitleWrap } from './AppStyle';

export const App = () => {
  const items = useSelector(getItems);
  const error = useSelector(getError);
  const isLoading = useSelector(getIsLoading);
  return (
    
    <>
      <ContactForm />
      {isLoading && <TitleWrap>Loading....</TitleWrap>}
      {error && <TitleWrap>An error occerd: { error }</TitleWrap>}
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
