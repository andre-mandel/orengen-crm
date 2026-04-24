"use client";

import { useState } from "react";
import { Save, Palette, Globe, Key, Users } from "lucide-react";

export default function SettingsPage() {
  const [brandName, setBrandName] = useState(process.env.NEXT_PUBLIC_BRAND_NAME || "OrenGen");
  const [brandColor, setBrandColor] = useState(process.env.NEXT_PUBLIC_BRAND_COLOR || "#6366f1");
  const [domain, setDomain] = useState("app.orengen.io");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">Configure your CRM</p>
      </div>

      <div className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Palette size={18} className="text-brand" />
          <h2 className="text-sm font-medium">Branding</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-text-secondary block mb-1">Brand Name</label>
            <input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1">Brand Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-border cursor-pointer bg-transparent"
              />
              <input
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="flex-1 bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs text-text-secondary block mb-1">Logo URL</label>
          <input
            placeholder="https://yourdomain.com/logo.png"
            className="w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand"
          />
        </div>
      </div>

      <div className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Globe size={18} className="text-brand" />
          <h2 className="text-sm font-medium">Domain</h2>
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-1">Custom Domain</label>
          <input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand"
          />
        </div>
      </div>

      <div className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Key size={18} className="text-brand" />
          <h2 className="text-sm font-medium">Integrations</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Twilio Account SID", env: "TWILIO_ACCOUNT_SID" },
            { label: "Twilio Auth Token", env: "TWILIO_AUTH_TOKEN" },
            { label: "Stripe Secret Key", env: "STRIPE_SECRET_KEY" },
            { label: "Cal.com API Key", env: "CALCOM_API_KEY" },
            { label: "CrewAI API URL", env: "CREWAI_API_URL" },
            { label: "VAPI API Key", env: "VAPI_API_KEY" },
            { label: "n8n Webhook URL", env: "N8N_WEBHOOK_URL" },
          ].map((field) => (
            <div key={field.env}>
              <label className="text-xs text-text-secondary block mb-1">{field.label}</label>
              <input
                type="password"
                placeholder={field.env}
                className="w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Users size={18} className="text-brand" />
          <h2 className="text-sm font-medium">Team</h2>
        </div>
        <p className="text-sm text-text-secondary">Invite team members and manage roles (Owner, Admin, Member, VA)</p>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand hover:opacity-90 transition-opacity">
          Invite User
        </button>
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-brand hover:opacity-90 transition-all"
      >
        <Save size={16} />
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
