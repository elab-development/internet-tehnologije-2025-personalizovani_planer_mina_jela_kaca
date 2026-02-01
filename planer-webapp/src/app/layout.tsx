import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body>

        <header>
          <nav>Primer headera</nav>
        </header>
       
        <main>
          {children}
        </main>

        <footer>
          Primer footera
        </footer>

      </body>
    </html>
  );
}
