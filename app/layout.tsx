import type { Metadata } from "next";
import { Cinzel, Lora } from "next/font/google";
import "./globals.css";
import AIAssistant from "@/components/ui/AIAssistant";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Election Compass | Your Interactive Voting Guide",
  description: "An interactive platform to help you understand the election process, timelines, and voting steps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable} antialiased scroll-smooth overflow-x-hidden`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 overflow-x-hidden max-w-[100vw]">
        <main className="flex-grow flex flex-col w-full overflow-hidden">
          {children}
        </main>
        <AIAssistant />
      </body>
    </html>
  );
}
