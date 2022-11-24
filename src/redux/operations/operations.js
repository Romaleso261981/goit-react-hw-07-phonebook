import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://637c7e5a16c1b892ebb51407.mockapi.io/api/';

export const fetchContact = createAsyncThunk(
  'contact/fetchContact',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get(`contact?page=1&limit=10`);

      if (response.statusText.ok) {
        throw new Error('server error');
      }
      const data = response;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContactApi = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId, thunkAPI) => {
      try {
          const response = await axios.delete(`/contact/${taskId}`);
        console.log(`deleteContactApi: ${response}`);
        return response.data;
      } catch (e) {
          console.log();
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

export const addContactApi = createAsyncThunk(
  'tasks/addContactApi',
  async (text, thunkAPI) => {
    try {
      const response = await axios.post('/contact', { text });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
