import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const fetchContact = createAsyncThunk(
    'contact/fetchContact',
    async function () {
        const response = await fetch();
        const data = await
    }
)

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        filter: '',
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
        }
    },
    extr

});
export const { addContact, deleteContact, filteredContacts } = contactsSlice.actions;


export const getItems = state => state.contacts.items;

export const getFilter = state => state.contacts.filter;


const persistConfig = {
    key: 'root',
    storage,
  };
  
  export const persistedAddContactReducer = persistReducer(
    persistConfig,
    contactsSlice.reducer
);
  
