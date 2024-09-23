import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'floatingBtn',
    initialState: { floatingBtn: true },
    reducers: {
        setFloatingBtn: (state, value) => {
            state.floatingBtn = value.payload;
        },
    },
});

export const store = configureStore({
    reducer: {
        floatingBtn: counterSlice.reducer,
    },
});

export const { setFloatingBtn } = counterSlice.actions;
