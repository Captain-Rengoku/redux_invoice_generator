import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    invoices: [],
    filter: 'all',
    isFormOpen: false,
    selectedInvoice: null,
};

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        // toggle action
        toggleForm: (state) => {
            state.isFormOpen = !state.isFormOpen;
            if (!state.isFormOpen) {
                state.selectedInvoice = null;
            }
        }
    },
})

export const { toggleForm } = invoiceSlice.actions;

export default invoiceSlice.reducer;