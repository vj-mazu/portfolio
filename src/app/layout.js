import "./globals.css";

export const metadata = {
  title: "Manjunath | Full-Stack Engineer & AI Architect",
  description: "Premium portfolio of Manjunath — specializing in 3D web experiences, AI agents, WhatsApp bots, and full-stack applications. 12+ websites, 2 web apps, and 10+ AI deployments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
