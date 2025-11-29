"use client"

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  products?: Array<{
    id: string;
    name: string;
    type: string;
    price_type: string;
    price: number;
    slug: string;
  }>;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to VCM Store AI Strategy Sessions! I'm here to help you discover the perfect tools and resources for your creator business. What are you working on today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, messages }),
      });

      if (!response.ok) throw new Error("Chat failed");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          products: data.products,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-4 text-gray-900">
            AI STRATEGY SESSIONS
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized recommendations from our AI to discover the perfect apps, tools, and resources for your creator journey.
          </p>
        </div>

        <Card className="border-2 border-gray-200 shadow-xl">
          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto p-6 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.role === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-white border-2 border-gray-200"
                    } rounded-2xl px-6 py-4`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>

                    {message.products && message.products.length > 0 && (
                      <div className="mt-4 space-y-3 pt-4 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Recommended Products:
                        </p>
                        {message.products.map((product) => (
                          <a
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="block bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-3 border border-gray-200"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {product.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {product.type}
                                  </Badge>
                                  <span className="text-sm text-gray-600">
                                    {product.price_type === "free"
                                      ? "Free"
                                      : `$${(product.price / 100).toFixed(2)}`}
                                  </span>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                className="bg-orange-500 hover:bg-orange-600"
                              >
                                View
                              </Button>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-gray-200 rounded-2xl px-6 py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t-2 border-gray-200 p-4"
            >
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me about apps, tools, courses, or strategies..."
                  className="min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-orange-500 hover:bg-orange-600 px-6"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
