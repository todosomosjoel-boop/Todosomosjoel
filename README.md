# Todos Somos Joel

Prototipo funcional para una plataforma de entrenamiento personalizado con dos experiencias: **Panel Entrenador** y **Portal Alumno**.

## Qué incluye esta demo

- Landing de marca "Todos Somos Joel".
- Dashboard del entrenador con KPIs, alertas, agenda y seguimiento.
- Gestión de clientes con búsqueda y modal para registrar un alumno demo.
- Ficha individual con objetivo, peso, adherencia, plan, videos y notas.
- Biblioteca de videos con filtros por categoría.
- Plantillas de planes de entrenamiento.
- Portal del alumno con entrenamiento semanal.
- Rutina interactiva con ejercicios marcables como completados.
- Pantalla de progreso con KPIs, medidas, gráfico y fotos privadas demo.
- `supabase/schema.sql` con una propuesta de modelo relacional + RLS.

> La interfaz corre con datos demo. El SQL deja preparada la estructura para reemplazar los mocks por Supabase.

## Stack recomendado

- Next.js 16 Active LTS
- React 19
- TypeScript
- Supabase (Postgres + Auth + Storage)
- Vercel para despliegue

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

Rutas principales:

- `/` — presentación / acceso demo
- `/admin` — panel entrenador
- `/admin/clientes` — clientes
- `/admin/clientes/camila-rojas` — ficha demo
- `/admin/biblioteca` — biblioteca de videos
- `/admin/planes` — planes
- `/alumno` — portal alumno
- `/alumno/entrenamiento` — entrenamiento actual
- `/alumno/progreso` — evolución

## Conectar Supabase

1. Crear un proyecto Supabase.
2. Copiar `.env.example` como `.env.local` y completar:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
3. Ejecutar `supabase/schema.sql` en SQL Editor.
4. Sustituir progresivamente `lib/data.ts` por consultas de Supabase.
5. Implementar Auth por rol (`coach` / `student`).
6. Para videos y fotos, usar los buckets privados definidos en el SQL y URLs firmadas.

## Flujo funcional sugerido para producción

### Entrenador
1. Inicia sesión.
2. Registra al cliente.
3. Completa evaluación inicial y objetivo.
4. Crea o copia un plan.
5. Asigna ejercicios y videos.
6. Revisa adherencia, registros y progreso.
7. Ajusta cargas / plan y deja feedback.

### Alumno
1. Inicia sesión.
2. Ve su sesión del día.
3. Consulta video técnico de cada ejercicio.
4. Marca ejercicios y sesión completados.
5. Registra esfuerzo/comentarios.
6. Revisa progreso y controles.

## Próximas funciones recomendadas

- Invitación de alumnos por correo.
- Calendario real de controles y sesiones.
- Mensajería entrenador/alumno.
- Notificaciones por email o WhatsApp.
- Historial de cargas por ejercicio y récords personales.
- Formularios PAR-Q / antecedentes de salud.
- Panel de pagos y estado de planes comerciales.
- Generación automática de reportes de evolución.

