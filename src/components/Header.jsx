import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Filter, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/invoice/invoiceSlice";

const status = ["all", "paid", "pending", "draft"];

const Header = ({ onNewInvoice }) => {
  const dispatch = useDispatch();
  const { invoices, filter } = useSelector((state) => state.invoices);

  return (
    <div className="flex items-start justify-between bg-slate-900 p-4 mb-4 rounded-lg">
      <div>
        <h1 className="text-3xl font-bold mb-2">Invoices</h1>
        <p className="text-slate-400 text-lg">
          {invoices.length === 0
            ? `No Invoice`
            : <>There are total <span className="text-orange-500">{invoices.length}</span> invoices</>
          }
        </p>
      </div>
      <div className="flex items-center gap-x-2 sm:gap-x-4">
        <Menu as="div" className="relative">
          <MenuButton
            className="flex items-center font-semibold cursor-pointer rounded-lg 
                bg-slate-700 hover:bg-slate-700/90 p-2 sm:pr-4 text-slate-200 hover:text-slate-400"
          >
            <div className="p-2">
              <Filter size={20} />
            </div>
            <span className="hidden sm:block">Filter by Status</span>
          </MenuButton>
          <MenuItems
            className={
              "absolute top-16 right-0 w-full min-w-36 bg-slate-800 rounded-lg shadow-lg p-2 z-10 space-y-1"
            }
          >
            {status?.map((stat) => (
              <MenuItem key={stat}>
                {({ active }) => (
                  <button 
                    className={`w-full text-left mx-auto p-2 cursor-pointer rounded-lg capitalize
                      ${active && 'bg-slate-950' } ${filter === stat && `bg-slate-900 text-indigo-300`}
                    `}
                    onClick={() => dispatch(setFilter(stat))}
                  >
                    {stat}
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
        <button
          className="bg-indigo-700 hover:bg-indigo-800 font-semibold rounded-lg 
        p-2 sm:pr-4 cursor-pointer text-slate-200 hover:text-slate-400"
        >
          <div
            className="flex justify-center items-center"
            onClick={onNewInvoice}
          >
            <div className="p-2">
              <Plus size={20} />
            </div>
            <span className="hidden sm:block">New Invoice</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
