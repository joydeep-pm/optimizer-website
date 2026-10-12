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
  const inputClass =
    "h-12 rounded-xl border border-white/25 bg-white/[0.06] px-3 text-base text-white placeholder:text-white/60 focus:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

  return (
    <div className={isHero ? "w-full max-w-3xl" : "w-full max-w-xl"}>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={
          isHero
            ? "grid gap-3 rounded-2xl border border-white/20 bg-black/55 p-3 backdrop-blur-xl md:grid-cols-[1fr_1.2fr_auto]"
            : "grid gap-3 rounded-2xl border border-white/20 bg-black/55 p-4 backdrop-blur-xl md:grid-cols-2"
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
          className={inputClass}
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
          className="h-12 rounded-xl bg-white px-5 text-base font-semibold text-black transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : buttonLabel}
        </button>
      </form>

      <p className={`mt-3 text-sm ${tone === "brand" ? "text-white/95" : "text-white/70"}`}>
        Your email is used only to send launch updates and onboarding instructions.{" "}
        <a href="/privacy/" className="underline underline-offset-2 hover:text-white">
          Privacy notice
        </a>
      </p>

      <div id={`${uid}-msg`} role="status" aria-live="polite">
        {error ? <p className={`mt-2 text-sm font-medium ${tone === "brand" ? "text-white" : "text-red-300"}`}>{error}</p> : null}
        {isSuccess ? (
          <p className={`mt-2 text-sm font-medium ${tone === "brand" ? "text-white" : "text-emerald-300"}`}>
            Thanks{joinedName ? ` ${joinedName}` : ""}, you are on the waitlist.
          </p>
        ) : null}
      </div>
    </div>
  );
}
