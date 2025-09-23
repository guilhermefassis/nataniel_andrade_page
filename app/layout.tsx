
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nataniel Andrade - Master Coach Integral Sistêmico | Coaching de Vida e Carreira',
  description: 'Coaching de Vida, Carreira e Negócios com Nataniel Andrade. Coach Integral Sistêmico Febracis e Adm. CEUMA, +1500 horas de experiência. Desenvolva sua liderança e resultados.',
  keywords: [
    'coaching',
    'master coach',
    'desenvolvimento pessoal',
    'coaching integral sistêmico',
    'febracis',
    'são luís',
    'maranhão',
    'liderança',
    'alta performance',
    'transformação pessoal'
  ],
  authors: [{ name: 'Nataniel Andrade' }],
  creator: 'Nataniel Andrade',
  publisher: 'Nataniel Andrade',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://natanielandrade.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nataniel Andrade - Master Coach Integral Sistêmico',
    description: 'Coaching de Vida, Carreira e Negócios com Nataniel Andrade. +1500 horas de experiência em desenvolvimento pessoal e profissional.',
    url: 'https://natanielandrade.com.br',
    siteName: 'Nataniel Andrade Coaching',
    images: [
      {
        url: '/images/profile.png',
        width: 1200,
        height: 630,
        alt: 'Nataniel Andrade - Master Coach Integral Sistêmico',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nataniel Andrade - Master Coach Integral Sistêmico',
    description: 'Desenvolva seu potencial máximo com coaching profissional em São Luís, MA.',
    images: ['/images/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-placeholder',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nataniel Andrade',
  jobTitle: 'Master Coach Integral Sistêmico',
  description: 'Master Trainer Febracis especializado em coaching integral sistêmico, desenvolvimento pessoal e profissional.',
  url: 'https://natanielandrade.com.br',
  image: 'https://i.ytimg.com/vi/Z9GUL8TS6R4/mqdefault.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'São Luís',
    addressRegion: 'MA',
    addressCountry: 'BR',
  },
  sameAs: [
    'https://www.linkedin.com/in/nataniel-andrade-3a9aba182',
    'https://instagram.com/natanielandrad',
    'https://www.youtube.com/@natanielandrad',
  ],
  knowsAbout: [
    'Coaching Integral Sistêmico',
    'Desenvolvimento Pessoal',
    'Liderança',
    'Alta Performance',
    'Business Coaching',
    'Life Coaching',
  ],
  alumniOf: [
    {
      '@type': 'Organization',
      name: 'Universidade Ceuma',
    },
    {
      '@type': 'Organization', 
      name: 'Faculdade Estácio',
    },
  ],
  memberOf: {
    '@type': 'Organization',
    name: 'Febracis',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1A2E47" />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
