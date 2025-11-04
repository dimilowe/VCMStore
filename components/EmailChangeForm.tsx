'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EmailChangeFormProps {
  currentEmail: string;
  onEmailChanged?: (newEmail: string) => void;
}

export function EmailChangeForm({ currentEmail, onEmailChanged }: EmailChangeFormProps) {
  const [displayEmail, setDisplayEmail] = useState(currentEmail);
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (newEmail.toLowerCase().trim() === displayEmail.toLowerCase().trim()) {
      setError('New email is the same as current email');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newEmail, password }),
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        setSuccess('Email updated successfully!');
        setDisplayEmail(data.email);
        setNewEmail('');
        setPassword('');
        if (onEmailChanged) {
          onEmailChanged(data.email);
        }
      } else {
        setError(data.error || 'Failed to update email');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Current Email</label>
        <Input
          type="email"
          value={displayEmail}
          disabled
          className="bg-muted"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">New Email Address</label>
        <Input
          type="email"
          placeholder="Enter new email address"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Confirm Password</label>
        <Input
          type="password"
          placeholder="Enter your password to confirm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          minLength={8}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-600">{success}</p>
      )}
      <Button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600"
        disabled={loading}
      >
        {loading ? 'Updating Email...' : 'Update Email Address'}
      </Button>
    </form>
  );
}
