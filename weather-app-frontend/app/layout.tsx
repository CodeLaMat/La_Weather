import "./globals.css";
import ClientProviders from "./ClientProviders";

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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
