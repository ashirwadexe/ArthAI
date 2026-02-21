import React, { useEffect, useState } from 'react'
import {Plus, Dot, Star, IndianRupee, ChevronUp, CircleCheckBig, Clock4, ChevronDown, Clock12, ArrowRight} from 'lucide-react'
import InvoiceTable from '../Components/InvoiceTable';
import {Link} from 'react-router-dom'

const Dashboard = () => {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentTime(new Date());
      }, 1000);
  }, []);

  const day = currentTime.toLocaleDateString("en-US", { weekday: "long"} );

  const date = currentTime.toDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
  });

  const time = currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
  });


  return (
    <div className='max-w-6xl mx-auto px-4 py-6'>

      {/* HEADER OF DASHBOARD */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-4xl font-bold text-slate-800'>Dashboard</h1>
          <div className='flex items-center justify-center gap-2'>
            <p className='text-slate-500 text-sm '>{day},</p>
            <p className='text-slate-500 text-sm '>{date},</p>
            <p className='text-slate-500 text-sm '>{time}</p>
            <Dot className='m-0 p-0 text-slate-500'/>
            <p className='text-slate-500 text-sm'>Hello, Ashirwad 👋🏻</p>
          </div>
        </div>

        <div className='flex items-center justify-center gap-4'>
          <button
           className='flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:scale-[1.01] transition cursor-pointer'
          >
            <Star className='size-4'/>
            Analyze with AI
          </button>
          <Link
            to='/app/builder'
            className='flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.01] cursor-pointer transition'
          >
            <Plus className='size-4'/>
            New Invoice
          </Link>
        </div>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-lg hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-2 cursor-pointer">
          <IndianRupee className="bg-[#EEF2FF] text-[#6366F1] size-10 rounded-lg p-2"/>
          <h2 className="text-sm text-slate-500">Total Revenue</h2>

          <p className="flex items-center font-bold text-2xl">
            <IndianRupee className="stroke-[3]" />
            10,540
          </p>

          <p className="flex items-center gap-2 text-green-400 text-sm">
            <ChevronUp className="size-4"/>
            12.4% vs last month
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-lg hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-2 cursor-pointer">
          <CircleCheckBig className="bg-[#ECFDF5] text-[#10B981] size-10 rounded-lg p-2"/>
          <h2 className="text-sm text-slate-500">Paid Invoices</h2>

          <p className="font-bold text-2xl">34</p>

          <p className="flex items-center gap-2 text-green-400 text-sm">
            <ChevronUp className="size-4"/>
            5 new this month
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-lg hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-2 cursor-pointer">
          <Clock4 className="bg-[#FFFBEB] text-[#F59E0B] size-10 rounded-lg p-2"/>
          <h2 className="text-sm text-slate-500">Pending</h2>

          <p className="flex items-center font-bold text-2xl">
            <IndianRupee className="stroke-[3]" />
            5,033
          </p>

          <p className="flex items-center gap-2 text-red-400 text-sm">
            <ChevronDown className="size-4"/>
            7 pending this month
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-lg hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-2 cursor-pointer">
          <Clock12 className="bg-[#FEF2F2] text-[#EF4444] size-10 rounded-lg p-2"/>
          <h2 className="text-sm text-slate-500">Overdue</h2>

          <p className="flex items-center font-bold text-2xl">
            <IndianRupee className="stroke-[3]" />
            3,400
          </p>

          <p className="flex items-center gap-2 text-red-400 text-sm">
            <ChevronDown className="size-4"/>
            3 overdue this month
          </p>
        </div>
      </div>

      {/* AI INSIGHT BUTTON */}
      <div className='flex items-center justify-between mt-10 border bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 p-5 rounded-xl shadow-[0_2px_8px_rgba(79,70,229,0.08)]'>
        <div className='flex items-center justify-start gap-5'>
          <button className='flex items-center justify-center bg-indigo-600 text-white rounded-full px-6 py-2 gap-1 font-semibold text-xs'>
            <Star className='size-3 stroke-3'/>
            AI INSIGHT
          </button>
          <div className='flex flex-col'>
            <h3 className='text-gray-900'>2 invoices are likely to be paid late based on client history</h3>
            <p className='text-gray-500 text-sm'>Consider sending a payment reminder to these two customers.</p>
          </div>
        </div>
        <button className='flex items-center justify-center bg-white text-gray-900 border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 text-xs px-6 py-2 font-semibold rounded-full'>
          View Insights
          <ArrowRight/>
        </button>
      </div>

      {/* RECENT INVOICE TABLE */}
      <InvoiceTable/>
    </div>
  )
}

export default Dashboard