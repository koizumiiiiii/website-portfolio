import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "James Oliver Mendoza — Portfolio",
  description:
    "CS Student at UM | Building robust web apps, solving real problems. Open for OJT opportunities.",
  keywords: [
    "James Oliver Mendoza", "portfolio", "web developer",
    "CS student", "Next.js", "React", "Philippines",
  ],
  authors: [{ name: "James Oliver Mendoza" }],
  creator: "James Oliver Mendoza",
  openGraph: {
    type: "website", locale: "en_US",
    title: "James Oliver Mendoza — Portfolio",
    description: "CS Student at UM | Building robust web apps & solving real problems.",
    siteName: "James Oliver Mendoza",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Oliver Mendoza — Portfolio",
    description: "CS Student at UM | Building robust web apps & solving real problems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'neutral';
                  var mode = localStorage.getItem('mode');
                  var root = document.documentElement;
                  root.setAttribute('data-theme', theme);
                  if (mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    root.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-surface text-slate-900 dark:text-slate-100 font-body overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
