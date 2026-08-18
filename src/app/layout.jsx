import '../common/style/globals.css';

const desc = 'Websites. Social media. Design. Video. Apps. Software. SEO. Paid Ads. Everything your business needs to get seen, chosen and remembered.';
const url = 'https://palmlightmedia.com';

export const metadata = {
  title: 'Palm Light Media — Digital Agency Muscat, Oman',
  description: desc,
  metadataBase: new URL(url),
  icons: '/wp-content/uploads/2026/08/palmlightmedia-logo-transparent.png',
  keywords: 'Websites, Social media, Design, Video, Apps, Software, SEO, Paid Ads, Muscat, Oman, Palm Light Media',
  openGraph: {
    title: 'Palm Light Media — Digital Agency Muscat',
    description: desc,
    url: url,
    siteName: 'Palm Light Media',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
