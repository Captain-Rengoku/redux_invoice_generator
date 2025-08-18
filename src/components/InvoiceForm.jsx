import { Plus, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleForm } from "../features/invoice/invoiceSlice";
import { addDays, format } from "date-fns";

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const { formData, setFormData } = useState(() => {
    return {
      id: `INV${Math.floor(Math.random() * 10000)}`,
      status: "pending",
      billFrom: { streetAddress: "", city: "", country: "" },
      billTo: {
        clientEmail: "",
        streetAddress: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientName: "",
      items: [],
      paymentTerms: "Net 30 Days",
      projectDescription: "",
      invoiceDate: format(new Date(), "yyyy-mm-dd"),
      dueDate: format(addDays(new Date(), 30), "yyyy-mm-dd"),
      amount: 0,
    };
  });
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center overflow-y-auto">
      <div className="bg-slate-900 m-4 sm:m-2 p-4 sm:p-6 rounded-lg w-full max-w-2xl mt-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Invoice</h2>
          <button
            onClick={() => dispatch(toggleForm())}
            className="flex cursor-pointer rounded-lg p-2 hover:text-red-400 hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-indigo-300">Bill From</h3>
            <input
              type="text"
              placeholder="Street Address"
              value={formData.billFrom.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    streetAddress: e.target.value,
                  },
                })
              }
              required
              className="w-full bg-slate-950 rounded-lg p-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-indigo-300">Bill To</h3>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Pin Code"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Country"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Client's Name"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2"
                />
                <input
                  type="email"
                  placeholder="Client's Email"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Pin Code"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Country"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                placeholder="City"
                required
                className="w-full bg-slate-950 rounded-lg p-2"
              />
              <select
                name=""
                id=""
                required
                className="w-full bg-slate-950 rounded-lg p-2"
              >
                <option value="">Net 30 Days</option>
                <option value="">Net 60 Days</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Project Description"
              required
              className="w-full bg-slate-950 rounded-lg p-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-indigo-300">Item List</h3>
            <div className="grid grid-cols-12 gap-2 sm:items-center">
              <input
                type="text"
                placeholder="Item Name"
                required
                className="w-full bg-slate-950 rounded-lg p-2 col-span-6 sm:col-span-5"
              />
              <input
                type="number"
                placeholder="Quantity"
                required
                className="w-full bg-slate-950 rounded-lg p-2 col-span-3 sm:col-span-2"
                min="1"
              />
              <input
                type="number"
                placeholder="Price"
                required
                className="w-full bg-slate-950 rounded-lg p-2 col-span-3 sm:col-span-2"
                min="0"
                step="0.01"
              />
              <div className="flex items-center justify-end text-sm p-0.5 rounded-lg gap-2 col-span-12 sm:col-span-3">
                <span className="p-2 rounded-lg">Total Amount</span>
                <button
                  type="button"
                  className="w-fit cursor-pointer text-slate-200 rounded-lg p-2
                  hover:text-red-400 hover:bg-slate-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center justify-center gap-x-2 w-full font-bold text-slate-200
            hover:text-slate-400 bg-slate-700 hover:bg-slate-800 p-2 rounded-lg cursor-pointer"
            >
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => dispatch(toggleForm())}
              className="flex items-center justify-center gap-x-2 font-bold text-slate-200 hover:text-slate-400
            bg-slate-700 hover:bg-slate-800 px-3 py-2 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-x-2 font-bold text-slate-200 hover:text-slate-400
            bg-indigo-700 hover:bg-indigo-800 px-3 py-2 rounded-lg cursor-pointer"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
