import Link from "next/link";
import { Activity, ArrowRight, BarChart3, Dumbbell, Film, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Home() {
  return <main className="landing">
    <nav className="landing-nav"><Logo/><div><a href="#plataforma">Plataforma</a><a href="#metodo">Método</a><Link className="btn ghost" href="/alumno">Portal alumno</Link><Link className="btn primary" href="/admin">Entrar demo</Link></div></nav>
    <section className="hero">
      <div className="hero-copy"><span className="pill"><Sparkles size={15}/>Entrenamiento personalizado, realmente personalizado</span><h1>Tu progreso no es genérico.<br/><em>Tu plan tampoco.</em></h1><p>Todos Somos Joel centraliza clientes, rutinas, videos, controles y evolución en una experiencia simple para entrenador y alumno.</p><div className="hero-cta"><Link className="btn primary large" href="/admin">Ver panel entrenador <ArrowRight size={18}/></Link><Link className="btn ghost large" href="/alumno">Ver experiencia alumno</Link></div><div className="trust-row"><span><ShieldCheck size={17}/>Seguimiento individual</span><span><Film size={17}/>Videos por alumno</span><span><BarChart3 size={17}/>Progreso medible</span></div></div>
      <div className="hero-panel"><div className="mini-window"><div className="window-top"><span/><span/><span/><b>Semana de Camila</b></div><div className="today-card"><small>ENTRENAMIENTO DE HOY</small><h3>Torso · Fuerza</h3><p>6 ejercicios · 48 minutos</p><button><Dumbbell size={18}/>Comenzar entrenamiento</button></div><div className="mini-stats"><div><small>Adherencia</small><strong>92%</strong><span className="tiny-bar"><i style={{width:"92%"}}/></span></div><div><small>Racha</small><strong>8 días</strong><span>🔥 mejor marca</span></div></div><div className="coach-note"><div className="avatar lime">J</div><p><b>Nota de Joel</b>“Esta semana subimos carga solo si completas las repeticiones con buena técnica.”</p></div></div></div>
    </section>
    <section className="feature-section" id="plataforma"><div className="section-heading"><span>UNA SOLA PLATAFORMA</span><h2>Todo lo que necesitas para acompañar a cada alumno</h2></div><div className="feature-grid">{[
      [Users,"Clientes y fichas","Registro completo, objetivos, antecedentes, medidas, observaciones y estado del alumno."],
      [Dumbbell,"Planes personalizados","Rutinas semanales con ejercicios, series, repeticiones, descanso y carga objetivo."],
      [Film,"Biblioteca de videos","Sube, organiza y asigna videos de técnica o sesiones completas a alumnos específicos."],
      [Activity,"Seguimiento","Peso, medidas, adherencia, sesiones realizadas, fotos de progreso y notas del entrenador."]
    ].map(([Icon,title,text]: any) => { const I=Icon; return <article className="feature-card" key={title}><span><I size={22}/></span><h3>{title}</h3><p>{text}</p></article>})}</div></section>
    <section className="method" id="metodo"><div><span className="pill dark">TODOS SOMOS JOEL</span><h2>Una comunidad, muchos objetivos.</h2><p>La plataforma está pensada para que el entrenamiento deje de sentirse como una plantilla. Cada persona ve solamente su plan, sus videos, sus metas y el feedback que necesita.</p></div><div className="method-list"><div><b>01</b><span><strong>Evaluar</strong><small>Ficha inicial y objetivos</small></span></div><div><b>02</b><span><strong>Entrenar</strong><small>Plan + videos personalizados</small></span></div><div><b>03</b><span><strong>Medir</strong><small>Seguimiento y adherencia</small></span></div><div><b>04</b><span><strong>Ajustar</strong><small>Feedback continuo</small></span></div></div></section>
    <footer><Logo/><p>Demo conceptual · Todos Somos Joel © 2026</p></footer>
  </main>;
}
