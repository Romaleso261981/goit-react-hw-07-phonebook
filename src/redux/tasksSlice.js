import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


export const fetchContact = createAsyncThunk(
  'contact/fetchContact',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://image.tmdb.org/t/p/w500trending/movie/day?api_key=3290f7c502e8a1167263be702b28bdfc'
      );
      if (!response.ok) {
        throw new Error('server error');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    status: null,
    error: null,
  },
  reducers: {
    addContact(state, action) {
      state.items.push(action.payload);
    },
    deleteContact(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    filteredContacts(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContact.pending]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchContact.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.contacts = action.payload;
    },
    [fetchContact.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
export const { addContact, deleteContact, filteredContacts } =
  contactsSlice.actions;

export const getItems = state => state.contacts.items;

export const getFilter = state => state.contacts.filter;

export const getStatus = state => state.contacts.status;

export const getError = state => state.contacts.error;

const persistConfig = {
  key: 'root',
  storage,
};

export const persistedAddContactReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
