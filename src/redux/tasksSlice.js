import { createSlice} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { fetchContact, deleteContactApi, addContactApi } from './operations/operations';
import storage from 'redux-persist/lib/storage';

const handlePending = state => {
  console.log("pending");
  state.isLoading = true;
  state.status = 'loading';
  state.error = null;
};

const handleRejected = (state, action) => {
  console.log("rejected");
  state.isLoading = true;
  state.status = 'rejected';
  state.error = action.payload;
};


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    isLoading: false,
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
    [fetchContact.pending]: handlePending,
    [deleteContactApi.pending]: handlePending,
    [addContactApi.pending]: handlePending,
    [fetchContact.rejected]: handleRejected,
    [deleteContactApi.rejected]: handleRejected,
    [addContactApi.rejected]: handleRejected,
    [fetchContact.fulfilled]: (state, action) => {
    console.log("fetchContact.fulfilled");
      state.status = 'resolved';
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.data;
    },
    [addContactApi.fulfilled](state, action) {
      console.log("addContactApi.fulfilled");
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [deleteContactApi.fulfilled](state, action) {
      console.log("deleteContactApi.fulfilled");
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
  },
});
export const { addContact, deleteContact, filteredContacts } =
  contactsSlice.actions;

export const getItems = state => state.contacts.items;

export const getFilter = state => state.contacts.filter;

export const getError = state => state.contacts.error;

export const getIsLoading = state => state.contacts.isLoading;

const persistConfig = {
  key: 'root',
  storage,
};

export const persistedAddContactReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
