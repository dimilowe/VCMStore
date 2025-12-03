"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  ThumbsUp, 
  ThumbsDown, 
  Plus, 
  Calendar,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Loader2,
  Users,
  BarChart3,
  X
} from "lucide-react";
import ExploreMoreTools from "@/components/ExploreMoreTools";

interface Prediction {
  id: number;
  question: string;
  description: string | null;
  category: string | null;
  createdAt: string;
  closeDate: string | null;
  status: "open" | "resolved";
  outcome: "yes" | "no" | null;
  yesCount: number;
  noCount: number;
  totalVotes: number;
  yesPercent: number;
  noPercent: number;
}

interface VoteStatus {
  [predictionId: number]: {
    hasVoted: boolean;
    choice: "yes" | "no" | null;
    isVoting: boolean;
  };
}

export default function PredictionCenterClient() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    category: "",
    closeDate: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [voteStatus, setVoteStatus] = useState<VoteStatus>({});
  const [expandedPrediction, setExpandedPrediction] = useState<number | null>(null);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const res = await fetch("/api/predictions");
      const data = await res.json();
      setPredictions(data.predictions || []);
      
      const statusPromises = (data.predictions || []).map(async (p: Prediction) => {
        try {
          const voteRes = await fetch(`/api/predictions/${p.id}/vote`);
          const voteData = await voteRes.json();
          return { id: p.id, ...voteData };
        } catch {
          return { id: p.id, hasVoted: false, choice: null };
        }
      });
      
      const statuses = await Promise.all(statusPromises);
      const statusMap: VoteStatus = {};
      statuses.forEach(s => {
        statusMap[s.id] = { hasVoted: s.hasVoted, choice: s.choice, isVoting: false };
      });
      setVoteStatus(statusMap);
    } catch (err) {
      console.error("Failed to fetch predictions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit prediction");
      }

      setFormData({ question: "", description: "", category: "", closeDate: "" });
      setShowForm(false);
      fetchPredictions();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (predictionId: number, choice: "yes" | "no") => {
    setVoteStatus(prev => ({
      ...prev,
      [predictionId]: { ...prev[predictionId], isVoting: true }
    }));

    try {
      const res = await fetch(`/api/predictions/${predictionId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice })
      });

      const data = await res.json();

      if (res.status === 409) {
        setVoteStatus(prev => ({
          ...prev,
          [predictionId]: { hasVoted: true, choice, isVoting: false }
        }));
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to vote");
      }

      setPredictions(prev => prev.map(p => 
        p.id === predictionId 
          ? { ...p, ...data }
          : p
      ));

      setVoteStatus(prev => ({
        ...prev,
        [predictionId]: { hasVoted: true, choice, isVoting: false }
      }));
    } catch (err) {
      console.error("Vote error:", err);
      setVoteStatus(prev => ({
        ...prev,
        [predictionId]: { ...prev[predictionId], isVoting: false }
      }));
    }
  };

  const categories = ["Technology", "Politics", "Finance", "Sports", "Entertainment", "Science", "Other"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Free Prediction Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Prediction Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit predictions about future events, vote YES or NO, and see what the crowd thinks. No signup required.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Submit a New Prediction</span>
            </div>
            {showForm ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="p-5 pt-0 space-y-4 border-t border-gray-100">
              {error && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prediction Question <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Will [event] happen by [date]?"
                  maxLength={200}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-1">{formData.question.length}/200 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add context or criteria for resolution..."
                  maxLength={1000}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Close Date
                  </label>
                  <input
                    type="date"
                    value={formData.closeDate}
                    onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !formData.question.trim()}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Submit Prediction
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold text-gray-900">Active Predictions</h2>
          <span className="text-sm text-gray-500">({predictions.filter(p => p.status === 'open').length} open)</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : predictions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No predictions yet. Be the first to submit one!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <PredictionCard
                key={prediction.id}
                prediction={prediction}
                voteStatus={voteStatus[prediction.id]}
                onVote={handleVote}
                expanded={expandedPrediction === prediction.id}
                onToggle={() => setExpandedPrediction(
                  expandedPrediction === prediction.id ? null : prediction.id
                )}
              />
            ))}
          </div>
        )}

        {/* SEO BOOSTER SECTIONS */}
        <div className="mt-16 space-y-12">
          {/* Section 1 - What Is Prediction Center? */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is Prediction Center?</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Prediction Center is a free, community-driven forecasting tool where anyone can submit a future prediction and vote Yes or No on open questions.
              </p>
              <p className="text-gray-600 mb-4">
                It works like a lightweight prediction market — but without money, gambling, or financial risk. Instead of trading contracts, Prediction Center tracks:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Community sentiment</li>
                <li>Forecast accuracy</li>
                <li>Probability shifts over time</li>
                <li>Which predictions become true</li>
              </ul>
              <p className="text-gray-600 mb-4">
                It&apos;s a fun way to see how often you&apos;re right about the future across topics like:
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Technology", "AI", "Business", "Crypto", "Entertainment", "World Events", "Culture", "Science", "Sports"].map(topic => (
                  <span key={topic} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {topic}
                  </span>
                ))}
              </div>
              <p className="text-gray-600">
                Prediction Center is designed to be simple, fast, and anonymous — everyone gets one vote per prediction based on cookies.
              </p>
            </div>
          </section>

          {/* Section 2 - How Prediction Center Works */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How Prediction Center Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Submit a prediction</h3>
                  <p className="text-gray-600">Anyone can submit a question about the future. Example: &quot;Will Apple release a foldable iPhone by 2026?&quot;</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">The community votes Yes or No</h3>
                  <p className="text-gray-600">Each visitor can vote once per prediction using anonymous cookies (no signup required).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Percentages update instantly</h3>
                  <p className="text-gray-600">You&apos;ll see live results showing what people believe will happen.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Predictions resolve when the outcome occurs</h3>
                  <p className="text-gray-600">Once the future event is confirmed, it becomes either <span className="font-medium text-green-600">Resolved: YES</span> or <span className="font-medium text-red-600">Resolved: NO</span>.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Historical accuracy is tracked</h3>
                  <p className="text-gray-600">Users can scroll through older predictions to see which ones came true.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <p className="text-sm text-orange-800">
                <strong>Note:</strong> Prediction Center is for fun, discussion, and insight — not betting or financial speculation.
              </p>
            </div>
          </section>

          {/* Section 3 - Why Use Prediction Center? */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Prediction Center?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "See how the crowd feels about upcoming events",
                "Test your forecasting skills",
                "Track which predictions came true",
                "Explore trends in tech, AI, crypto, and more",
                "Submit predictions others may not have thought about",
                "Watch the percentages shift as news breaks"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{benefit}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-600">
              This tool is built for curious thinkers, creators, founders, and anyone who likes to see if their intuition is right.
            </p>
          </section>

          {/* Section 4 - Popular Prediction Categories */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Prediction Categories</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "Technology Predictions", icon: "💻" },
                { name: "AI Predictions", icon: "🤖" },
                { name: "Crypto Predictions", icon: "₿" },
                { name: "Business & Startup Predictions", icon: "📈" },
                { name: "Social Media Predictions", icon: "📱" },
                { name: "Entertainment Predictions", icon: "🎬" },
                { name: "Global Events", icon: "🌍" },
                { name: "Science & Space", icon: "🚀" },
                { name: "Sports", icon: "⚽" }
              ].map((cat, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-medium text-gray-700">{cat.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-600 text-sm">
              Each category helps users discover predictions that match their interests.
            </p>
          </section>

          {/* Section 5 - FAQ */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What is Prediction Center?</h3>
                <p className="text-gray-600">Prediction Center is a free forecasting tool where anyone can submit predictions and vote Yes/No on future events.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is this gambling or betting?</h3>
                <p className="text-gray-600">No. There is no money involved, no trading, and no payouts. It is strictly for fun, curiosity, and community forecasting.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do I need an account to vote?</h3>
                <p className="text-gray-600">No. Prediction Center uses anonymous cookies so each user gets one vote per prediction.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How do predictions get resolved?</h3>
                <p className="text-gray-600">When the outcome becomes publicly verifiable, the prediction is marked as Resolved: YES or Resolved: NO.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can anyone submit a prediction?</h3>
                <p className="text-gray-600">Yes — anyone can submit a future question as long as it is clear and objectively resolvable.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Does Prediction Center use AI?</h3>
                <p className="text-gray-600">Not for voting — results are entirely based on community sentiment. AI may be used to improve moderation and insights.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is Prediction Center accurate?</h3>
                <p className="text-gray-600">Accuracy depends on how informed the community is. The more people vote, the more reliable the percentages become.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is the tool free?</h3>
                <p className="text-gray-600">Yes. Prediction Center is completely free to use.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Explore More Tools - Internal Linking */}
        <ExploreMoreTools currentTool="/tools/prediction-center" />

        <div className="mt-12 text-center">
          <Link
            href="/tools"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            ← Back to All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}

function PredictionCard({ 
  prediction, 
  voteStatus, 
  onVote,
  expanded,
  onToggle
}: { 
  prediction: Prediction;
  voteStatus?: { hasVoted: boolean; choice: "yes" | "no" | null; isVoting: boolean };
  onVote: (id: number, choice: "yes" | "no") => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  const isOpen = prediction.status === "open";
  const hasVoted = voteStatus?.hasVoted || false;
  const userChoice = voteStatus?.choice;
  const isVoting = voteStatus?.isVoting || false;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {prediction.category && (
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {prediction.category}
                </span>
              )}
              {isOpen ? (
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Open
                </span>
              ) : (
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Resolved: {prediction.outcome?.toUpperCase()}
                </span>
              )}
            </div>
            <h3 
              className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-orange-500 transition-colors"
              onClick={onToggle}
            >
              {prediction.question}
            </h3>
          </div>
        </div>

        {expanded && prediction.description && (
          <p className="text-gray-600 text-sm mb-4 bg-gray-50 p-3 rounded-lg">
            {prediction.description}
          </p>
        )}

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium text-green-600">Yes {prediction.yesPercent}%</span>
            <span className="font-medium text-red-600">No {prediction.noPercent}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
              style={{ width: `${prediction.yesPercent}%` }}
            />
            <div 
              className="bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500"
              style={{ width: `${prediction.noPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{prediction.totalVotes} vote{prediction.totalVotes !== 1 ? 's' : ''}</span>
            {prediction.closeDate && (
              <>
                <span className="mx-2">•</span>
                <Calendar className="w-4 h-4" />
                <span>Closes {new Date(prediction.closeDate).toLocaleDateString()}</span>
              </>
            )}
          </div>

          {isOpen && (
            <div className="flex items-center gap-2">
              {hasVoted ? (
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Voted {userChoice?.toUpperCase()}
                </span>
              ) : (
                <>
                  <button
                    onClick={() => onVote(prediction.id, "yes")}
                    disabled={isVoting}
                    className="flex items-center gap-1 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    {isVoting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ThumbsUp className="w-4 h-4" />
                    )}
                    Yes
                  </button>
                  <button
                    onClick={() => onVote(prediction.id, "no")}
                    disabled={isVoting}
                    className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    {isVoting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ThumbsDown className="w-4 h-4" />
                    )}
                    No
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
