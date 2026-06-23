"use client";

import { useState } from "react";
import { Heart, CheckCircle2 } from "lucide-react";

const PRESETS = [10, 25, 50, 100] as const;

const IMPACT = [
  { amount: 10, text: "Funds one field dispatch from a regional correspondent" },
  { amount: 25, text: "Supports a week of fact-checking for an investigation" },
  { amount: 50, text: "Helps produce a video report from the Global South" },
  { amount: 100, text: "Sponsors an in-depth regional dossier" },
];

export function DonateForm() {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const resolvedAmount = custom.trim() ? Number.parseFloat(custom) : amount;
  const impactLine = IMPACT.filter((i) => i.amount <= resolvedAmount).at(-1)?.text;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const finalAmount = custom.trim() ? Number.parseFloat(custom) : amount;
    if (!Number.isFinite(finalAmount) || finalAmount < 1) {
      setErrorMsg("Please enter a valid amount (minimum €1).");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          amount: finalAmount,
          frequency,
          message: message.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="donate-success">
        <CheckCircle2 className="donate-success-icon" aria-hidden />
        <h2>Thank you for your generosity</h2>
        <p>
          Your pledge has been recorded. In production, a secure payment step (Stripe or similar)
          would complete the transaction.
        </p>
        <button type="button" className="donate-submit" onClick={() => setStatus("idle")}>
          Make another donation
        </button>
      </div>
    );
  }

  return (
    <form className="donate-form" onSubmit={handleSubmit}>
      <div className="donate-frequency" role="group" aria-label="Donation frequency">
        <button
          type="button"
          className={frequency === "one-time" ? "is-active" : undefined}
          onClick={() => setFrequency("one-time")}
        >
          One-time
        </button>
        <button
          type="button"
          className={frequency === "monthly" ? "is-active" : undefined}
          onClick={() => setFrequency("monthly")}
        >
          Monthly
        </button>
      </div>

      <fieldset className="donate-amounts">
        <legend className="sr-only">Choose an amount</legend>
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`donate-amount-btn${amount === preset && !custom ? " is-active" : ""}`}
            onClick={() => {
              setAmount(preset);
              setCustom("");
            }}
          >
            €{preset}
          </button>
        ))}
      </fieldset>

      <label className="donate-field">
        <span>Other amount (€)</span>
        <input
          type="number"
          min={1}
          step={1}
          placeholder="Custom amount"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
      </label>

      {impactLine && (
        <p className="donate-impact">
          <Heart size={14} aria-hidden />
          {impactLine}
        </p>
      )}

      <div className="donate-fields-row">
        <label className="donate-field">
          <span>Full name</span>
          <input
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="donate-field">
          <span>Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <label className="donate-field">
        <span>Message (optional)</span>
        <textarea
          rows={3}
          maxLength={500}
          placeholder="Dedicate your gift or leave a note for our newsroom…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      {errorMsg && <p className="donate-error" role="alert">{errorMsg}</p>}

      <button type="submit" className="donate-submit" disabled={status === "loading"}>
        {status === "loading"
          ? "Processing…"
          : `Donate €${Number.isFinite(resolvedAmount) ? resolvedAmount : amount}${frequency === "monthly" ? " / month" : ""}`}
      </button>

      <p className="donate-disclaimer">
        Demo mode: no real payment is processed. Your pledge is stored securely for demonstration purposes.
      </p>
    </form>
  );
}
