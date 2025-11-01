"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EmailCaptureProps {
  source: string;
  title?: string;
  description?: string;
}

export function EmailCapture({ source, title, description }: EmailCaptureProps) {
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
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-green-600 font-medium">
            Thanks for subscribing! Check your email soon.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-neutral-200 shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl tracking-wide text-neutral-900">{title || "Stay Updated"}</CardTitle>
        <CardDescription className="text-neutral-600">
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
            className="border-neutral-300"
          />
          <Button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white">
            {loading ? "..." : "Subscribe"}
          </Button>
        </form>
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
}
