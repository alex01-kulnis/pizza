import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
  const { category, search, currentPage, sortBy } = params;

  const { data } = await axios.get<Pizza[]>(
    `https://62d52f16d4406e523554ca5d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=desc${search}`,
  );

  return data;
});
