import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todos Somos Joel | Fitness personalizado",
  description: "Gestión de alumnos, entrenamientos, videos y seguimiento de progreso."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
