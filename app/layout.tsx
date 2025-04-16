import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { ChevronsLeftRight, Github } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "coding-problems-tracker",
  description:
    "A simple way to track coding problems you're solving across different platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center py-8">
            <div className="flex-1 w-full flex flex-col items-center justify-center">
              <header className="w-full flex justify-center">
                <div className="w-full max-w-4xl flex gap-5 items-center p-3 px-5 justify-center hover:text-primary font-semibold">
                  <ChevronsLeftRight
                    size={20}
                    className="self-center"
                  />
                  <Link
                    className="text-base"
                    href={"/"}
                  >
                    coding-problems-tracker
                  </Link>
                </div>
              </header>
              <div className="flex flex-col gap-22 w-full max-w-xl p-1 justify-center items-center">
                {children}
              </div>

              <footer className="w-full flex flex-col mx-auto justify-center text-xs items-center gap-1 py-6">
                <span className="flex gap-2 items-center">
                  {`© Copyright ${new Date().getFullYear()}`}{" "}
                  <a
                    target="blank"
                    href="https://github.com/pj-pj-pj/coding-problems-tracker"
                    className="text-purple-600 hover:border-b hover:border-purple-600 flex items-center gap-1"
                  >
                    coding-problems-tracker{" "}
                    <Github
                      color="#9333ea"
                      size={19}
                      strokeWidth={1.4}
                      className="self-center pb-1"
                    />
                  </a>
                </span>
                <span>
                  Made with {` `}
                  <a
                    target="blank"
                    href="https://vercel.com/templates/next.js/nextjs-boilerplate"
                    className="text-pink-600 hover:border-b hover:border-pink-600"
                  >
                    Vercel's Next.js Boilerplate
                  </a>
                </span>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
