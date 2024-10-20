import Header from "@/components/Header/Header";
import "../globals.css";
import Plano from "../../../public/backss.png";

export default function RootAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <title>Elite Gym</title>
      </head>
      <body
        className="antialiased"
        style={{
          backgroundImage: `url(${Plano.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
