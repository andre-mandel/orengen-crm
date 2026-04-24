"use client";

import { useState } from "react";
import { Save, Palette, Globe, Key, Users, Check } from "lucide-react";
import { useTenant } from "@/components/TenantProvider";

export default function SettingsPage() {
  const { tenant, refresh } = useTenant();
  const [brandName, setBrandName] = useState(tenant?.name || "OrenGen");
  const [brandColor, setBrandColor] = useState(tenant?.brandColor || "#6366f1");
  const [logo, setLogo] = useState(tenant?.logo || "");
  const [domain, setDomain] = useState(tenant?.domain || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/tenant", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: brandName, brandColor, logo: logo || null, domain: domain || null }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      refresh();
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const inputClass = "w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand";

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
            <input value={brandName} onChange={(e) => setBrandName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1">Brand Color</label>
            <div className="flex gap-2">
              <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="w-10 h-10 rounded-lg border border-border cursor-pointer bg-transparent" />
              <input value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className={`flex-1 ${inputClass.replace("w-full ", "")}`} />
            </div>
          </div>
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-1">Logo URL</label>
          <input value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="https://yourdomain.com/logo.png" className={inputClass} />
        </div>
      </div>

      <div className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Globe size={18} className="text-brand" />
          <h2 className="text-sm font-medium">Domain</h2>
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-1">Custom Domain</label>
          <input value={domain} onChange={(e) => setDomain(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="stat-card space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Key size={18} className="text-brand" />
          <h2 className="text-sm font-medium">Integrations</h2>
        </div>
        <p className="text-xs text-text-muted">Integration credentials are configured via environment variables on the server for security. Update them in your Coolify deployment settings.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Twilio", env: "TWILIO_ACCOUNT_SID", set: !!process.env.NEXT_PUBLIC_HAS_TWILIO },
            { label: "Stripe", env: "STRIPE_SECRET_KEY", set: !!process.env.NEXT_PUBLIC_HAS_STRIPE },
            { label: "Cal.com", env: "CALCOM_API_KEY", set: !!process.env.NEXT_PUBLIC_HAS_CALCOM },
            { label: "CrewAI", env: "CREWAI_API_URL", set: !!process.env.NEXT_PUBLIC_HAS_CREWAI },
            { label: "VAPI", env: "VAPI_API_KEY", set: !!process.env.NEXT_PUBLIC_HAS_VAPI },
            { label: "n8n", env: "N8N_WEBHOOK_URL", set: !!process.env.NEXT_PUBLIC_HAS_N8N },
          ].map((svc) => (
            <div key={svc.env} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-overlay text-sm">
              <div className={`w-2 h-2 rounded-full ${svc.set ? "bg-emerald-400" : "bg-text-muted"}`} />
              <span>{svc.label}</span>
              <span className="text-xs text-text-muted ml-auto">{svc.set ? "Connected" : "Not set"}</span>
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
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-brand hover:opacity-90 transition-all disabled:opacity-50"
      >
        {saved ? <Check size={16} /> : <Save size={16} />}
        {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
