'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Bug, Lightbulb, Sparkles, Send } from 'lucide-react';

const feedbackTypes = [
  { value: 'bug', label: 'Bug Report', icon: Bug, color: 'border-red-200 hover:border-red-400 hover:bg-red-50' },
  { value: 'feature', label: 'Feature Request', icon: Sparkles, color: 'border-purple-200 hover:border-purple-400 hover:bg-purple-50' },
  { value: 'improvement', label: 'Improvement Suggestion', icon: Lightbulb, color: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50' },
  { value: 'general', label: 'General Feedback', icon: MessageSquare, color: 'border-gray-200 hover:border-gray-400 hover:bg-gray-50' },
];

export function FeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedback_type: selectedType,
          subject,
          message,
          email: email || null,
          priority,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setOpen(false);
          setSuccess(false);
          setSelectedType('');
          setSubject('');
          setMessage('');
          setEmail('');
          setPriority('medium');
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-orange-500" />
            Feedback Form
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            We&apos;d love to hear your thoughts, suggestions, or concerns.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
            <p className="text-gray-600">Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-3 block">
                What type of feedback is this? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {feedbackTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSelectedType(type.value)}
                      className={`p-4 border-2 rounded-xl transition-all text-left ${
                        selectedType === type.value
                          ? 'border-orange-500 bg-orange-50'
                          : type.color
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${selectedType === type.value ? 'text-orange-600' : 'text-gray-600'}`} />
                      <span className="font-medium text-sm">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="text-sm font-medium mb-2 block">
                Subject <span className="text-red-500">*</span>
              </label>
              <Input
                id="subject"
                placeholder="Brief description of your feedback"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium mb-2 block">
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="message"
                placeholder="Please provide detailed information about your feedback..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email (for follow-up)
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="priority" className="text-sm font-medium mb-2 block">
                Priority Level
              </label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - General feedback</SelectItem>
                  <SelectItem value="medium">Medium - Standard feedback</SelectItem>
                  <SelectItem value="high">High - Important issue</SelectItem>
                  <SelectItem value="urgent">Urgent - Critical bug</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={!selectedType || !subject || !message || loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12"
            >
              {loading ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
