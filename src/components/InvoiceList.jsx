import { ChevronRight } from "lucide-react";
import React from "react";

const InvoiceList = () => {
  return (
    <div className="space-y-4">
      <div
        className="bg-slate-900 rounded-lg p-4 sm:p-6 flex sm:items-center justify-between 
        hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
      >
        <div className="flex flex-col sm:flex-row items-center gap-y-2 sm:gap-x-6 text-slate-400">
          <span>Invoice ID</span>
          <span>Due Date</span>
          <span className="text-slate-200 mt-2 sm:mt-0">John Doe</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 text-slate-400 text-lg sm:text-2xl font-bold">
          <span>$350</span>
          <span className="capitalize">Invoice Status</span>
        </div>
        <ChevronRight className="text-indigo-300" />
      </div>
    </div>
  );
};

export default InvoiceList;
