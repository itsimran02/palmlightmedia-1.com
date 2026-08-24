import '../common/style/globals.css';
import { Poppins, Roboto } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

const desc = 'Websites. Social media. Design. Video. Apps. Software. SEO. Paid Ads. Everything your business needs to get seen, chosen and remembered.';
const url = 'https://palmlightmedia.com';

export const metadata = {
  title: 'Palmlight Media — Digital Agency Muscat, Oman',
  description: desc,
  metadataBase: new URL(url),
  icons: '/wp-content/uploads/2026/08/palmlightmedia-logo-transparent.png',
  keywords: 'Websites, Social media, Design, Video, Apps, Software, SEO, Paid Ads, Muscat, Oman, Palmlight Media',
  openGraph: {
    title: 'Palmlight Media — Digital Agency Muscat',
    description: desc,
    url: url,
    siteName: 'Palmlight Media',
    images: [
      {
        url: '/meta-img.png',
        width: 1200,
        height: 630,
        alt: 'Palmlight Media — Digital Agency Muscat',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palmlight Media — Digital Agency Muscat',
    description: desc,
    images: ['/meta-img.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
