import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContactApi } from '../../redux/operations/operations';
import { SpanName, SpanNumber, ContactBtn, ContactItem } from './ContactListItem.styled';

export const ContactListItem = ({ item: { id, tel, name } }) => {
  const dispatch = useDispatch();
  return (
    <ContactItem>
      <SpanName>{name}</SpanName>
      <SpanNumber>{tel}</SpanNumber>
      <ContactBtn type="button" onClick={() => dispatch(deleteContactApi(id))}>
        Delete
      </ContactBtn>
    </ContactItem>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  contacts: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }),
};
