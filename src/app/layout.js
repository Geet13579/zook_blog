import CustomWrapper from '@components/CustomWrapper';
import FloatingActionBtn from './FloatingActionBtn';
import Navbar from './Navbar';
import './globals.css';
import { Mukta } from 'next/font/google';
import Script from 'next/script';
import CustomPopup from '@components/CustomPopup';

const mukta = Mukta({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: {
    default: 'The Hit | Your Source for the Latest Hits',
  },
  description: `Discover the latest hits in bollywood, sports, entertainment, and more at The Hit. Stay updated with the hottest trends and top news`,
  keywords: ['news', 'raipur', 'The Hit', 'latest news', 'top news'],
  metadataBase: new URL('https://www.thehit.in/'),
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
  openGraph: {
    title: 'The Hit | Your Source for the Latest Hits',
    description: `Discover the latest hits in bollywood, sports, entertainment, and more at The Hit. Stay updated with the hottest trends and top news`,
    url: 'https://www.thehit.in/',
    siteName: 'www.thehit.in',
    images: [
      {
        url: 'https://www.thehit.in/logo.png',
        // width: 800,
        // height: 600,
      },
    ],
    locale: 'hi',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Hit | Your Source for the Latest Hits',
    description: `Discover the latest hits in bollywood, sports, entertainment, and more at The Hit. Stay updated with the hottest trends and top news`,
    creator: '@thehit',
    images: ['logo.png'],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM}');
        `}
      </Script>
      <Script id="restrict-actions" strategy="afterInteractive">
        {`
      document.addEventListener('contextmenu', event => {
          event.preventDefault();
      });
      document.addEventListener("copy",(e) => {
          e.preventDefault();
        },
        false
      );
      `}
      </Script>
      <body className={mukta.className + ' md:grid grid-cols-12'}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM}`}
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <CustomWrapper className="relative">
          <Navbar />
          {children}
          <FloatingActionBtn />
        </CustomWrapper>

        {/* <CustomPopup /> */}
      </body>
    </html>
  );
}
