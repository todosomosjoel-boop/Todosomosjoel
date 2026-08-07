import { ReactNode } from "react";

export function StatCard({ label, value, helper, icon }: { label: string; value: string; helper: string; icon: ReactNode }) {
  return <div className="stat-card"><div className="stat-head"><span>{label}</span><span className="icon-bubble">{icon}</span></div><strong>{value}</strong><small>{helper}</small></div>;
}
