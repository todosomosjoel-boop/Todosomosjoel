export type Client = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  goal: string;
  plan: string;
  status: "Activo" | "Pausa";
  adherence: number;
  weight: number;
  startWeight: number;
  sessions: number;
  nextCheck: string;
};

export const clients: Client[] = [
  { id: "camila-rojas", name: "Camila Rojas", initials: "CR", email: "camila@demo.cl", phone: "+56 9 5555 1101", goal: "Bajar grasa y mejorar condición física", plan: "Transformación 12 semanas", status: "Activo", adherence: 92, weight: 66.8, startWeight: 71.2, sessions: 26, nextCheck: "12 ago" },
  { id: "matias-soto", name: "Matías Soto", initials: "MS", email: "matias@demo.cl", phone: "+56 9 5555 1102", goal: "Aumentar masa muscular", plan: "Hipertrofia personalizada", status: "Activo", adherence: 86, weight: 82.1, startWeight: 78.5, sessions: 19, nextCheck: "14 ago" },
  { id: "valentina-perez", name: "Valentina Pérez", initials: "VP", email: "valentina@demo.cl", phone: "+56 9 5555 1103", goal: "Volver a entrenar y ganar fuerza", plan: "Reinicio 8 semanas", status: "Activo", adherence: 78, weight: 61.5, startWeight: 63.0, sessions: 14, nextCheck: "15 ago" },
  { id: "tomas-arias", name: "Tomás Arias", initials: "TA", email: "tomas@demo.cl", phone: "+56 9 5555 1104", goal: "Mejorar rendimiento deportivo", plan: "Performance", status: "Pausa", adherence: 63, weight: 75.4, startWeight: 76.0, sessions: 11, nextCheck: "20 ago" }
];

export const videos = [
  { id: 1, title: "Sentadilla goblet", category: "Piernas", level: "Inicial", duration: "04:18", equipment: "Mancuerna", note: "Rodillas siguen la línea de los pies." },
  { id: 2, title: "Peso muerto rumano", category: "Piernas", level: "Intermedio", duration: "05:02", equipment: "Mancuernas", note: "Controla el descenso y mantén columna neutra." },
  { id: 3, title: "Press de pecho", category: "Torso", level: "Inicial", duration: "03:45", equipment: "Mancuernas", note: "Escápulas estables durante todo el movimiento." },
  { id: 4, title: "Remo unilateral", category: "Espalda", level: "Intermedio", duration: "04:31", equipment: "Mancuerna", note: "Evita rotar el tronco." },
  { id: 5, title: "Core anti-rotación", category: "Core", level: "Intermedio", duration: "06:10", equipment: "Banda", note: "Aprieta abdomen y glúteos." },
  { id: 6, title: "Movilidad de cadera", category: "Movilidad", level: "Todos", duration: "07:25", equipment: "Sin equipo", note: "Úsalo como activación o recuperación." }
];

export const weeklyPlan = [
  { day: "Lunes", label: "Piernas + Core", exercises: 5, duration: "52 min", status: "Completado" },
  { day: "Miércoles", label: "Torso", exercises: 6, duration: "48 min", status: "Hoy" },
  { day: "Viernes", label: "Full body", exercises: 7, duration: "58 min", status: "Pendiente" },
  { day: "Domingo", label: "Movilidad + caminata", exercises: 3, duration: "35 min", status: "Pendiente" }
];
