"use client";

import { useState } from "react";
import { Search, Plus, Mail, Phone, Building2, MoreHorizontal } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  deals: number;
  value: number;
};

const demoContacts: Contact[] = [
  { id: "1", name: "Marcus Lee", email: "marcus@apex.co", phone: "+1 305-555-0101", company: "Apex Corp", source: "Inbound", deals: 2, value: 33500 },
  { id: "2", name: "Sarah Chen", email: "sarah@lunawell.com", phone: "+1 786-555-0202", company: "Luna Wellness", source: "Referral", deals: 1, value: 6200 },
  { id: "3", name: "James Rodriguez", email: "james@devhouse.io", phone: "+1 954-555-0303", company: "DevHouse Inc", source: "Website", deals: 1, value: 45000 },
  { id: "4", name: "Emily Park", email: "emily@brightdental.com", phone: "+1 561-555-0404", company: "Bright Dental", source: "Cold Outreach", deals: 1, value: 3800 },
  { id: "5", name: "David Kim", email: "david@techflow.co", phone: "+1 407-555-0505", company: "TechFlow", source: "LinkedIn", deals: 0, value: 0 },
  { id: "6", name: "Ana Martinez", email: "ana@greenscale.io", phone: "+1 305-555-0606", company: "GreenScale", source: "Conference", deals: 3, value: 72000 },
];

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const filtered = demoContacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Contacts</h1>
          <p className="text-sm text-text-secondary mt-1">{demoContacts.length} contacts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand hover:opacity-90 transition-opacity">
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
            {filtered.map((contact) => (
              <tr key={contact.id} className="border-b border-border last:border-0 hover:bg-surface-overlay transition-colors cursor-pointer">
                <td className="px-4 py-3 font-medium">{contact.name}</td>
                <td className="px-4 py-3 text-text-secondary hidden md:table-cell">
                  <span className="flex items-center gap-1.5">
                    <Building2 size={14} /> {contact.company}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} /> {contact.email}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden lg:table-cell">
                  <span className="flex items-center gap-1.5">
                    <Phone size={14} /> {contact.phone}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand">{contact.source}</span>
                </td>
                <td className="px-4 py-3 text-right">{contact.deals}</td>
                <td className="px-4 py-3 text-right font-medium">${contact.value.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button className="text-text-muted hover:text-text-primary">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
