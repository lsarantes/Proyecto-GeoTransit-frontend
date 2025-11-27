import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GeoTransit",
  description: "No sabemos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={`${montserrat.className} `}>
        
        <AuthProvider>
          {children}
            <Toaster position="bottom-right" richColors closeButton/>
        </AuthProvider>
      </body>
    </html>
  );
}
