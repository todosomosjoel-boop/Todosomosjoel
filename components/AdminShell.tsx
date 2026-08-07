import { Bell, Search } from "lucide-react";
import { SideNav } from "./SideNav";

export function AdminShell({ children, title, eyebrow = "Panel entrenador" }: { children: React.ReactNode; title: string; eyebrow?: string }) {
  return <div className="app-shell"><SideNav/><main className="app-main"><header className="topbar"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></div><div className="top-actions"><label className="search"><Search size={17}/><input placeholder="Buscar..." /></label><button className="icon-btn"><Bell size={19}/><i /></button><div className="avatar">J</div></div></header>{children}</main></div>;
}
