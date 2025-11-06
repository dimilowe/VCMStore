'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'blog' }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(data.error || 'Failed to subscribe');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading || success}
        className="text-base"
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-600 font-medium">
          ✓ Thanks for subscribing! Check your email.
        </p>
      )}
      <Button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold tracking-wide"
        disabled={loading || success}
      >
        {loading ? 'SUBSCRIBING...' : success ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
      </Button>
    </form>
  );
}
