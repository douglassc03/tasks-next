import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { NextUI } from "@/providers/next-ui";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task Manager, a simple task manager app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} dark`}>
        <NextUI>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </NextUI>
      </body>
    </html>
  );
}
