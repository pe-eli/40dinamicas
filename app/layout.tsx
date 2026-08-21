import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({ variable: "--font-display", subsets: ["latin"] });
const nunito = Nunito({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "40 Dinâmicas para Festas Infantis sem Eletrônicos",
  description: "Brincadeiras simples e divertidas para crianças de 4 a 12 anos. Organize festas infantis com menos telas, materiais acessíveis e atividades prontas.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "40 Dinâmicas para Festas Infantis sem Eletrônicos",
    description: "Menos telas. Mais brincadeiras e memórias.",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "40 Dinâmicas para Festas Infantis sem Eletrônicos" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "40 Dinâmicas para Festas Infantis sem Eletrônicos",
    description: "Menos telas. Mais brincadeiras e memórias.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${fredoka.variable} ${nunito.variable}`}>{children}</body></html>;
}
