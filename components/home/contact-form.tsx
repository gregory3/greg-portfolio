"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const disabled = status === "submitting";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setError("Add your name so I know who I'm talking to.");
      return;
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError("Enter a valid email so I can reply.");
      return;
    }

    if (trimmedMessage.length < 5) {
      setError("Add a short message.");
      return;
    }

    try {
      setStatus("submitting");
      setError("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: normalizedEmail,
          message: trimmedMessage,
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setError(result.error ?? "Something went wrong. Try again in a moment.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setError("Network issue. Please try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-6 max-w-lg border border-emerald-800 bg-emerald-500/[0.06] p-5">
        <div className="text-[11px] uppercase tracking-[0.16em] text-emerald-400">
          Message sent
        </div>
        <p className="mt-2 text-[13px] leading-7 text-zinc-300">
          Thanks for reaching out — I&apos;ll get back to you at the email you
          provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 border border-zinc-700 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid max-w-lg gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
            Name
          </span>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (error) setError("");
            }}
            placeholder="Your name"
            disabled={disabled}
            className="border border-zinc-800 bg-[#060606] px-4 py-3 text-[13px] text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError("");
            }}
            placeholder="you@example.com"
            disabled={disabled}
            className="border border-zinc-800 bg-[#060606] px-4 py-3 text-[13px] text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
          />
        </label>
      </div>

      <label className="grid gap-1.5">
        <span className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
          Message
        </span>
        <textarea
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            if (error) setError("");
          }}
          placeholder="What are you building, or what role do you have in mind?"
          rows={4}
          disabled={disabled}
          className="resize-y border border-zinc-800 bg-[#060606] px-4 py-3 text-[13px] leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
        />
      </label>

      {error ? (
        <p className="text-[12px] leading-6 text-rose-400">{error}</p>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center gap-2 border border-zinc-600 px-5 py-2.5 text-[13px] uppercase tracking-[0.14em] text-zinc-200 transition hover:border-zinc-400 hover:text-white disabled:opacity-60"
        >
          {disabled ? "Sending..." : "Send message"}
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
}
