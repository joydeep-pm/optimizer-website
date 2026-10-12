import { useId, useState } from "react";

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function submitToWaitlist({ name, email }) {
  if (!ENDPOINT) {
    throw new Error("not-configured");
  }
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name, email, source: window.location.hostname }),
  });
  if (!response.ok) {
    throw new Error("request-failed");
  }
}

export default function WaitlistForm({
  variant = "hero",
  buttonLabel = "Join the Waitlist",
  tone = "dark",
  compact = false,
  onSuccess,
}) {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [joinedName, setJoinedName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSuccess(false);

    if (!isValidEmail(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitToWaitlist({ name: name.trim(), email: email.trim() });
      setJoinedName(name.trim());
      setIsSuccess(true);
      setEmail("");
      setName("");
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(
        err.message === "not-configured"
          ? "Signups are not connected yet. Please check back soon."
          : "We could not save your email. Please try again in a moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const isHero = variant === "hero";
  const tones = {
    light: {
      form: "border-ink/15 bg-white",
      input:
        "border-ink/20 bg-white text-ink placeholder:text-ink/55 focus:border-ink focus-visible:ring-2 focus-visible:ring-violet",
      button: "bg-ink text-white focus-visible:outline-ink",
      note: "text-ink/70",
      error: "text-red-700",
      success: "text-emerald-700",
    },
    brand: {
      form: "border-white/30 bg-black/25",
      input:
        "border-white/30 bg-white/10 text-white placeholder:text-white/70 focus:border-white focus-visible:ring-2 focus-visible:ring-white/70",
      button: "bg-white text-ink focus-visible:outline-white",
      note: "text-white/95",
      error: "text-white",
      success: "text-white",
    },
    dark: {
      form: "border-white/20 bg-black/55",
      input:
        "border-white/25 bg-white/[0.06] text-white placeholder:text-white/60 focus:border-white focus-visible:ring-2 focus-visible:ring-white/70",
      button: "bg-white text-black focus-visible:outline-white",
      note: "text-white/70",
      error: "text-red-300",
      success: "text-emerald-300",
    },
  };
  const t = tones[tone] ?? tones.dark;
  const inputClass = `h-12 min-w-0 rounded-xl border px-3 text-base focus:outline-none ${t.input}`;

  return (
    <div className={isHero ? "w-full max-w-3xl" : "w-full max-w-xl"}>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={
          isHero
            ? `grid gap-3 rounded-2xl border p-3 sm:grid-cols-2 ${t.form}`
            : `grid gap-3 rounded-2xl border p-4 md:grid-cols-2 ${t.form}`
        }
      >
        <label htmlFor={`${uid}-name`} className="sr-only">
          Name (optional)
        </label>
        <input
          id={`${uid}-name`}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name (optional)"
          className={`${inputClass} ${compact ? "hidden sm:block" : ""}`}
        />
        <label htmlFor={`${uid}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${uid}-email`}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${uid}-msg` : undefined}
          className={inputClass}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`h-12 whitespace-nowrap rounded-xl px-5 sm:col-span-2 text-base font-semibold transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${t.button}`}
        >
          {isSubmitting ? "Submitting..." : buttonLabel}
        </button>
      </form>

      <p className={`mt-3 text-sm ${t.note}`}>
        Your email is used only to send launch updates and onboarding instructions.{" "}
        <a href="/privacy/" className="underline underline-offset-2 hover:text-white">
          Privacy notice
        </a>
      </p>

      <div id={`${uid}-msg`} role="status" aria-live="polite">
        {error ? <p className={`mt-2 text-sm font-medium ${t.error}`}>{error}</p> : null}
        {isSuccess ? (
          <p className={`mt-2 text-sm font-medium ${t.success}`}>
            Thanks{joinedName ? ` ${joinedName}` : ""}, you are on the waitlist.
          </p>
        ) : null}
      </div>
    </div>
  );
}
