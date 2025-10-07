import { format, parseISO } from "date-fns";
import { ChevronRight } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedInvoice } from "../features/invoice/invoiceSlice";

const InvoiceList = () => {
  const dispatch = useDispatch();
  const { invoices, filter } = useSelector((state) => state.invoices);

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === "all") return true;
    return invoice.status === filter;
  });

  if (filteredInvoices.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-slate-400"> No Invoice Found</p>
      </div>
    );
  }

  const handleInvoiceClick = (invoice) => {
    dispatch(setSelectedInvoice(invoice));
  };

  const formatDate = (date) => {
    try {
      return format(parseISO(date), "dd MM yyyy");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-4">
      {filteredInvoices.map((invoice) => (
        <div
          className="bg-slate-900 rounded-lg p-4 sm:p-6 flex sm:items-center justify-between 
        hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
          key={invoice.id}
          onClick={() => handleInvoiceClick(invoice)}
        >
          <div className="flex flex-col sm:flex-row items-center gap-x-6 text-slate-400">
            <span>{invoice.id}</span>
            <span>Due {formatDate(invoice.dueDate)}</span>
            <span className="text-slate-200">{invoice.clientName}</span>
          </div>
          <div className="flex flex-row justify-center items-center gap-x-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 text-slate-400 text-md sm:text-xl font-bold">
              <span>${invoice.amount?.toFixed(2) || "0.00"}</span>
              <div
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 
                ${
                  invoice.status === "paid"
                    ? "bg-green-900/15 text-green-400"
                    : invoice.status === "pending"
                    ? "bg-orange-900/15 text-orange-400"
                    : "bg-slate-700/10 text-slate-400"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    invoice.status === "paid"
                      ? "bg-green-500"
                      : invoice.status === "pending"
                      ? "bg-orange-500"
                      : "bg-slate-500"
                  }`}
                />
                <span className="capitalize">{invoice.status}</span>
              </div>
            </div>
            <ChevronRight className="text-indigo-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
