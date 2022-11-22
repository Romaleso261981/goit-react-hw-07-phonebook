import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import axios from 'axios';
import storage from 'redux-persist/lib/storage';

axios.defaults.baseURL = 'https://637c7e5a16c1b892ebb51407.mockapi.io/api/';

export const fetchContact = createAsyncThunk(
  'contact/fetchContact',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://637c7e5a16c1b892ebb51407.mockapi.io/api/contact?page=1&limit=10`
      );
      
      if (response.statusText.ok) {
        throw new Error('server error');
      }
      const data = response;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const deleteContactApi = createAsyncThunk(
  'contact/fetchContact',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.get(`contact?page=1&limit=10`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('can`t delete contact Server error');
      }
      dispatch(deleteContact(id))
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
      state.items = action.payload.data;
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
