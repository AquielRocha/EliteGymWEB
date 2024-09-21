import Header from "@/components/Header/Header";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <title>Elite Gym</title>
      </head>
      <body>
     <Header />

        {children}
      </body>
    </html>
  );
}
