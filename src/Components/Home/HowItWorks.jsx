import React, { useState } from 'react'
import {
  UserCircle,
  Building2,
  LayoutDashboard,
  FilePlus,
  Share2,
  CheckCircle2,
  Zap
} from 'lucide-react'
import Title from '../Title'

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      icon: <UserCircle size={22} strokeWidth={1.5} />,
      step: "Step 01",
      title: "Create Your Account",
      description:
        "Sign up in seconds with your email. No credit card required to get started. ArthaAI gets you in and ready instantly.",
      details: [
        "Quick email & password signup",
        "Verify your account in one click",
        "Free plan available — no card needed",
      ],
    },
    {
      icon: <Building2 size={22} strokeWidth={1.5} />,
      step: "Step 02",
      title: "Set Up Your Business Profile",
      description:
        "Tell ArthaAI about your business — your company name, logo, address, and tax details. This gets auto-applied to every invoice you create.",
      details: [
        "Add company name, logo & address",
        "Set your default currency & tax rate",
        "Done once, applied everywhere",
      ],
    },
    {
      icon: <LayoutDashboard size={22} strokeWidth={1.5} />,
      step: "Step 03",
      title: "Access Your Dashboard",
      description:
        "Your central hub. See all your invoices at a glance — paid, pending, overdue. Track revenue and stay on top of your cash flow effortlessly.",
      details: [
        "View all invoices in one place",
        "Filter by status: paid, pending, overdue",
        "AI insights on your billing patterns",
      ],
    },
    {
      icon: <FilePlus size={22} strokeWidth={1.5} />,
      step: "Step 04",
      title: "Create a New Invoice",
      description:
        "Hit 'New Invoice', fill in your client details and line items. ArthaAI auto-calculates tax, totals, and formats everything professionally.",
      details: [
        "Add client, items & quantities",
        "Auto tax calculation & totals",
        "Professional formatting — instantly",
      ],
    },
    {
      icon: <Share2 size={22} strokeWidth={1.5} />,
      step: "Step 05",
      title: "Share, Print or Download",
      description:
        "Your invoice is ready. Send it via a shareable link, download as a PDF, or print it directly — however your client prefers to receive it.",
      details: [
        "Share via link or email",
        "Download as a clean PDF",
        "Print-ready in one click",
      ],
    },
    {
      icon: <CheckCircle2 size={22} strokeWidth={1.5} />,
      step: "Step 06",
      title: "Get Paid & Track Status",
      description:
        "Track when your client opens the invoice and when payment is made. ArthaAI keeps you updated every step of the way.",
      details: [
        "Know when invoice is opened",
        "Real-time payment status updates",
        "Auto-mark invoices as paid",
      ],
    },
  ]

  return (
    <div className="px-4 sm:px-8 lg:px-20 xl:px-[120px] mt-20">

        {/* Header */}
        <div className="text-center mb-14">
            <span className="inline-block text-sm text-indigo-600 bg-indigo-400/10 px-6 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                <div className='flex items-center justify-center gap-2'>
                    <Zap width={14} />
                    How It Works
                </div>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-700 tracking-tight mb-4">
            From signup to getting paid —{' '}
            <span className="text-indigo-600">in minutes.</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            ArthaAI is designed to be simple. No training needed, no complex setup.
            Just a clean, fast workflow from start to payment.
            </p>
        </div>

        {/* Steps Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 max-w-6xl mx-auto">

            {/* Left — Step List */}
            <div className="flex flex-col gap-2 lg:w-2/5">
            {steps.map((step, index) => (
                <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`text-left flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer
                    ${activeStep === index
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                >
                {/* Icon Circle */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    ${activeStep === index ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                    {step.icon}
                </div>

                <div>
                    <p className={`text-xs font-semibold mb-0.5 ${activeStep === index ? 'text-indigo-200' : 'text-indigo-500'}`}>
                    {step.step}
                    </p>
                    <p className={`text-sm font-semibold ${activeStep === index ? 'text-white' : 'text-slate-800'}`}>
                    {step.title}
                    </p>
                </div>
                </button>
            ))}
            </div>

                {/* Right — Detail Panel */}
                <div className="lg:w-3/5 bg-white border border-slate-200 rounded-2xl p-8 md:p-10 flex flex-col justify-center shadow-sm">

                {/* Step Badge */}
                <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full w-fit mb-5">
                    {steps[activeStep].step}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-5">
                    {React.cloneElement(steps[activeStep].icon, { size: 24, strokeWidth: 1.5 })}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                    {steps[activeStep].title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-7">
                    {steps[activeStep].description}
                </p>

                {/* Checklist */}
                <ul className="flex flex-col gap-3">
                    {steps[activeStep].details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={12} className="text-indigo-600" />
                        </span>
                        {detail}
                    </li>
                    ))}
                </ul>

                {/* Progress Dots */}
                <div className="flex gap-2 mt-10">
                    {steps.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeStep ? 'w-8 bg-indigo-600' : 'w-3 bg-slate-200 hover:bg-indigo-300'
                        }`}
                    />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default HowItWorks