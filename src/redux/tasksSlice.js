import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const fetchContact = createAsyncThunk(
  'contact/fetchContact',
  async function (_, { rejectWithValue }) {
    const response = await fetch("https://image.tmdb.org/t/p/w500");

    try {
        if (!response.ok) {
          console.log("if");
        throw new Error('server error');
        }
        console.log("за +if");
        const data = await response.json();
        console.log(response);
      return data;
    } catch (error) {
        console.log("catch");
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
