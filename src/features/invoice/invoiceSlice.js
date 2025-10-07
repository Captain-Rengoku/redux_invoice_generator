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
    } catch {
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
            state.isFormOpen = false;
            saveState(state);
        },

        // filter for invoices
        setFilter: (state, action) => {
            state.filter = action.payload;
        },

        // toggle action
        toggleForm: (state) => {
            state.isFormOpen = !state.isFormOpen;
            if (!state.isFormOpen) {
                state.selectedInvoice = null;
            };
            saveState(state);
        },

        // select invoice
        setSelectedInvoice: (state, action) => {
            state.selectedInvoice = action.payload;
            state.isFormOpen = false;
        },

        // mark as paid
        markAsPaid: (state, action) => {
            const invoice = state.invoices.find((inv) => inv.id === action.payload);
            if (invoice) {
                invoice.status = invoice.status === "paid" ? "pending" : "paid";
                state.selectedInvoice = null;
                state.isFormOpen = false;
                saveState(state);
            }
        },

        // delete the invoice
        deleteInvoice: (state, action) => {
            state.invoices = state.invoices.filter((inv) => inv.id !== action.payload);
            state.selectedInvoice = null;
            saveState(state);
        },

        // update the invoice
        updateInvoice: (state, action) => {
            const updateInvoice = {
                ...action.payload,
                amount: calculateAmount(action.payload.items),
            };
            const index = state.invoices.findIndex((inv) => inv.id === updateInvoice.id);
            if (index !== -1) {
                state.invoices[index] = updateInvoice;
            }
            state.selectedInvoice = null;
            state.isFormOpen = false;
            saveState(state);
        },

        // close the invoice detail
        closeInvoice: (state) => {
            state.selectedInvoice = null;
        }
    },
})

export const {
    toggleForm,
    addInvoice,
    setFilter,
    setSelectedInvoice,
    markAsPaid,
    deleteInvoice,
    updateInvoice,
    closeInvoice
} = invoiceSlice.actions;

export default invoiceSlice.reducer;