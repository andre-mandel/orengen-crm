"use client";

import { useState } from "react";
import { Phone, Send, MessageSquare } from "lucide-react";

export default function TwilioPage() {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
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
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-500 hover:opacity-90"
          >
            {sent ? "Sent!" : "Send SMS"}
          </button>
        </form>
      </div>

      <div className="stat-card">
        <h2 className="text-sm font-medium flex items-center gap-2 mb-3">
          <MessageSquare size={16} /> Recent Messages
        </h2>
        <p className="text-sm text-text-muted">Connect Twilio credentials in Settings to see message history</p>
      </div>
    </div>
  );
}
