import { useState, useRef, useEffect } from 'react'
import './App.css'

const defaultForm = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  workExperience: '',
  education: '',
  skills: '',
  summary: '',
}

const ACCENT_COLORS = [
  { name: 'Blue', value: '#4f46e5', light: '#eef2ff', lightText: '#4338ca', border: '#c7d2fe' },
  { name: 'Green', value: '#059669', light: '#ecfdf5', lightText: '#047857', border: '#a7f3d0' },
  { name: 'Purple', value: '#7c3aed', light: '#f5f3ff', lightText: '#6d28d9', border: '#ddd6fe' },
  { name: 'Red', value: '#dc2626', light: '#fef2f2', lightText: '#b91c1c', border: '#fecaca' },
  { name: 'Orange', value: '#ea580c', light: '#fff7ed', lightText: '#c2410c', border: '#fed7aa' },
]

const TEMPLATES = [
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
  { id: 'minimal', label: 'Minimal' },
]

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 text-sm font-medium">
        <span style={{ fontSize: '16px' }}>&#10003;</span>
        {message}
      </div>
    </div>
  )
}

function App() {
  const [form, setForm] = useState(defaultForm)
  const [apiKey, setApiKey] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mobilePreview, setMobilePreview] = useState(false)
  const [template, setTemplate] = useState('modern')
  const [accent, setAccent] = useState(ACCENT_COLORS[0])
  const [toast, setToast] = useState('')
  const cvRef = useRef(null)

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const clearForm = () => {
    setForm(defaultForm)
    setError('')
  }

  const generateSummary = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your OpenRouter API key in Settings.')
      setShowSettings(true)
      return
    }
    setLoading(true)
    setError('')

    const userData = [
      form.fullName && `Name: ${form.fullName}`,
      form.jobTitle && `Job Title: ${form.jobTitle}`,
      form.workExperience && `Work Experience: ${form.workExperience}`,
      form.education && `Education: ${form.education}`,
      form.skills && `Skills: ${form.skills}`,
    ]
      .filter(Boolean)
      .join('. ')

    const prompt = `You are a professional CV writer. Based on this information, write a compelling 3-4 sentence professional summary in first person. Be specific, confident and ATS-optimized. Information: ${userData}`

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:5173',
        },
        body: JSON.stringify({
          model: 'moonshotai/kimi-k2',
          messages: [{ role: 'user', content: prompt }],
        }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error.message || 'API error occurred.')
      } else {
        const summary = data.choices?.[0]?.message?.content?.trim() || ''
        setForm((f) => ({ ...f, summary }))
      }
    } catch {
      setError('Network error. Please check your connection and API key.')
    } finally {
      setLoading(false)
    }
  }

  const downloadPDF = () => {
    const element = cvRef.current
    if (!element) return
    const opt = {
      margin: 0,
      filename: `${form.fullName ? form.fullName.replace(/\s+/g, '_') : 'cv'}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all'] },
    }
    window
      .html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setToast('CV downloaded successfully!')
      })
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-200'
  const labelClass =
    'block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5'
  const textareaClass = inputClass + ' resize-none'

  const hasContent =
    form.summary || form.workExperience || form.education || form.skills

  // ── Template-driven styles ──
  const isClassic = template === 'classic'
  const isMinimal = template === 'minimal'

  const cvFont = isClassic
    ? "'Georgia', 'Times New Roman', serif"
    : "'Inter', sans-serif"

  const headerBg = isMinimal ? '#ffffff' : '#1a1a2e'
  const headerText = isMinimal ? '#111827' : '#ffffff'
  const headerSub = isMinimal ? accent.value : isClassic ? '#c7d2fe' : accent.lightText === '#4338ca' ? '#a5b4fc' : accent.border
  const contactColor = isMinimal ? '#6b7280' : '#d1d5db'
  const contactIconColor = isMinimal ? accent.value : accent.border

  const sectionHeadingStyle = isClassic
    ? { color: accent.value, borderBottom: `1px solid ${accent.value}`, paddingBottom: '4px', marginBottom: '10px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: cvFont }
    : isMinimal
      ? { color: '#374151', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px', marginBottom: '12px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: cvFont }
      : { color: accent.value, borderBottom: `2px solid ${accent.value}`, paddingBottom: '4px', marginBottom: '10px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: cvFont }

  const bulletColor = accent.value

  const badgeBg = accent.light
  const badgeText = accent.lightText
  const badgeBorder = accent.border

  const bodyPadding = isMinimal ? '32px 40px' : '28px 36px'
  const sectionGap = isMinimal ? '24px' : '20px'

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#1a1a2e]">
      {/* ─── Mobile Toggle ─── */}
      <div className="lg:hidden flex items-center justify-between p-3 border-b border-white/10 bg-[#1a1a2e]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">CV</span>
          </div>
          <span className="text-white font-bold text-sm">AI CV Builder</span>
        </div>
        <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
          <button
            onClick={() => setMobilePreview(false)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${!mobilePreview ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
          >
            Edit
          </button>
          <button
            onClick={() => setMobilePreview(true)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mobilePreview ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* ─── Sidebar Form ─── */}
      <aside
        className={`no-print w-full lg:w-[420px] lg:min-w-[420px] bg-[#1a1a2e] border-r border-white/5 flex flex-col overflow-hidden ${mobilePreview ? 'hidden lg:flex' : 'flex'}`}
      >
        {/* Header */}
        <div className="hidden lg:flex p-5 border-b border-white/10 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <span className="text-white text-xs font-bold">CV</span>
            </div>
            <h1 className="text-lg font-bold text-white">AI CV Builder</h1>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-all duration-200 ${showSettings ? 'text-indigo-400 bg-indigo-500/10' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
            title="Settings"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Mobile settings toggle */}
        <div className="lg:hidden flex justify-end px-4 pt-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-all duration-200 ${showSettings ? 'text-indigo-400 bg-indigo-500/10' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
            title="Settings"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="px-5 py-4 border-b border-white/10 bg-indigo-950/30">
            <label className={labelClass}>OpenRouter API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-..."
              className={inputClass}
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Get a free key at{' '}
              <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                openrouter.ai/keys
              </a>
            </p>
          </div>
        )}

        {/* Form Fields */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input type="text" value={form.fullName} onChange={update('fullName')} placeholder="John Doe" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Job Title</label>
            <input type="text" value={form.jobTitle} onChange={update('jobTitle')} placeholder="Senior Software Engineer" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={form.email} onChange={update('email')} placeholder="john@email.com" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+1 234 567 890" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input type="text" value={form.location} onChange={update('location')} placeholder="San Francisco, CA" className={inputClass} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Work Experience</label>
              <span className={`text-xs tabular-nums ${form.workExperience.length > 500 ? 'text-amber-400' : 'text-gray-600'}`}>
                {form.workExperience.length} / 600
              </span>
            </div>
            <textarea rows={4} value={form.workExperience} onChange={update('workExperience')} maxLength={600} placeholder={"Software Engineer at Google (2020-2023)\nJunior Dev at Startup Inc (2018-2020)"} className={textareaClass} />
          </div>
          <div>
            <label className={labelClass}>Education</label>
            <textarea rows={3} value={form.education} onChange={update('education')} placeholder={"B.Sc. Computer Science, MIT (2018)\nHigh School Diploma (2014)"} className={textareaClass} />
          </div>
          <div>
            <label className={labelClass}>Skills</label>
            <textarea rows={2} value={form.skills} onChange={update('skills')} placeholder="React, Node.js, Python, TypeScript, AWS" className={textareaClass} />
          </div>

          {/* AI Summary */}
          <div className="pt-2">
            <label className={labelClass}>Professional Summary</label>
            <textarea rows={4} value={form.summary} onChange={update('summary')} placeholder="Click 'Generate AI Summary' or write your own..." className={textareaClass} />
            <button
              onClick={generateSummary}
              disabled={loading}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30"
            >
              {loading ? (
                <><Spinner /> Generating...</>
              ) : (
                <><span style={{ fontSize: '14px' }}>&#9889;</span> Generate AI Summary</>
              )}
            </button>
            {error && (
              <p className="mt-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={downloadPDF}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-all duration-200 shadow-lg shadow-emerald-600/20"
          >
            <span style={{ fontSize: '14px' }}>&#128196;</span>
            Download as PDF
          </button>
          <button
            onClick={clearForm}
            className="w-full flex items-center justify-center gap-2 bg-transparent border border-white/10 hover:bg-white/5 text-gray-400 hover:text-gray-200 font-medium py-2.5 px-4 rounded-lg text-sm transition-all duration-200"
          >
            <span style={{ fontSize: '14px' }}>&#128465;</span>
            Clear Form
          </button>
        </div>
      </aside>

      {/* ─── CV Preview Panel ─── */}
      <main className={`flex-1 bg-gray-100 overflow-y-auto flex flex-col ${mobilePreview ? 'flex' : 'hidden lg:flex'}`}>
        {/* ── Toolbar: Template + Color ── */}
        <div className="no-print shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex flex-wrap items-center gap-4">
          {/* Template selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Template</span>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${template === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          {/* Color accent picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Accent</span>
            <div className="flex gap-1.5">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setAccent(c)}
                  title={c.name}
                  className="w-6 h-6 rounded-full transition-all duration-150 flex items-center justify-center"
                  style={{
                    backgroundColor: c.value,
                    boxShadow: accent.name === c.name ? `0 0 0 2px white, 0 0 0 4px ${c.value}` : 'none',
                  }}
                >
                  {accent.name === c.name && <span className="text-white text-[10px]">&#10003;</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CV Document ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center">
          <div
            ref={cvRef}
            className="bg-white w-full max-w-[210mm] shadow-2xl"
            style={{
              fontFamily: cvFont,
              maxHeight: 'fit-content',
            }}
          >
            {/* CV Header */}
            <div
              style={{
                backgroundColor: headerBg,
                color: headerText,
                padding: isMinimal ? '28px 36px' : '28px 36px',
                borderBottom: isMinimal ? `3px solid ${accent.value}` : 'none',
              }}
            >
              <h1
                style={{
                  fontSize: isClassic ? '26px' : '28px',
                  fontWeight: '700',
                  letterSpacing: isClassic ? '0.5px' : '-0.5px',
                  lineHeight: '1.2',
                  fontFamily: cvFont,
                  margin: 0,
                }}
              >
                {form.fullName || 'Your Full Name'}
              </h1>
              <p
                style={{
                  color: isMinimal ? accent.value : headerSub,
                  fontSize: isClassic ? '15px' : '16px',
                  fontWeight: '600',
                  marginTop: '4px',
                  fontFamily: cvFont,
                }}
              >
                {form.jobTitle || 'Your Job Title'}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginTop: '14px',
                  fontSize: '13px',
                  color: contactColor,
                }}
              >
                {(form.email || !form.fullName) && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: contactIconColor, fontSize: '13px' }}>&#9993;</span>
                    {form.email || 'john@email.com'}
                  </span>
                )}
                {(form.phone || !form.fullName) && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: contactIconColor, fontSize: '13px' }}>&#9742;</span>
                    {form.phone || '+1 234 567 890'}
                  </span>
                )}
                {(form.location || !form.fullName) && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: contactIconColor, fontSize: '13px' }}>&#9679;</span>
                    {form.location || 'City, Country'}
                  </span>
                )}
              </div>
            </div>

            {/* CV Body */}
            <div style={{ padding: bodyPadding, display: 'flex', flexDirection: 'column', gap: sectionGap }}>
              {/* Summary */}
              {form.summary && (
                <section>
                  <h2 style={sectionHeadingStyle}>Professional Summary</h2>
                  <p style={{ color: '#4b5563', fontSize: '12.5px', lineHeight: '1.7', fontFamily: cvFont, margin: 0 }}>
                    {form.summary}
                  </p>
                </section>
              )}

              {/* Work Experience */}
              {form.workExperience && (
                <section>
                  <h2 style={sectionHeadingStyle}>Work Experience</h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {form.workExperience.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#374151', fontSize: '12.5px', lineHeight: '1.6', fontFamily: cvFont }}>
                        <span style={{ marginTop: '7px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: bulletColor, flexShrink: 0 }}></span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Education */}
              {form.education && (
                <section>
                  <h2 style={sectionHeadingStyle}>Education</h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {form.education.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#374151', fontSize: '12.5px', lineHeight: '1.6', fontFamily: cvFont }}>
                        <span style={{ marginTop: '7px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: bulletColor, flexShrink: 0 }}></span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Skills */}
              {form.skills && (
                <section>
                  <h2 style={sectionHeadingStyle}>Skills</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {form.skills
                      .split(/[,\n]/)
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((skill, i) => (
                        <span
                          key={i}
                          style={{
                            backgroundColor: badgeBg,
                            color: badgeText,
                            fontSize: '11px',
                            fontWeight: '500',
                            padding: '3px 10px',
                            borderRadius: '999px',
                            border: `1px solid ${badgeBorder}`,
                            fontFamily: cvFont,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </section>
              )}

              {/* Empty state */}
              {!hasContent && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
                  <p style={{ fontSize: '16px', fontWeight: '500', margin: '0 0 4px' }}>Start filling in the form</p>
                  <p style={{ fontSize: '13px', margin: 0 }}>Your CV will appear here in real time</p>
                </div>
              )}

              {/* Powered by badge */}
              <div style={{ marginTop: hasContent ? '16px' : '0', paddingTop: hasContent ? '12px' : '0', borderTop: hasContent ? '1px solid #f3f4f6' : 'none', textAlign: 'center' }}>
                <span style={{ fontSize: '9px', color: '#d1d5db', letterSpacing: '0.05em' }}>
                  Powered by Kimi K2 + OpenRouter
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  )
}

export default App
