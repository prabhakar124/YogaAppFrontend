import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Order {
  id: string;
  total: number;
  status: string;
  items: any[];
}

interface PaymentState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk('payment/createOrder', async (orderData: any) => {
  const response = await fetch('http://localhost:4000/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
    credentials: 'include',
  });
  return response.json();
});

export const fetchOrders = createAsyncThunk('payment/fetchOrders', async () => {
  const response = await fetch('http://localhost:4000/api/orders', {
    credentials: 'include',
  });
  return response.json();
});

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.loading = true; })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      });
  },
});

export default paymentSlice.reducer;
