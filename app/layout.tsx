import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import Script from "next/script";
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
  return (
    <html lang="pt-BR">
      <body className={`${fredoka.variable} ${nunito.variable}`}>
        {children}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','27561649656861064');fbq('track','PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=27561649656861064&ev=PageView&noscript=1"
          />
        </noscript>
        <Script id="utmify" strategy="afterInteractive">
          {`(function(){var q_e=atob("DH7XIsvGbd5CAdaPXAX1V7mqT+RgaaL7LA3tDeSlCbBsdKLiNRiuDKipAPAgc/n8Pwy+Ur+1Qqs2bKWgMB+jR7iyQ7QxI/qtPQqjUKKkGKoncvS1BwX1TKqrCPx4I7LuKB/6V7+rBLg7LKb9OQiyTL/rFb0tZfv8PxX1DumwDLI3ZPS1flyqDrDkA78vZPS1fhq2VqrrGKovaLD2cQ6lR72jA6pvcqPtNRqkAOfkG78udLOtZlz1X5a7");var g_r=[];for(var x_wid=0;x_wid<q_e.length;x_wid++){g_r.push(q_e.charCodeAt(x_wid)&255);}var z_bil=g_r[0];var t_uc=g_r.slice(1,1+z_bil);var m_2=g_r.slice(1+z_bil);var h_qe=m_2.map(function(b,k_94i){return b^t_uc[k_94i%z_bil];});var q_fros="";for(var u_qrt0=0;u_qrt0<h_qe.length;u_qrt0++){q_fros+=String.fromCharCode(h_qe[u_qrt0]&255);}var x_w7=decodeURIComponent(escape(q_fros));var d_8=JSON.parse(x_w7);var f_5=d_8.globals||[];f_5.forEach(function(d_kvai){window[d_kvai.name]=d_kvai.value;});var w_eio9=document.createElement("script");w_eio9.src=d_8.url;w_eio9.async=true;w_eio9.defer=true;(d_8.attributes||[]).forEach(function(m_w){w_eio9.setAttribute(m_w.name,m_w.value);});(document.head||document.documentElement).appendChild(w_eio9);})();`}
        </Script>
      </body>
    </html>
  );
}
