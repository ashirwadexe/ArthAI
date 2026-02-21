import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Save } from 'lucide-react';

const InvoiceBuilder = () => {

  // --- State Management ---
  const [invoiceDetails, setInvoiceDetails] = useState({
    number: '',
    status: '',
    issueDate: '',
    dueDate: '',
    clientName: '',
    clientEmail: '',
    taxRate: '',
    discountRate: '',
    notes: ''
  });

  const [items, setItems] = useState([
    { id: Date.now(), description: '', qty: '', price: '' },
  ]);

  const [totals, setTotals] = useState({
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0
  });

  // --- Calculate totals ---
  useEffect(() => {

    const subtotal = items.reduce((acc, item) => {
      const qty = Number(item.qty) || 0;
      const price = Number(item.price) || 0;
      return acc + (qty * price);
    }, 0);

    const taxRate = Number(invoiceDetails.taxRate) || 0;
    const discountRate = Number(invoiceDetails.discountRate) || 0;

    const taxAmount = subtotal * (taxRate / 100);
    const discountAmount = subtotal * (discountRate / 100);

    const total = subtotal + taxAmount - discountAmount;

    setTotals({
      subtotal,
      tax: taxAmount,
      discount: discountAmount,
      total
    });

  }, [items, invoiceDetails.taxRate, invoiceDetails.discountRate]);


  // --- Functions ---

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), description: '', qty: '', price: '' }
    ]);
  };


  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };


  const updateItem = (id, field, value) => {

    const newItems = items.map(item => {

      if (item.id === id) {

        return {
          ...item,
          [field]: field === 'description' ? value : value
        };

      }

      return item;

    });

    setItems(newItems);
  };


  const updateInvoiceField = (field, value) => {

    setInvoiceDetails({
      ...invoiceDetails,
      [field]: value
    });

  };


  return (

    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-700">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* SECTION 1 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-indigo-100 text-indigo-600 w-6 h-6 flex items-center justify-center rounded text-xs font-bold">
              1
            </span>
            <h2 className="font-semibold text-slate-800">
              Invoice Details
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Field
              label="INVOICE NUMBER"
              placeholder="e.g. INV-001"
              value={invoiceDetails.number}
              onChange={(e) => updateInvoiceField('number', e.target.value)}
            />
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500">
                STATUS
              </label>
              <select
                value={invoiceDetails.status}
                onChange={(e) => updateInvoiceField('status', e.target.value)}
                className="border border-slate-200 rounded-md p-2 bg-slate-50 text-sm focus:outline-indigo-500"
              >
                <option value="">Select status</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <Field
              label="ISSUE DATE"
              type="date"
              value={invoiceDetails.issueDate}
              onChange={(e) => updateInvoiceField('issueDate', e.target.value)}
            />

            <Field
              label="DUE DATE"
              type="date"
              value={invoiceDetails.dueDate}
              onChange={(e) => updateInvoiceField('dueDate', e.target.value)}
            />
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-indigo-100 text-indigo-600 w-6 h-6 flex items-center justify-center rounded text-xs font-bold">
              2
            </span>
            <h2 className="font-semibold text-slate-800">
              Client Details
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="CLIENT NAME"
              placeholder="Acme Corp"
              value={invoiceDetails.clientName}
              onChange={(e) => updateInvoiceField('clientName', e.target.value)}
            />

            <Field
              label="CLIENT EMAIL"
              placeholder="billing@acme.com"
              value={invoiceDetails.clientEmail}
              onChange={(e) => updateInvoiceField('clientEmail', e.target.value)}
            />
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-600 w-6 h-6 flex items-center justify-center rounded text-xs font-bold">
                3
              </span>
              <h2 className="font-semibold text-slate-800">
                Line Items
              </h2>
            </div>
            <button
              onClick={addItem}
              className="flex items-center gap-1 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 px-2 py-1 rounded"
            >
              <Plus size={16} />
              Add Item
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 text-[10px] font-bold text-slate-400 px-2">
              <div className="col-span-6">DESCRIPTION</div>
              <div className="col-span-2">QTY</div>
              <div className="col-span-2">UNIT PRICE</div>
              <div className="col-span-2 text-right">AMOUNT</div>
            </div>

            {items.map((item) => {
              const qty = Number(item.qty) || 0;
              const price = Number(item.price) || 0;

              return (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-center group">
                  <div className="col-span-6">
                    <input
                      placeholder="Item description"
                      className="w-full border border-slate-200 rounded-md p-2 text-sm focus:outline-indigo-500"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, 'description', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-slate-200 rounded-md p-2 text-sm focus:outline-indigo-500"
                      value={item.qty}
                      onChange={(e) =>
                        updateItem(item.id, 'qty', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-slate-200 rounded-md p-2 text-sm focus:outline-indigo-500 text-right"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(item.id, 'price', e.target.value)
                      }
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-3">
                    <span className="font-semibold text-sm">
                      ₹{(qty * price).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-300 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-indigo-100 text-indigo-600 w-6 h-6 flex items-center justify-center rounded text-xs font-bold">
              4
            </span>
            <h2 className="font-semibold text-slate-800">
              Summary
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500">
                  TAX RATE (%)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 18"
                  className="w-full border border-slate-200 rounded-md p-2 text-sm mt-1"
                  value={invoiceDetails.taxRate}
                  onChange={(e) =>
                    updateInvoiceField('taxRate', e.target.value)
                  }
                />
              </div>

              <div>

                <label className="text-[10px] font-bold text-slate-500">
                  DISCOUNT (%)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 10"
                  className="w-full border border-slate-200 rounded-md p-2 text-sm mt-1"
                  value={invoiceDetails.discountRate}
                  onChange={(e) =>
                    updateInvoiceField('discountRate', e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{totals.tax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>₹{totals.discount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    ₹{totals.total.toLocaleString()}
                  </span>
                </div>
              </div>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition mt-6">
                <Save size={18} />
                Save Invoice
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

};


// YE INPUT FEILD KO BAAR BAAR REPEAT HONE SE BACHA RAHA HAI
const Field = ({ label, type = "text", ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-bold text-slate-500 uppercase">
      {label}
    </label>
    <input
      type={type}
      className="border border-slate-200 rounded-md p-2 text-sm focus:outline-indigo-500 bg-white"
      {...props}
    />
  </div>
);


export default InvoiceBuilder;