"use client";

import { useState, type FormEvent } from "react";
import { X, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../context/authContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">("login");

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError(null);
  };

  const handleTabSwitch = (newTab: "login" | "signup") => {
    setTab(newTab);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      let result;
      if (tab === "login") {
        result = await login(email, password);
      } else {
        result = await signup(email, password, name);
      }

      if (result.success) {
        handleClose();
      } else {
        setError(result.message || "Authentication failed. Please try again.");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#EDE6DC] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1 text-[#7A7268] hover:text-[#24211E] hover:bg-[#EDE6DC]/60 rounded-full transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="text-center space-y-1.5 mb-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#24211E]">
              {tab === "login" ? "Welcome Back" : "Create Account"}
            </h3>
            <p className="text-xs sm:text-sm text-[#7A7268]">
              {tab === "login"
                ? "Sign in to access your artisanal orders & wishlist"
                : "Join the collective for exclusive small-batch drops"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#EAE3D9] p-1 rounded-xl mb-6 text-sm font-medium">
            <button
              type="button"
              onClick={() => handleTabSwitch("login")}
              className={`flex-1 py-2 rounded-lg transition ${
                tab === "login"
                  ? "bg-white text-[#24211E] shadow-xs"
                  : "text-[#7A7268] hover:text-[#24211E]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch("signup")}
              className={`flex-1 py-2 rounded-lg transition ${
                tab === "signup"
                  ? "bg-white text-[#24211E] shadow-xs"
                  : "text-[#7A7268] hover:text-[#24211E]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "signup" && (
              <div>
                <label className="block text-xs font-medium text-[#4A453E] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7A7268] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-white border border-[#EDE6DC] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#24211E] placeholder-[#A89F91] focus:outline-none focus:border-[#24211E] transition"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#4A453E] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7A7268] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-[#EDE6DC] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#24211E] placeholder-[#A89F91] focus:outline-none focus:border-[#24211E] transition"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-[#4A453E] uppercase tracking-wider">
                  Password
                </label>
                {tab === "login" && (
                  <a
                    href="#"
                    className="text-xs text-[#7A7268] hover:text-[#24211E] hover:underline"
                  >
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7A7268] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    tab === "login" ? "••••••••" : "Create a strong password"
                  }
                  className="w-full bg-white border border-[#EDE6DC] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#24211E] placeholder-[#A89F91] focus:outline-none focus:border-[#24211E] transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-[#24211E] hover:bg-[#3D3A35] text-white py-3 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : tab === "login" ? (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch Prompt */}
          <p className="text-center text-xs text-[#7A7268] mt-6">
            {tab === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabSwitch("signup")}
                  className="font-medium text-[#24211E] underline underline-offset-2 hover:text-[#5B554E]"
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabSwitch("login")}
                  className="font-medium text-[#24211E] underline underline-offset-2 hover:text-[#5B554E]"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
