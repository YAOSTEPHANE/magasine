"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/presse-ivoire/BrandLogo";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Registration error");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, callbackUrl: "/" });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <BrandLogo variant="auth" />
          <p className="text-muted mt-4">Create your reader account</p>
        </div>

        <div className="bg-surface border border-border rounded-sm p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-medium tracking-wider uppercase text-muted mb-2">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-muted-bg border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium tracking-wider uppercase text-muted mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-muted-bg border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium tracking-wider uppercase text-muted mb-2">
                Password (8 characters min.)
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-muted-bg border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
            </div>
            {error && <p className="text-sm text-accent">{error}</p>}
            <Button type="submit" variant="gold" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create my account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted mt-8">
            Already registered?{" "}
            <Link href="/connexion" className="text-accent hover:text-accent-hover font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
