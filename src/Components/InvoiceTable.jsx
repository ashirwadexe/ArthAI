import { Eye } from 'lucide-react';
import React from 'react'

const InvoiceTable = () => {

    const invoices = [
        {
            id: "INV-001",
            client: "Rohit Sharma",
            amount: "₹5,400",
            date: "12 Feb 2026",
            status: "Paid",
        },
        {
            id: "INV-002",
            client: "Anjali Verma",
            amount: "₹3,200",
            date: "10 Feb 2026",
            status: "Pending",
        },
        {
            id: "INV-003",
            client: "Tech Solutions",
            amount: "₹8,750",
            date: "08 Feb 2026",
            status: "Overdue",
        },
    ];
    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm mt-6">
      
        {/* Header */}
        <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-slate-800">
            Recent Invoices
            </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            
            <thead className="bg-gray-50 text-sm text-slate-500">
                <tr>
                <th className="px-5 py-3 font-medium">Invoice#</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Action</th>
                </tr>
            </thead>

            <tbody className="text-sm text-slate-700">
                {invoices.map((invoice, index) => (
                <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                    
                    <td className="px-5 py-4 font-medium">
                    {invoice.id}
                    </td>

                    <td className="px-5 py-4">
                    {invoice.client}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                    {invoice.amount}
                    </td>

                    <td className="px-5 py-4">
                    {invoice.date}
                    </td>

                    <td className="px-5 py-4">
                    <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                        invoice.status === "Paid"
                            ? "bg-green-100 text-green-600"
                            : invoice.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                        {invoice.status}
                    </span>
                    </td>

                    <td className="px-5 py-4">
                    <button className="text-indigo-600 hover:text-indigo-800  cursor-pointer">
                        <Eye className="size-5" />
                    </button>
                    </td>

                </tr>
                ))}
            </tbody>

            </table>
        </div>

    </div>
  );
    
}

export default InvoiceTable