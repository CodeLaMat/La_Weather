import React from "react";
import { ReactNode } from "react";
import ClientProviders from "./ClientProviders";

export const metadata = {
  title: "Weather App",
  description: "A weather app with theme toggling and Redux",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
