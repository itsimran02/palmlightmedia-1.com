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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Palmlight Media',
  'url': url,
  'logo': `${url}/logo.jpeg`,
  'description': desc,
  'areaServed': 'Worldwide',
  'knowsAbout': [
    'Websites',
    'Social Media Marketing',
    'Branding & Design',
    'Video Production',
    'Software Development',
    'SEO',
    'Paid Advertising'
  ],
  'sameAs': [
    'https://www.instagram.com/palmlightmedia/',
    'https://www.facebook.com/palmlightmedia'
  ]
};

export const metadata = {
  title: 'Palmlight Media — Global Digital Agency',
  description: desc,
  metadataBase: new URL(url),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.jpeg', type: 'image/jpeg' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.jpeg',
  },
  keywords: 'Websites, Social media, Design, Video, Apps, Software, SEO, Paid Ads, Global Digital Agency, Remote Agency, Palmlight Media',
  openGraph: {
    title: 'Palmlight Media — Global Digital Agency',
    description: desc,
    url: url,
    siteName: 'Palmlight Media',
    images: [
      {
        url: '/meta-img.png',
        width: 1200,
        height: 630,
        alt: 'Palmlight Media — Global Digital Agency',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palmlight Media — Global Digital Agency',
    description: desc,
    images: ['/meta-img.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

