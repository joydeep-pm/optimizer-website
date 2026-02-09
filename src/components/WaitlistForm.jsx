import { useState } from "react";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function WaitlistForm({
  variant = "hero",
  buttonLabel = "Join the Waitlist",
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

    setIsSubmitting(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 900);
    });
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail("");
    setName("");

    if (onSuccess) {
      onSuccess();
    }
  }

  const isHero = variant === "hero";

  return (
    <div className={isHero ? "w-full max-w-3xl" : "w-full max-w-xl"}>
      <form
        onSubmit={handleSubmit}
        className={
          isHero
            ? "grid gap-3 rounded-2xl border border-white/20 bg-black/55 p-3 backdrop-blur-xl md:grid-cols-[1fr_1.2fr_auto]"
            : "grid gap-3 rounded-2xl border border-white/20 bg-black/55 p-4 backdrop-blur-xl md:grid-cols-2"
        }
      >
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name (optional)"
          className="h-11 rounded-xl border border-white/20 bg-white/[0.06] px-3 text-sm text-white placeholder:text-white/55 focus:border-white/35 focus:outline-none"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className="h-11 rounded-xl border border-white/20 bg-white/[0.06] px-3 text-sm text-white placeholder:text-white/55 focus:border-white/35 focus:outline-none"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-xl bg-white px-4 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : buttonLabel}
        </button>
      </form>

      {error ? (
        <p className="mt-2 text-sm text-red-300">{error}</p>
      ) : null}

      {isSuccess ? (
        <p className="mt-2 text-sm text-emerald-300">
          Thanks{` ${name || "there"}`} - you are on the waitlist.
        </p>
      ) : null}
    </div>
  );
}
