import { useSelector } from 'react-redux';
import { List } from './ContactList.styled';
import { ContactListItem } from '../../components/ContactListItem/ContactListItem'
import { getItems } from "../../redux/tasksSlice";
import { getFilter } from "../../redux/tasksSlice";

export const ContactList = () => {
  const items = useSelector(getItems);
  const filter = useSelector(getFilter);
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <List>
      {filteredItems.map(item => (
        <ContactListItem key={item.id} item={item} />
      ))}
    </List>
  );
};
export default ContactList;
