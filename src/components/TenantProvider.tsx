"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Tenant = {
  id: string;
  name: string;
  brandColor: string;
  logo: string | null;
  domain: string | null;
};

type TenantCtx = {
  tenant: Tenant | null;
  loading: boolean;
  refresh: () => void;
};

const TenantContext = createContext<TenantCtx>({
  tenant: null,
  loading: true,
  refresh: () => {},
});

export function useTenant() {
  return useContext(TenantContext);
}

export default function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetch("/api/tenant")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setTenant(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <TenantContext.Provider value={{ tenant, loading, refresh: load }}>
      {children}
    </TenantContext.Provider>
  );
}
