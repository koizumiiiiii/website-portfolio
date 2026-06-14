import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "James Oliver Mendoza — Portfolio",
  description:
    "CS Student at UM | Building robust web apps, solving real problems. Open for OJT opportunities.",
  keywords: [
    "James Oliver Mendoza",
    "portfolio",
    "web developer",
    "CS student",
    "Next.js",
    "React",
    "Philippines",
  ],
  authors: [{ name: "James Oliver Mendoza" }],
  creator: "James Oliver Mendoza",
  openGraph: {
    type: "website",
    locale: "en_US",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-slate-100 font-body overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
