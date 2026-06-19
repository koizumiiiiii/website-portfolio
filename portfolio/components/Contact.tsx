"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const CONTACT_INFO = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "mendozajames992@gmail.com",
    href:  "https://mail.google.com/mail/?view=cm&fs=1&to=mendozajames992@gmail.com",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/james-mendoza",
    href:  "https://www.linkedin.com/in/james-mendoza-480903414",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/koizumiiiiii",
    href:  "https://github.com/koizumiiiiii",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    label: "Facebook",
    value: "facebook.com/jamesoliver.mendoza.7",
    href:  "https://www.facebook.com/jamesoliver.mendoza.7/",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    label: "Instagram",
    value: "instagram.com/koizumiiii_",
    href:  "https://www.instagram.com/koizumiiii_",
  },
];

export default function Contact() {
  const [form,    setForm]    = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors,  setErrors]  = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim())    errs.name    = "Name is required.";
    if (!form.email.trim())   errs.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.subject.trim()) errs.subject = "Subject is required.";
    if (!form.message.trim()) errs.message = "Message cannot be empty.";
    else if (form.message.trim().length < 10) errs.message = "Message too short (min 10 chars).";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/mpqegend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
      });
      if (!res.ok) throw new Error("Failed to send. Try again later.");
      setSending(false);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSending(false);
      alert("Something went wrong. Please email me directly at mendozajames992@gmail.com");
    }
  };

  const inputClass = (err?: string) =>
    `w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 border transition-all duration-200 outline-none focus:ring-2 focus:ring-brand-500/30 dark:focus:ring-brand-400/30 ${
      err
        ? "border-red-400 dark:border-red-500"
        : "border-slate-200 dark:border-slate-700 focus:border-brand-400 dark:focus:border-brand-500"
    }`;

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative py-20 sm:py-28"
    >
      {/* BG tint */}
      <div aria-hidden="true" className="absolute inset-0 bg-surface/80 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-xl mx-auto"
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400" />
            Get In Touch
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg">
            Have an opportunity or just want to connect? I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: Contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I&apos;m currently open to internship opportunities, collaborative projects,
              and networking with fellow developers. Don&apos;t hesitate to reach out.
            </p>

            <ul className="space-y-3" role="list">
              {CONTACT_INFO.map(({ icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-slate-200/80 dark:border-slate-800/60 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-brand-500/10 text-brand-500 group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-0.5">{label}</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {value}
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-brand-400 dark:group-hover:text-brand-500 ml-auto flex-shrink-0 translate-x-0 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div
              className="p-6 sm:p-8 rounded-2xl bg-card border border-slate-200/80 dark:border-slate-800/60 shadow-card dark:shadow-card-dark space-y-5"
              role="form"
              aria-label="Contact form"
            >
              {/* Success message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/50 text-green-700 dark:text-green-400 text-sm font-medium"
                    role="alert"
                    aria-live="polite"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Thanks for reaching out! I&apos;ll get back to you as soon as possible.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="fname" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    value={form.name}
                    onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: undefined })); }}
                    placeholder="John Doe"
                    autoComplete="name"
                    className={inputClass(errors.name)}
                  />
                  {errors.name && <p className="text-xs text-red-500 dark:text-red-400">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="femail" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="femail"
                    value={form.email}
                    onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: undefined })); }}
                    placeholder="john@example.com"
                    autoComplete="email"
                    className={inputClass(errors.email)}
                  />
                  {errors.email && <p className="text-xs text-red-500 dark:text-red-400">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="fsubject" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Subject
                </label>
                <input
                  type="text"
                  id="fsubject"
                  value={form.subject}
                  onChange={(e) => { setForm((f) => ({ ...f, subject: e.target.value })); setErrors((er) => ({ ...er, subject: undefined })); }}
                  placeholder="Internship Opportunity"
                  className={inputClass(errors.subject)}
                />
                {errors.subject && <p className="text-xs text-red-500 dark:text-red-400">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="fmessage" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  id="fmessage"
                  rows={5}
                  value={form.message}
                  onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setErrors((er) => ({ ...er, message: undefined })); }}
                  placeholder="Hi James Oliver, I'd love to..."
                  className={`${inputClass(errors.message)} resize-none`}
                />
                {errors.message && <p className="text-xs text-red-500 dark:text-red-400">{errors.message}</p>}
                <p className="text-xs text-slate-400 dark:text-slate-600 text-right">{form.message.length} chars</p>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={sending || success}
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm hover:shadow-glow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                {sending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
