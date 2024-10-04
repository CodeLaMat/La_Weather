import "./globals.css";
import ClientProviders from "./ClientProviders";
import { Toaster } from "sonner";

export const metadata = {
  title: "Weather App",
  description: "A weather app with theme toggling and Redux",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
