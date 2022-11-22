import { useDispatch, useSelector } from 'react-redux';
import { filteredContacts } from '../../redux/tasksSlice';
import { getFilter } from "../../redux/tasksSlice";
import { Label,FilterInput, FilterWrap } from './Filter.styled';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  return (
    <FilterWrap>
      <Label htmlFor="filter">Find contacts by name</Label>
      <FilterInput
        value={filter}
        onChange={event => dispatch(filteredContacts(event.target.value))}
      />
    </FilterWrap>
  );
};

export default Filter;