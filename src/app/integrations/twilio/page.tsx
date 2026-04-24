"use client";

import { useState } from "react";
import { Phone, Send, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";

export default function TwilioPage() {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to.trim() || !message.trim()) return;
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: to.trim(), message: message.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("sent");
        setTo("");
        setMessage("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to send SMS");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error");
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Phone size={24} className="text-emerald-400" /> Twilio SMS
        </h1>
        <p className="text-sm text-text-secondary mt-1">Send SMS messages and manage campaigns</p>
      </div>

      <div className="stat-card space-y-4">
        <h2 className="text-sm font-medium flex items-center gap-2">
          <Send size={16} /> Quick Send
        </h2>
        <form onSubmit={handleSend} className="space-y-3">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Phone number (+1...)"
            className="w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            rows={3}
            className="w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand resize-none"
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-500 hover:opacity-90 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send SMS"}
            </button>
            {status === "sent" && (
              <span className="flex items-center gap-1 text-sm text-emerald-400">
                <CheckCircle size={14} /> Message delivered
              </span>
            )}
            {status === "error" && (
              <span className="flex items-center gap-1 text-sm text-red-400">
                <AlertCircle size={14} /> {errorMsg}
              </span>
            )}
          </div>
        </form>
      </div>

      <div className="stat-card">
        <h2 className="text-sm font-medium flex items-center gap-2 mb-3">
          <MessageSquare size={16} /> Recent Messages
        </h2>
        <p className="text-sm text-text-muted">Connect Twilio credentials in your Coolify deployment to see message history</p>
      </div>
    </div>
  );
}
