"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Dumbbell, Home, MessageCircle, User } from "lucide-react";
import { Logo } from "./Logo";
const items=[[/alumno$/,"/alumno","Inicio",Home],[/entrenamiento/,"/alumno/entrenamiento","Entrenar",Dumbbell],[/progreso/,"/alumno/progreso","Progreso",BarChart3]] as const;
export function StudentNav(){const p=usePathname(); return <><header className="student-top"><Logo/><div><button className="icon-btn"><MessageCircle size={18}/></button><span className="avatar soft">CR</span></div></header><nav className="student-bottom">{items.map(([r,h,l,I])=><Link className={r.test(p)?"active":""} href={h} key={h}><I size={20}/><span>{l}</span></Link>)}<Link href="#perfil"><User size={20}/><span>Perfil</span></Link></nav></>}
