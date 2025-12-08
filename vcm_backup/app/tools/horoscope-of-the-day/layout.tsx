import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Horoscope of the Day — Brutally Honest AI Daily Horoscope (Free)',
  description: 'Get your real AF horoscope of the day. Choose your zodiac sign and let our brutally honest AI generator give you today\'s no-BS reading. Free daily horoscope.',
  keywords: 'horoscope of the day, daily horoscope, zodiac horoscope, free horoscope, AI horoscope, brutally honest horoscope',
  openGraph: {
    title: 'Horoscope of the Day — Brutally Honest AI Daily Horoscope',
    description: 'Get your real AF horoscope of the day. Choose your zodiac sign and let our brutally honest AI generator give you today\'s no-BS reading.',
    type: 'website',
  },
};

export default function HoroscopeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
