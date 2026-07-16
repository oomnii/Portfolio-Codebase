"use client";

import { useEffect, useState } from "react";

const roles = [
  "ECE Student @ IIIT Surat",
  "AI Data Training Specialist @ XelronAI",
  "Competitive Programmer",
] as const;

export function RoleTyper() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const isComplete = !deleting && text === current;
    const delayMs = deleting ? 35 : isComplete ? 2200 : 70;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setDeleting(true);
        }
        return;
      }

      if (text.length > 0) {
        setText(current.slice(0, text.length - 1));
        return;
      }

      setDeleting(false);
      setRoleIndex((index) => (index + 1) % roles.length);
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <span className="font-mono text-lg text-accent md:text-xl">
      {text}
      <span className="ml-0.5 animate-pulse text-accent">|</span>
    </span>
  );
}
