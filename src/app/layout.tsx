import type { Metadata } from "next";
import { Inter, Space_Grotesk, Source_Serif_4 } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import { BackspaceNav } from "@/components/BackspaceNav";
import { CookieConsent } from "@/components/CookieConsent";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

// Used only by the "ЕООД" ring text in the Logo mark — loading it here
// (rather than converting the letters to outline paths) means the live
// <text> in that inline SVG always resolves this face instead of falling
// back to a system serif.
const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif",
  weight: ["600"],
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Business Launch Navigator — Пътеводител За ЕООД",
    template: "%s",
  },
  description: "Интерактивна платформа за стартиране на бизнес в България. Стъпка по стъпка — от идея до първия клиент.",
  openGraph: {
    siteName: "Business Launch Navigator",
    locale: "bg_BG",
    type: "website",
  },
  verification: {
    google: "B00ZlrBXrdCSvDPwvO6fJd2kYE2UhbiYQVNaR0FbAXg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bg"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${sourceSerif4.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('bln-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Към съдържанието
        </a>
        <AuthProvider>{children}</AuthProvider>
        <BackspaceNav />
        <CookieConsent gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
