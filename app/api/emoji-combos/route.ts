import { NextResponse } from 'next/server';
import emojiCombos from '@/data/emojiCombos.json';

export async function GET() {
  return NextResponse.json(emojiCombos);
}
