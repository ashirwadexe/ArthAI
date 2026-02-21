import React from 'react'
import {
  FileText,
  Download,
  Share2,
  BrainCircuit,
  ClipboardCheck,
  Upload,
  ShieldCheck,
  Zap
} from 'lucide-react'
import Title from '../Title'

const Features = () => {
  const features = [
    {
      icon: <FileText size={18} stroke="#4f39f6" strokeWidth={1.5} />,
      title: "AI Invoice Generation",
      description: "Describe your work in plain English and ArthaAI instantly builds a professional, tax-accurate, client-ready invoice in seconds.",
      hasAccent: false
    },
    {
      icon: <Download size={18} stroke="#4f39f6" strokeWidth={1.5} />,
      title: "Download Invoices",
      description: "Export any invoice as a polished PDF in one click — ready to send, file, or archive whenever you need it.",
      hasAccent: true
    },
    {
      icon: <Share2 size={18} stroke="#4f39f6" strokeWidth={1.5} />,
      title: "Share Instantly",
      description: "Send invoices directly to clients via a shareable link or email — no downloads required on their end.",
      hasAccent: false
    },
    {
      icon: <BrainCircuit size={18} stroke="#4f39f6" strokeWidth={1.5} />,
      title: "AI-Powered Analysis",
      description: "Let AI scan and analyze your invoices — catching errors, flagging anomalies, and surfacing insights about your billing patterns.",
      hasAccent: false
    },
    {
      icon: <ClipboardCheck size={18} stroke="#4f39f6" strokeWidth={1.5} />,
      title: "Payment Status Tracking",
      description: "Know exactly where every invoice stands — sent, opened, pending, or paid — all in one real-time dashboard.",
      hasAccent: false
    },
    {
      icon: <Upload size={18} stroke="#4f39f6" strokeWidth={1.5} />,
      title: "Upload Existing Invoices",
      description: "Already have invoices? Upload them and ArthaAI will read, organize, and analyze them just like natively created ones.",
      hasAccent: false
    },
    {
      icon: <ShieldCheck size={18} stroke="#4f39f6" strokeWidth={1.5} />,
      title: "End-to-End Encryption",
      description: "Your financial data is protected with bank-grade encryption — secure at rest, secure in transit, always private.",
      hasAccent: false
    },
    {
      icon: <Zap size={18} stroke="#4f39f6" strokeWidth={1.5} />,
      title: "Lightning Fast",
      description: "From generation to delivery, everything in ArthaAI is optimized for speed — because your time is money.",
      hasAccent: false
    }
  ]

  return (
        <div className="px-4 sm:px-8 lg:px-20 xl:px-[120px] flex flex-col items-center gap-4 mt-20">

        {/* BADGE */}
        <div className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-400/10 rounded-full px-6 py-1.5">
            <Zap width={14} />
            <span>Features</span>
        </div>

        <Title 
            title='One platform. Every billing problem solved.' 
            description='From the moment a project ends to the second payment clears, InvoiceAI handles the entire financial lifecycle — accurately, automatically, and intelligently.'
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl w-full border-t border-l border-zinc-200 lg:mt-8 md:mt-5 mt-2">
            {features.map((feature, index) => (
                <div
                key={index}
                className={`relative p-6 md:p-8 flex flex-col gap-4 border-r border-b border-zinc-200 transition-all duration-300 cursor-pointer
                    ${index === 0
                    ? 'bg-gradient-to-b from-white to-[#EEF0FF]'
                    : 'bg-white hover:bg-gradient-to-b hover:from-white hover:to-[#EEF0FF]'
                    }`}
                >
                {/* Accent Bar */}
                {feature.hasAccent && (
                    <div className="absolute left-0 top-10 bottom-10 w-1.5 bg-indigo-500 rounded-r" />
                )}

                {/* Icon + Title */}
                <div className="flex items-center gap-2.5 mb-1">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <h3 className="text-sm font-medium text-zinc-800 leading-snug">
                    {feature.title}
                    </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-600 leading-relaxed">
                    {feature.description}
                </p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Features