import React, { useState } from "react";

const ViewInvoice = () => {

  // Share function
  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setShowToast(false), 2800);
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Download function
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[Inter] text-slate-900">

      


      {/* Page Wrapper */}
      <div className="flex justify-center p-10 print:p-0">

        {/* Invoice Sheet */}
        <div className="w-[210mm] min-h-[297mm] bg-white border border-slate-200 rounded-xl shadow-lg print:shadow-none print:border-none print:rounded-none overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-10 flex justify-between">

            <div>
              <div className="text-xl font-extrabold">
                Jane Doe Studio
              </div>

              <div className="text-xs opacity-80 mt-1 leading-relaxed">
                hello@janedoe.co <br />
                +91 98765 43210 <br />
                Mumbai, Maharashtra, India
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs uppercase opacity-70 font-bold">
                Invoice
              </div>

              <div className="text-2xl font-extrabold">
                #INV-472
              </div>

              <div className="mt-2 px-3 py-1 text-xs font-bold border border-white/40 rounded-full inline-block">
                Pending
              </div>
            </div>

          </div>


          {/* Body */}
          <div className="p-10">

            {/* Billing Row */}
            <div className="grid grid-cols-3 gap-6 border-b pb-6 mb-8">

              {/* Bill From */}
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase mb-2">
                  Bill From
                </div>

                <div className="font-bold text-sm">
                  Jane Doe Studio
                </div>

                <div className="text-xs text-slate-500 mt-1">
                  hello@janedoe.co <br />
                  +91 98765 43210 <br />
                  Mumbai, MH 400001
                </div>
              </div>


              {/* Bill To */}
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase mb-2">
                  Bill To
                </div>

                <div className="font-bold text-sm">
                  Acme Corp
                </div>

                <div className="text-xs text-slate-500 mt-1">
                  billing@acme.com <br />
                  +91 91234 56789 <br />
                  Bengaluru, KA 560001
                </div>
              </div>


              {/* Dates */}
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase mb-2">
                  Invoice Dates
                </div>

                <div className="text-sm font-semibold">
                  Issue Date: Feb 21, 2026
                </div>

                <div className="text-sm font-semibold">
                  Due Date: Mar 07, 2026
                </div>

                <div className="text-sm font-semibold">
                  Terms: Net 30
                </div>

              </div>

            </div>


            {/* Items Table */}
            <table className="w-full text-sm">

              <thead className="bg-slate-50 border-y">

                <tr className="text-xs uppercase text-slate-400">

                  <th className="py-3 text-left">#</th>

                  <th className="py-3 text-left">
                    Description
                  </th>

                  <th className="py-3 text-center">
                    Qty
                  </th>

                  <th className="py-3 text-right">
                    Unit
                  </th>

                  <th className="py-3 text-right">
                    Amount
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr className="border-b">
                  <td className="py-3 text-slate-400">
                    01
                  </td>

                  <td>
                    <div className="font-semibold">
                      UI Design
                    </div>
                  </td>

                  <td className="text-center">
                    3
                  </td>

                  <td className="text-right">
                    ₹5,000
                  </td>

                  <td className="text-right font-bold">
                    ₹15,000
                  </td>

                </tr>


                <tr>
                  <td className="py-3 text-slate-400">
                    02
                  </td>

                  <td>
                    <div className="font-semibold">
                      Frontend Development
                    </div>
                  </td>

                  <td className="text-center">
                    10
                  </td>

                  <td className="text-right">
                    ₹3,000
                  </td>

                  <td className="text-right font-bold">
                    ₹30,000
                  </td>

                </tr>

              </tbody>

            </table>


            {/* Summary */}
            <div className="flex justify-end mt-6">

              <div className="w-64">

                <div className="flex justify-between py-2 text-sm border-b">
                  <span className="text-slate-500">
                    Subtotal
                  </span>
                  <span className="font-semibold">
                    ₹57,500
                  </span>
                </div>


                <div className="flex justify-between py-2 text-sm border-b">
                  <span className="text-slate-500">
                    Tax
                  </span>
                  <span className="font-semibold">
                    ₹10,350
                  </span>
                </div>

                <div className="flex justify-between py-2 text-sm border-b">
                  <span className="text-slate-500">
                    Discount
                  </span>
                  <span className="font-semibold">
                    ₹1,000
                  </span>
                </div>


                <div className="flex justify-between items-center mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <span className="font-bold">
                    Total Due
                  </span>

                  <span className="text-lg font-extrabold text-indigo-600">
                    ₹63,975
                  </span>
                </div>

              </div>

            </div>

          </div>


          {/* Footer */}
          <div className="bg-slate-50 border-t p-6 flex justify-between text-xs">

            <div className="font-bold text-indigo-600">
              ArthAI
            </div>

            <div className="text-slate-400 text-right">
              Invoice #INV-472 <br />
              hello@janedoe.co
            </div>

          </div>


          {/* Thank You */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-3 text-xs font-semibold">
            Thank you for your business 🙏
          </div>

        </div>

      </div>

    </div>
  );
}

export default ViewInvoice;