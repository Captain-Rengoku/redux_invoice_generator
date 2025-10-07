import React from "react";
import Header from "./Header";
import InvoiceList from "./InvoiceList";
import InvoiceForm from "./InvoiceForm";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../features/invoice/invoiceSlice";
import InvoiceDetails from "./InvoiceDetails";

const AppContent = () => {
  const dispatch = useDispatch();
  const { isFormOpen, selectedInvoice } = useSelector((state) => state.invoices);
  const handleNewInvoice = () => {
    dispatch(toggleForm());
  };
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto p-4 sm:py-12">
        <Header onNewInvoice={handleNewInvoice} />
        {selectedInvoice ? <InvoiceDetails invoice={selectedInvoice}/> : <InvoiceList/>}
        {/* <hr className="my-8 text-indigo-950 rounded-full" /> */}
        {isFormOpen && <InvoiceForm invoice = {selectedInvoice} />}
      </div>
    </div>
  );
};

export default AppContent;
