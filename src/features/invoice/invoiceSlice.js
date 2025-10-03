import { createSlice } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return {
                invoices: [],
                filter: 'all',
                isFormOpen: false,
                selectedInvoice: null,
            };
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return {
            invoices: [],
            filter: 'all',
            isFormOpen: false,
            selectedInvoice: null,
        };
    }
};

const initialState = loadState();

const calculateAmount = (items) => {
    return items.reduce((acc, item) => {
        return acc + item.quantity * item.price;
    }, 0)
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch (error) {
        console.log(error);
    }
}

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        // add invoice
        addInvoice: (state, action) => {
            const newInvoice = {
                ...action.payload,
                amount: calculateAmount(action.payload.items),
                status: action.payload.status || 'pending',
                dueDate:
                    action.payload.dueDate ||
                    format(addDays(new Date(), 30), 'yyyy-MM-dd')
            }
            state.invoices.push(newInvoice);
            saveState(state);
            state.isFormOpen = false;
        },
        // toggle action
        toggleForm: (state) => {
            state.isFormOpen = !state.isFormOpen;
            if (!state.isFormOpen) {
                state.selectedInvoice = null;
            }
        }
    },
})

export const { toggleForm, addInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;