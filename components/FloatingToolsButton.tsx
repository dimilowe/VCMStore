"use client";

import { useState } from "react";
import Link from "next/link";
import { Wrench, X, Bell, QrCode, Zap, Cloud, Music, Flame, ArrowRight } from "lucide-react";

const creatorProducts = [
  {
    name: "Nudge",
    description: "Smart notifications for creators",
    href: "/product/nudge",
    icon: Bell,
    color: "bg-amber-500",
    available: true,
  },
  {
    name: "QR Social",
    description: "Social QR networking",
    href: "/product/qrsocial",
    icon: QrCode,
    color: "bg-cyan-500",
    available: true,
  },
  {
    name: "APE",
    description: "AI-powered engagement",
    href: "https://ape.vcm.fyi",
    icon: Zap,
    color: "bg-pink-500",
    available: true,
    external: true,
  },
  {
    name: "Stemly",
    description: "Music stem editor",
    href: "/product/stemly",
    icon: Music,
    color: "bg-teal-500",
    available: true,
  },
  {
    name: "C-Score",
    description: "Calorie calculator app",
    href: "/product/cscorecals",
    icon: Flame,
    color: "bg-orange-500",
    available: true,
  },
  {
    name: "VCM Skydrive",
    description: "Creator file management",
    href: "#",
    icon: Cloud,
    color: "bg-blue-500",
    available: false,
  },
];

export default function FloatingToolsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all group"
      >
        <Wrench className="w-5 h-5" />
        <span className="font-medium text-sm">Creator Tools</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">VCM Creator Tools</h2>
                <p className="text-orange-100 text-xs">Apps built for creators</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Products List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {creatorProducts.map((product) => (
                <div key={product.name}>
                  {product.available ? (
                    <Link
                      href={product.href}
                      target={product.external ? "_blank" : undefined}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl transition-all group"
                    >
                      <div className={`${product.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <product.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {product.name}
                          </span>
                          {product.external && (
                            <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                              External
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {product.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl opacity-60">
                      <div className={`${product.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <product.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-700">
                            {product.name}
                          </span>
                          <span className="text-xs bg-gray-300 text-gray-600 px-2 py-0.5 rounded-full">
                            Coming Soon
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <Link
              href="/tools"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors"
            >
              Explore All Free Tools
            </Link>
            <p className="text-center text-xs text-gray-500 mt-2">
              25+ free tools for creators
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
