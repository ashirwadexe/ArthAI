import React, { useState } from "react";
import { Plus, Trash2, ArrowLeft, Save } from "lucide-react";

const NewInvoice = () => {

  // ─────────────────────────────────────────────────────────────────
  // INVOICE STATE
  // Yahan hum invoice ke saare basic fields store kar rahe hain
  // Har field directly MongoDB model ke saath match karti hai
  // ─────────────────────────────────────────────────────────────────
  const [invoice, setInvoice] = useState({
    invoiceNumber: "INV-" + Math.floor(100 + Math.random() * 900), // random number generate ho raha hai
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    issueDate: "",
    dueDate: "",
    tax: "",       // tax % user khud daalta hai
    discount: "",  // discount % user khud daalta hai
    status: "Pending", // default status Pending hai
  });

  // ─────────────────────────────────────────────────────────────────
  // ITEMS STATE
  // Yeh ek array hai — har item ek object hai
  // { description, quantity, price } — model ke items array se match karta hai
  // ─────────────────────────────────────────────────────────────────
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);

  // ─────────────────────────────────────────────────────────────────
  // VALIDATION ERRORS STATE
  // Jab user form submit kare bina fields bhare
  // toh errors yahan store hote hain aur red mein dikhte hain
  // ─────────────────────────────────────────────────────────────────
  const [errors, setErrors] = useState({});


  // ─────────────────────────────────────────────────────────────────
  // CALCULATIONS
  // Yeh sab auto calculate hota hai jab bhi items ya tax/discount change ho
  // ─────────────────────────────────────────────────────────────────

  // subtotal = har item ka (quantity × price) ka total sum
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // taxAmt = subtotal ka tax% nikalna
  // e.g. subtotal=1000, tax=18 → taxAmt = 1000 * 18 / 100 = 180
  const taxAmt = subtotal * (parseFloat(invoice.tax) || 0) / 100;

  // discountAmt = subtotal ka discount% nikalna
  // e.g. subtotal=1000, discount=10 → discountAmt = 1000 * 10 / 100 = 100
  const discountAmt = subtotal * (parseFloat(invoice.discount) || 0) / 100;

  // totalAmount = final amount jo client ko pay karna hoga
  const totalAmount = subtotal + taxAmt - discountAmt;

  // fmt = number ko Indian rupee format mein convert karna
  // e.g. 10000 → ₹10,000.00
  const fmt = (n) =>
    "₹" + Math.max(0, n).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });


  // ─────────────────────────────────────────────────────────────────
  // HANDLE INVOICE FIELD CHANGE
  // Jab bhi koi basic input field change ho (name, email, date etc.)
  // yeh function call hota hai aur state update karta hai
  // ─────────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });

    // agar us field ka error tha toh clear kar do
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };


  // ─────────────────────────────────────────────────────────────────
  // HANDLE ITEM FIELD CHANGE
  // Jab items table mein koi cell change ho
  // index = konsa item, field = kaunsa field, value = naya value
  // ─────────────────────────────────────────────────────────────────
  const handleItemChange = (index, field, value) => {
    const updated = [...items]; // purani array copy karo

    // description string hai, baaki number hain
    updated[index][field] = field === "description" ? value : Number(value);

    setItems(updated); // updated array set karo
  };


  // ─────────────────────────────────────────────────────────────────
  // ADD NEW ITEM ROW
  // "Add Item" button click pe ek naya empty item row add hota hai
  // ─────────────────────────────────────────────────────────────────
  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };


  // ─────────────────────────────────────────────────────────────────
  // REMOVE ITEM ROW
  // Trash icon click pe us index ka item remove hota hai
  // Minimum 1 item rehna chahiye isliye check lagaya hai
  // ─────────────────────────────────────────────────────────────────
  const removeItem = (index) => {
    if (items.length === 1) return; // ek se kam nahi hone denge
    setItems(items.filter((_, i) => i !== index));
  };


  // ─────────────────────────────────────────────────────────────────
  // FORM VALIDATION
  // Submit se pehle check karta hai ki sab required fields bhare hain
  // Agar nahi hain toh error object return karta hai
  // ─────────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!invoice.clientName.trim())    e.clientName    = "Client name is required";
    if (!invoice.clientEmail.trim())   e.clientEmail   = "Client email is required";
    if (!invoice.clientPhone.trim())   e.clientPhone   = "Client phone is required";
    if (!invoice.clientAddress.trim()) e.clientAddress = "Client address is required";
    if (!invoice.issueDate)            e.issueDate     = "Issue date is required";
    if (!invoice.dueDate)              e.dueDate       = "Due date is required";

    // har item ka description check karo
    items.forEach((item, i) => {
      if (!item.description.trim()) e[`item_desc_${i}`] = "Required";
    });

    return e;
  };


  // ─────────────────────────────────────────────────────────────────
  // FORM SUBMIT
  // Validate karo → agar errors hain toh show karo
  // Agar sab sahi hai toh final data console mein print karo
  // (yahan baad mein API call add karoge)
  // ─────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault(); // page reload rokna

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs); // errors state mein daalo taaki UI mein dikhe
      return;
    }

    // Final payload jo backend ko bhejna hoga
    const payload = {
      ...invoice,
      items,
      subtotal,
      totalAmount,
      tax:      parseFloat(invoice.tax)      || 0,
      discount: parseFloat(invoice.discount) || 0,
    };

    // TODO: yahan API call lagao
    // e.g. axios.post("/api/invoices", payload)
    console.log("Invoice Data:", payload);
    alert("Invoice saved! Check console for data.");
  };


  // ─────────────────────────────────────────────────────────────────
  // INPUT CLASS HELPER
  // Error hone pe red border, normal hone pe gray border
  // Code repeat na ho isliye ek helper function banaya
  // ─────────────────────────────────────────────────────────────────
  const inputCls = (field) =>
    `w-full border rounded-lg px-3 py-2 text-sm outline-none transition ${
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-50"
        : "border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50"
    }`;


  // ─────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen max-w-6xl mx-auto">

      {/* ── TOP BAR ──────────────────────────────────────────────────
          Sticky header with back button and save button
          Position sticky hai taaki scroll karne pe bhi upar rahe
      ────────────────────────────────────────────────────────────── */}
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">

          {/* Back button — navigate("/dashboard") yahan lagana hai */}
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-lg transition text-slate-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg font-bold text-slate-800">New Invoice</h1>
            {/* Auto generated invoice number */}
            <p className="text-xs text-slate-400">{invoice.invoiceNumber}</p>
          </div>
        </div>

        {/* Save button — form submit trigger karta hai */}
        <button
          type="submit"
          form="invoiceForm"
          className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
        >
          <Save className="w-4 h-4" />
          Save Invoice
        </button>
      </div>


      {/* ── MAIN FORM ─────────────────────────────────────────────── */}
      <form
        id="invoiceForm"
        onSubmit={handleSubmit}
        className="p-6 space-y-5 max-w-6xl mx-auto"
      >

        {/* ════════════════════════════════════════════════════════
            SECTION 1 — INVOICE DETAILS
            invoiceNumber, status, issueDate, dueDate
        ════════════════════════════════════════════════════════ */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

          {/* Section heading with numbered badge */}
          <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm">
            <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center text-xs font-bold">
              1
            </span>
            Invoice Details
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {/* Invoice Number — read only bhi kar sakte ho */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Invoice Number
              </label>
              <input
                type="text"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleChange}
                className={inputCls("invoiceNumber") + " mt-1"}
              />
            </div>

            {/* Status — model mein sirf Pending aur Paid hai */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Status
              </label>
              <select
                name="status"
                value={invoice.status}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 bg-white cursor-pointer transition"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            {/* Issue Date */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Issue Date
              </label>
              <input
                type="date"
                name="issueDate"
                value={invoice.issueDate}
                onChange={handleChange}
                className={inputCls("issueDate") + " mt-1"}
              />
              {/* Error message — sirf tab dikhega jab error ho */}
              {errors.issueDate && (
                <p className="text-xs text-red-500 mt-1">{errors.issueDate}</p>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={invoice.dueDate}
                onChange={handleChange}
                className={inputCls("dueDate") + " mt-1"}
              />
              {errors.dueDate && (
                <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>
              )}
            </div>

          </div>
        </div>


        {/* ════════════════════════════════════════════════════════
            SECTION 2 — CLIENT DETAILS
            clientName, clientEmail, clientPhone, clientAddress
            Yeh sab model mein required fields hain
        ════════════════════════════════════════════════════════ */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

          <h2 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm">
            <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center text-xs font-bold">
              2
            </span>
            Client Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Client Name */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Client Name
              </label>
              <input
                type="text"
                name="clientName"
                placeholder="Acme Corp"
                value={invoice.clientName}
                onChange={handleChange}
                className={inputCls("clientName") + " mt-1"}
              />
              {errors.clientName && (
                <p className="text-xs text-red-500 mt-1">{errors.clientName}</p>
              )}
            </div>

            {/* Client Email */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Client Email
              </label>
              <input
                type="email"
                name="clientEmail"
                placeholder="billing@acme.com"
                value={invoice.clientEmail}
                onChange={handleChange}
                className={inputCls("clientEmail") + " mt-1"}
              />
              {errors.clientEmail && (
                <p className="text-xs text-red-500 mt-1">{errors.clientEmail}</p>
              )}
            </div>

            {/* Client Phone */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Client Phone
              </label>
              <input
                type="tel"
                name="clientPhone"
                placeholder="+91 98765 43210"
                value={invoice.clientPhone}
                onChange={handleChange}
                className={inputCls("clientPhone") + " mt-1"}
              />
              {errors.clientPhone && (
                <p className="text-xs text-red-500 mt-1">{errors.clientPhone}</p>
              )}
            </div>

            {/* Client Address */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Client Address
              </label>
              <input
                type="text"
                name="clientAddress"
                placeholder="123 Street, City, State"
                value={invoice.clientAddress}
                onChange={handleChange}
                className={inputCls("clientAddress") + " mt-1"}
              />
              {errors.clientAddress && (
                <p className="text-xs text-red-500 mt-1">{errors.clientAddress}</p>
              )}
            </div>

          </div>
        </div>


        {/* ════════════════════════════════════════════════════════
            SECTION 3 — LINE ITEMS
            Dynamic rows — user add/remove kar sakta hai
            Har row mein description, quantity, price hai
            Amount auto calculate hota hai (qty × price)
        ════════════════════════════════════════════════════════ */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

          {/* Section header with Add Item button */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
              <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center text-xs font-bold">
                3
              </span>
              Line Items
            </h2>

            {/* Add Item — ek naya empty row add karta hai */}
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1.5 text-indigo-600 text-sm font-semibold hover:text-indigo-700 transition"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>

          {/* Table Column Headers */}
          <div className="grid grid-cols-12 text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-2 bg-slate-50 border-b border-gray-100">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Price (₹)</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>

          {/* Items List — items array ko map karke har item ka row render */}
          <div className="divide-y divide-gray-50 px-6">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 py-3 items-center">

                {/* Description input */}
                <div className="col-span-6">
                  <input
                    type="text"
                    placeholder="Service or product description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition ${
                      errors[`item_desc_${index}`]
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50"
                    }`}
                  />
                  {errors[`item_desc_${index}`] && (
                    <p className="text-xs text-red-500 mt-0.5">Description required</p>
                  )}
                </div>

                {/* Quantity input */}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition"
                />

                {/* Price input */}
                <input
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", e.target.value)}
                  className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-right outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition"
                />

                {/* Row total (qty × price) + Delete button */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  {/* Auto calculated amount */}
                  <span className="font-semibold text-sm text-slate-700">
                    {fmt(item.quantity * item.price)}
                  </span>

                  {/* Delete row button — disabled if only 1 item */}
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>


        {/* ════════════════════════════════════════════════════════
            SECTION 4 — TAX, DISCOUNT & SUMMARY
            Left side: Tax % aur Discount % input
            Right side: Live summary with calculated totals
        ════════════════════════════════════════════════════════ */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-slate-700 flex items-center gap-2 text-sm">
              <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center text-xs font-bold">
                4
              </span>
              Tax, Discount & Summary
            </h2>
          </div>

          {/* 2 column layout — left inputs, right summary */}
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">

            {/* LEFT — Tax & Discount inputs */}
            <div className="p-6 space-y-5">

              {/* Tax Rate input */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Tax Rate (%)
                </label>
                <div className="relative mt-1">
                  <input
                    type="number"
                    name="tax"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="e.g. 18"
                    value={invoice.tax}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition"
                  />
                  {/* % symbol on right side of input */}
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                    %
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your tax / GST rate. Leave blank if not applicable.
                </p>
              </div>

              {/* Discount % input */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Discount (%)
                </label>
                <div className="relative mt-1">
                  <input
                    type="number"
                    name="discount"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="e.g. 10"
                    value={invoice.discount}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                    %
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Discount is applied on subtotal.
                </p>
              </div>

            </div>

            {/* RIGHT — Live Summary */}
            <div className="p-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
                Invoice Summary
              </p>

              <div className="space-y-3">

                {/* Subtotal row */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-semibold text-slate-700">{fmt(subtotal)}</span>
                </div>

                {/* Tax row — faded when tax is 0 */}
                <div className={`flex justify-between items-center text-sm transition-opacity ${!invoice.tax ? "opacity-40" : ""}`}>
                  <span className="text-slate-500">Tax ({invoice.tax || 0}%)</span>
                  <span className="font-semibold text-slate-700">{fmt(taxAmt)}</span>
                </div>

                {/* Discount row — faded when discount is 0 */}
                <div className={`flex justify-between items-center text-sm transition-opacity ${!invoice.discount ? "opacity-40" : ""}`}>
                  <span className="text-slate-500">Discount ({invoice.discount || 0}%)</span>
                  {/* Green color for discount to show it's being deducted */}
                  <span className="font-semibold text-green-600">− {fmt(discountAmt)}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-gray-200 pt-3">
                  {/* Total Due — final amount */}
                  <div className="flex justify-between items-center p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
                    <span className="font-bold text-slate-800">Total Due</span>
                    <span className="font-bold text-indigo-600 text-xl">
                      {fmt(totalAmount)}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>


        {/* ════════════════════════════════════════════════════════
            FOOTER BUTTONS
            Cancel aur Save Invoice
        ════════════════════════════════════════════════════════ */}
        <div className="flex justify-end gap-3 pb-8">

          {/* Cancel — navigate("/dashboard") yahan lagana */}
          <button
            type="button"
            className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          {/* Submit button */}
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
          >
            <Save className="w-4 h-4" />
            Save Invoice
          </button>

        </div>

      </form>
    </div>
  );
};

export default NewInvoice;