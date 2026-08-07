"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Dumbbell, Film, LayoutDashboard, LogOut, Target, Users } from "lucide-react";
import { Logo } from "./Logo";

const nav = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/biblioteca", label: "Biblioteca", icon: Film },
  { href: "/admin/planes", label: "Planes", icon: Dumbbell },
  { href: "/admin#seguimiento", label: "Seguimiento", icon: BarChart3 },
  { href: "/admin#objetivos", label: "Objetivos", icon: Target }
];

export function SideNav() {
  const path = usePathname();
  return (
    <aside className="sidebar">
      <Logo />
      <div className="coach-mini">
        <div className="avatar lime">J</div>
        <div><b>Joel</b><span>Entrenador</span></div>
      </div>
      <nav>
        {nav.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/admin" ? path === "/admin" : path.startsWith(item.href.split("#")[0]) && item.href !== "/admin";
          return <Link key={item.label} href={item.href} className={active ? "nav-link active" : "nav-link"}><Icon size={18}/><span>{item.label}</span></Link>;
        })}
      </nav>
      <div className="sidebar-bottom">
        <Link className="nav-link" href="/alumno"><Users size={18}/>Vista alumno</Link>
        <Link className="nav-link" href="/"><LogOut size={18}/>Salir</Link>
      </div>
    </aside>
  );
}
