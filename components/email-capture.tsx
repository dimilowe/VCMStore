"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EmailCaptureProps {
  source: string;
  title?: string;
  description?: string;
  dark?: boolean;
}

export function EmailCapture({ source, title, description, dark }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className={dark ? "bg-transparent border-stone-700" : ""}>
        <CardContent className="pt-6">
          <p className={`text-center font-medium ${dark ? "text-green-400" : "text-green-600"}`}>
            Thanks for subscribing! Check your email soon.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={dark ? "bg-transparent border-stone-700 shadow-none" : "border-stone-200 shadow-sm"}>
      <CardHeader className="text-center">
        <CardTitle className={`text-2xl tracking-wide ${dark ? "text-white" : "text-stone-900"}`}>
          {title || "Stay Updated"}
        </CardTitle>
        <CardDescription className={dark ? "text-stone-400" : "text-stone-600"}>
          {description || "Get the latest products, tips, and exclusive deals."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className={dark ? "bg-stone-800 border-stone-700 text-white placeholder:text-stone-500" : "border-neutral-300"}
          />
          <Button type="submit" disabled={loading} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            {loading ? "..." : "Subscribe"}
          </Button>
        </form>
        {error && <p className={`text-sm mt-2 ${dark ? "text-red-400" : "text-destructive"}`}>{error}</p>}
      </CardContent>
    </Card>
  );
}
