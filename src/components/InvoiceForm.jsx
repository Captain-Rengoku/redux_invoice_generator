import { Plus, Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addInvoice, toggleForm } from "../features/invoice/invoiceSlice";
import { addDays, format } from "date-fns";

const InvoiceForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(() => ({
    id: `INV${Math.floor(Math.random() * 10000)}`,
    status: "pending",
    billFrom: {
      streetAddress: "",
      city: "",
      postCode: "",
      country: "",
    },
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
    invoiceDate: format(new Date(), "yyyy-MM-dd"),
    dueDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    amount: 0,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('working')
    dispatch(addInvoice(formData));
    console.log(formData);
    // dispatch(toggleForm());
  }

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 0, price: 0, total: 0 }],
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "price") {
      // const qty = field === 'quantity' ? value : newItems[index].quantity;
      // const price = field === 'price' ? value : newItems[index].price;
      const qty = Number(newItems[index].quantity);
      const price = Number(newItems[index].price);
      newItems[index].total = qty * price;
    }
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index) => {
    setFormData({...formData, items: formData.items.filter((_,i) => i !== index)})
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center overflow-y-auto">
      <div className="bg-slate-900 m-4 sm:m-2 p-4 sm:p-6 rounded-lg w-full max-w-2xl mt-8 mb-8">
        {/* Invoice Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Invoice</h2>
          <button
            onClick={() => dispatch(toggleForm())}
            className="flex cursor-pointer rounded-lg p-2 hover:text-red-400 hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* Bill From */}
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
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="City"
                required
                className="w-full bg-slate-950 rounded-lg p-2"
                value={formData.billFrom.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billFrom: {
                      ...formData.billFrom,
                      city: e.target.value,
                    },
                  })
                }
              />
              <input
                type="text"
                placeholder="Pin Code"
                required
                className="w-full bg-slate-950 rounded-lg p-2"
                value={formData.billFrom.postCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billFrom: {
                      ...formData.billFrom,
                      postCode: e.target.value,
                    },
                  })
                }
              />
              <input
                type="text"
                placeholder="Country"
                required
                className="w-full bg-slate-950 rounded-lg p-2"
                value={formData.billFrom.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billFrom: {
                      ...formData.billFrom,
                      country: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Bill To */}
          <div className="flex flex-col gap-2">
            <h3 className="text-indigo-300">Bill To</h3>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Client's Name"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientName: e.target.value,
                  })
                }
                required
                className="w-full bg-slate-950 rounded-lg p-2"
              />
              <input
                type="email"
                placeholder="Client's Email"
                value={formData.billTo.clientEmail}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      clientEmail: e.target.value,
                    },
                  })
                }
                required
                className="w-full bg-slate-950 rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Street Address"
                value={formData.billTo.streetAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      streetAddress: e.target.value,
                    },
                  })
                }
                required
                className="w-full bg-slate-950 rounded-lg p-2"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="City"
                value={formData.billTo.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      city: e.target.value,
                    },
                  })
                }
                required
                className="w-full bg-slate-950 rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Pin Code"
                value={formData.billTo.postCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      postCode: e.target.value,
                    },
                  })
                }
                required
                className="w-full bg-slate-950 rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Country"
                value={formData.billTo.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    billTo: {
                      ...formData.billTo,
                      country: e.target.value,
                    },
                  })
                }
                required
                className="w-full bg-slate-950 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Date, Payment Terms, and Project Description */}
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={formData.invoiceDate}
                onChange={(e) => {
                  const newDate = e.target.value;
                  setFormData({
                    ...formData,
                    invoiceDate: newDate,
                    dueDate: format(
                      addDays(new Date(newDate), 30),
                      "yyyy-MM-dd"
                    ),
                  });
                }}
                required
                className="w-full bg-slate-950 rounded-lg p-2"
              />
              <select
                value={formData.paymentTerms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentTerms: e.target.value,
                  })
                }
                required
                className="w-full bg-slate-950 rounded-lg p-2"
              >
                <option value="Net 30 Days">Net 30 Days</option>
                <option value="Net 60 Days">Net 60 Days</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Project Description"
              value={formData.projectDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  projectDescription: e.target.value,
                })
              }
              required
              className="w-full bg-slate-950 rounded-lg p-2"
            />
          </div>

          {/* Item List */}
          <div className="flex flex-col gap-2">
            <h3 className="text-indigo-300">Item List</h3>
            {formData.items.map((item, index) => (
              <div
                className="grid grid-cols-12 gap-2 sm:items-center"
                key={index}
              >
                <input
                  type="text"
                  placeholder="Item Name"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2 col-span-6 sm:col-span-5"
                  value={item.name}
                  // onChange={(e) => {
                  //   const updatedItems = formData.items.map((it, i) =>
                  //     i === index ? { ...it, name: e.target.value } : it
                  //   );
                  //   setFormData({ ...formData, items: updatedItems });
                  // }}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2 col-span-3 sm:col-span-2"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  className="w-full bg-slate-950 rounded-lg p-2 col-span-3 sm:col-span-2"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                />
                <div className="flex items-center justify-end text-sm p-0.5 rounded-lg gap-2 col-span-12 sm:col-span-3">
                  <span className="p-2 rounded-lg">${item.total.toFixed(2)}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="w-fit cursor-pointer text-slate-200 rounded-lg p-2
                  hover:text-red-400 hover:bg-slate-800"
                  >
                    <Trash2 size={20}/>
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="flex items-center justify-center gap-x-2 w-full font-bold text-slate-200
            hover:text-slate-400 bg-slate-700 hover:bg-slate-800 p-2 rounded-lg cursor-pointer"
            >
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          </div>

          {/* Buttons to cancel or create the invoice */}
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
              type="submit"
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
