import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hospital Metropolitano Dr. Célio de Castro | O melhor lugar para receber cuidado",
  description:
    "Hospital Metropolitano Dr. Célio de Castro (HMDCC) — referência em atendimento de alta complexidade 100% SUS em Belo Horizonte: AVC, CTI, cirurgias, exames de imagem e laboratoriais.",
  keywords: [
    "HMDCC",
    "Hospital Célio de Castro",
    "Hospital Metropolitano Dr. Célio de Castro",
    "SUS Belo Horizonte",
    "AVC",
    "CTI",
    "hospital",
  ],
  authors: [{ name: "HMDCC" }],
  openGraph: {
    title: "Hospital Metropolitano Dr. Célio de Castro",
    description: "O melhor lugar para receber cuidado. 100% SUS, referência em alta complexidade.",
    siteName: "HMDCC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} antialiased bg-background text-foreground font-body`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
