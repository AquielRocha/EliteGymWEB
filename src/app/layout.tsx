import { Roboto } from 'next/font/google';

// Carregar a fonte Roboto do Google Fonts
const roboto = Roboto({
  subsets: ['latin'],  // Define quais caracteres você precisa
  weight: ['400', '700'],  // Define os pesos que você quer usar (normal e bold, por exemplo)
  variable: '--font-roboto',  // Nome da variável CSS que será usada
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      </head>
      <body className={roboto.variable}> {/* Aplica a fonte no body */}
        {children}
      </body>
    </html>
  );
}
