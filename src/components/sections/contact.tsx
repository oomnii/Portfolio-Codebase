"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { CodeforcesIcon } from "@/components/icons/codeforces-icon";
import { GitHubIcon } from "@/components/icons/github-icon";
import { LeetCodeIcon } from "@/components/icons/leetcode-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { Section } from "@/components/ui/section";
import { contact, socialLinks } from "@/config/site";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnjkldpr";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const socialItems = [
  { label: "GitHub", href: socialLinks.github, icon: GitHubIcon },
  { label: "LinkedIn", href: socialLinks.linkedin, icon: LinkedInIcon },
  { label: "LeetCode", href: socialLinks.leetcode, icon: LeetCodeIcon },
  { label: "Codeforces", href: socialLinks.codeforces, icon: CodeforcesIcon },
] as const;

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(form.email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(null);
    setStatus("loading");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _replyto: form.email,
          _subject: `Portfolio contact from ${form.name || "someone"}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-md border border-border bg-surface px-4 py-2.5 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-60";

  return (
    <Section id="contact" className="pointer-events-auto bg-background-muted">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <h2 className="heading-section mb-3">Contact</h2>
        <p className="text-body max-w-xl">
          I am open to AI/ML, backend, and full-stack internship opportunities.
          If you are building practical AI systems, developer tools, or reliable
          web platforms, I would be glad to connect.
        </p>
      </motion.div>

      <div className="grid gap-10 md:grid-cols-2">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
          noValidate
        >
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              disabled={status === "loading"}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Your email"
              value={form.email}
              disabled={status === "loading"}
              aria-invalid={emailError ? "true" : "false"}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (emailError) setEmailError(null);
              }}
              className={`${inputClass} ${
                emailError ? "border-danger focus:border-danger focus:ring-danger" : ""
              }`}
            />
            {emailError && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {emailError}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              placeholder="Tell me about the role, project, or idea."
              value={form.message}
              disabled={status === "loading"}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full gap-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                Send Message
              </>
            )}
          </button>

          <AnimatePresence>
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-success"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Message sent - thank you. I will get back to you soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-danger"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                The message could not be sent. Please try again or contact me by
                email.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 break-all font-mono text-sm text-muted-foreground transition-colors hover:text-accent-hover"
            >
              <Mail className="h-4 w-4 shrink-0" />
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-3 font-mono text-sm text-muted-foreground transition-colors hover:text-accent-hover"
            >
              <Phone className="h-4 w-4 shrink-0" />
              {contact.phone}
            </a>
          </div>

          <div className="flex items-center gap-3">
            {socialItems.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-accent-hover hover:text-accent-hover"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
