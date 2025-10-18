import React from "react";
import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import {
  closeInvoice,
  deleteInvoice,
  markAsPaid,
  setSelectedInvoice,
  toggleForm,
} from "../features/invoice/invoiceSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDF } from "./invoicePDF";
import { Download, X } from "lucide-react";

const InvoiceDetails = ({ invoice }) => {
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "dd MMM yyyy");
    } catch {
      return "Invalid Date";
    }
  };

  const dispatch = useDispatch();
  const handleMarkAsPaid = () => {
    dispatch(markAsPaid(invoice.id));
  };

  const handleDelete = () => {
    dispatch(deleteInvoice(invoice.id));
    dispatch(setSelectedInvoice(null));
  };

  const handleEdit = () => {
    dispatch(toggleForm());
  };

  const handleCloseInvoice = () => {
    dispatch(closeInvoice());
  };

  return (
    <div className="bg-slate-900 min-h-[80svh] p-4 rounded-lg">
      <div className="bg-slate-800 rounded-lg p-2 sm:p-4 space-y-4">
        <div className="self-center flex justify-end items-center rounded-md">
          <button
            onClick={handleCloseInvoice}
            className="flex items-center justify-center text-white hover:text-red-200 
          bg-slate-700 hover:bg-red-800 p-1 rounded-md transition cursor-pointer"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>
        <div className="bg-slate-900 rounded-lg p-3 sm:p-6">
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold mb-2">#{invoice.id}</h2>
              <p className="text-slate-400">{invoice.projectDescription}</p>
            </div>
            <div className="text-right text-slate-400">
              <p>{invoice.billFrom.streetAddress}</p>
              <p>{invoice.billFrom.city}</p>
              <p>{invoice.billFrom.postCode}</p>
              <p>{invoice.billFrom.country}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
            <div className="gap-y-2">
              <p className="text-slate-400">Invoice Date</p>
              <p className="font-bold">{formatDate(invoice.invoiceDate)}</p>
              <p className="text-slate-400 mt-2">Payment Due</p>
              <p className="font-bold">{formatDate(invoice.dueDate)}</p>
            </div>
            <div className="gap-y-2">
              <p className="text-slate-400 mb-2">Bill to</p>
              <p className="font-bold">{invoice.clientName}</p>
              <p className="text-slate-200">{invoice.billTo.Street}</p>
              <p className="text-slate-200">{invoice.billTo.city}</p>
              <p className="text-slate-200">{invoice.billTo.postCode}</p>
              <p className="text-slate-200">{invoice.billTo.country}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-2">Sent To</p>
              <p className="font-bold">{invoice.billTo.clientEmail}</p>
            </div>
          </div>
          <div className="bg-slate-950/40 rounded-lg overflow-hidden">
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400">
                    <th className="text-left">Item Name</th>
                    <th className="text-center">QTY</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr className="text-slate-200" key={index}>
                      <th className="text-left">{item.name}</th>
                      <th className="text-center">{item.quantity}</th>
                      <th className="text-right">${item.price.toFixed(2)}</th>
                      <th className="text-right">${item.total.toFixed(2)}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-900 text-white py-8 flex justify-between items-center">
              <span>Amount Due</span>
              <span className="font-bold text-3xl">
                ${invoice.amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
          <div className="flex items-center gap-4 font-bold">
            {/* <span>Status</span> */}
            <div
              className={`px-4 py-2 rounded-lg flex items-center gap-2 cursor-default
                ${
                  invoice.status === "paid"
                    ? "bg-green-900/15 text-green-400"
                    : invoice.status === "pending"
                    ? "bg-orange-900/15 text-orange-400"
                    : "bg-slate-700/15 text-slate-400"
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
            <button
              className="px-5 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 cursor-pointer"
              onClick={handleMarkAsPaid}
            >
              Mark as {invoice.status === "pending" ? "Paid" : "Pending"}
            </button>
          </div>
          <div className="flex items-center font-bold gap-4">
            <button
              className="px-5 py-2 rounded-lg bg-slate-600 hover:bg-slate-700 cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-red-700 hover:bg-red-800 cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>
            <PDFDownloadLink
              document={<InvoicePDF invoice={invoice} />}
              fileName={`invoice - ${invoice.id}.pdf`}
              className="px-5 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800"
            >
              {({ loading }) => (
                <div className="flex justify-center items-center gap-2 font-bold">
                  <Download size={20} />
                  <span>{loading ? "Loading..." : "Download"}</span>
                </div>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
