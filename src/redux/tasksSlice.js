import { createSlice} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { fetchContact, deleteContactApi, addContactApi } from './operations/operations';
import storage from 'redux-persist/lib/storage';


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    isLoading: false,
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
      console.log("fetchContact.pending");
      state.status = 'loading';
      state.error = null;
    },
    [fetchContact.fulfilled]: (state, action) => {
    console.log("fetchContact.fulfilled");
      state.status = 'resolved';
      state.error = null;
      state.items = action.payload.data;
    },
    [fetchContact.rejected]: (state, action) => {
      console.log("fetchContact.rejected");
      state.status = 'rejected';
      state.error = action.payload;
    },
    [addContactApi.pending](state) {
      console.log("addContactApi.pending");
      state.isLoading = true;
    },
    [addContactApi.fulfilled](state, action) {
      console.log("addContactApi.fulfilled");
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContactApi.rejected](state, action) {
      console.log("addContactApi.rejected");
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteContactApi.pending](state) {
      console.log("deleteContactApi.pending");
      state.isLoading = true;
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
    [deleteContactApi.rejected](state, action) {
      console.log("deleteContactApi.rejected");
      state.isLoading = false;
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

export const getIsLoading = state => state.contacts.isLoading;

const persistConfig = {
  key: 'root',
  storage,
};

export const persistedAddContactReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
