import { useState } from "react";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function WaitlistForm({
  variant = "hero",
  buttonLabel = "Join the waitlist",
  onSuccess,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSuccess(false);

    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT;
    if (!endpoint) {
      setError("Waitlist submissions are not connected yet.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setIsSuccess(true);
      setEmail("");
      setName("");
      onSuccess?.();
    } catch {
      setError("We couldn't add you right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isHero = variant === "hero";
  const messageId = `waitlist-message-${variant}`;

  return (
    <div className={isHero ? "w-full max-w-3xl" : "w-full max-w-xl"}>
      <form
        onSubmit={handleSubmit}
        aria-describedby={messageId}
        className={
          isHero
            ? "grid gap-3 rounded-2xl border border-white/16 bg-black/55 p-3 backdrop-blur-xl md:grid-cols-[1fr_1.2fr_auto]"
            : "grid gap-3 rounded-2xl border border-white/16 bg-black/45 p-4 backdrop-blur-xl md:grid-cols-2"
        }
      >
        <label className="sr-only" htmlFor={`waitlist-name-${variant}`}>Name (optional)</label>
        <input
          id={`waitlist-name-${variant}`}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name (optional)"
          className="h-11 rounded-xl border border-white/16 bg-white/[0.055] px-3 text-sm text-white placeholder:text-white/45 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
        />

        <label className="sr-only" htmlFor={`waitlist-email-${variant}`}>Email address</label>
        <input
          id={`waitlist-email-${variant}`}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className="h-11 rounded-xl border border-white/16 bg-white/[0.055] px-3 text-sm text-white placeholder:text-white/45 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-xl bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Joining..." : buttonLabel}
        </button>
      </form>

      <div id={messageId} aria-live="polite">
        {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
        {isSuccess ? <p className="mt-2 text-sm text-emerald-300">You're on the waitlist.</p> : null}
      </div>
    </div>
  );
}
