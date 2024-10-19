import Header from "@/components/Header/Header";
import "../globals.css";
import { Separator } from "@/components/ui/separator";
import localFont from 'next/font/local';

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

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
        <Separator />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
