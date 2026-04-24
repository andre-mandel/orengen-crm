"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Mail, Phone, Building2, MoreHorizontal, Trash2 } from "lucide-react";
import AddContactModal from "@/components/AddContactModal";
import { useTenant } from "@/components/TenantProvider";

type Contact = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  source: string | null;
  deals: { id: string; value: number }[];
};

export default function ContactsPage() {
  const { tenant } = useTenant();
  const brandColor = tenant?.brandColor || "#6366f1";
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const loadContacts = useCallback(() => {
    fetch("/api/contacts")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setContacts(data); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadContacts(); }, [loadContacts]);

  const handleAdd = async (c: { name: string; email: string; phone: string; company: string; source: string }) => {
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(c),
    });
    if (res.ok) loadContacts();
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/contacts?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      setMenuOpen(null);
    }
  };

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.company || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Contacts</h1>
          <p className="text-sm text-text-secondary mt-1">{contacts.length} contacts</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand hover:opacity-90 transition-opacity">
          <Plus size={16} /> Add Contact
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search contacts..."
          className="w-full bg-surface-raised border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand"
        />
      </div>

      {loading ? (
        <div className="stat-card h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="stat-card !p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="text-left font-medium px-4 py-3">Name</th>
                <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Company</th>
                <th className="text-left font-medium px-4 py-3 hidden lg:table-cell">Email</th>
                <th className="text-left font-medium px-4 py-3 hidden lg:table-cell">Phone</th>
                <th className="text-left font-medium px-4 py-3">Source</th>
                <th className="text-right font-medium px-4 py-3">Deals</th>
                <th className="text-right font-medium px-4 py-3">Value</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => {
                const totalValue = contact.deals.reduce((s, d) => s + d.value, 0);
                return (
                  <tr key={contact.id} className="border-b border-border last:border-0 hover:bg-surface-overlay transition-colors">
                    <td className="px-4 py-3 font-medium">{contact.name}</td>
                    <td className="px-4 py-3 text-text-secondary hidden md:table-cell">
                      {contact.company && <span className="flex items-center gap-1.5"><Building2 size={14} /> {contact.company}</span>}
                    </td>
                    <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">
                      {contact.email && <span className="flex items-center gap-1.5"><Mail size={14} /> {contact.email}</span>}
                    </td>
                    <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">
                      {contact.phone && <span className="flex items-center gap-1.5"><Phone size={14} /> {contact.phone}</span>}
                    </td>
                    <td className="px-4 py-3">
                      {contact.source && <span className="text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand">{contact.source}</span>}
                    </td>
                    <td className="px-4 py-3 text-right">{contact.deals.length}</td>
                    <td className="px-4 py-3 text-right font-medium">${totalValue.toLocaleString()}</td>
                    <td className="px-4 py-3 relative">
                      <button onClick={() => setMenuOpen(menuOpen === contact.id ? null : contact.id)} className="text-text-muted hover:text-text-primary">
                        <MoreHorizontal size={16} />
                      </button>
                      {menuOpen === contact.id && (
                        <div className="absolute right-4 top-10 z-50 glass rounded-lg py-1 min-w-[120px]">
                          <button onClick={() => handleDelete(contact.id)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-surface-overlay">
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-text-muted">No contacts found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && <AddContactModal brandColor={brandColor} onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
    </div>
  );
}
