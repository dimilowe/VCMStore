import { NextResponse } from 'next/server';
import emojiCombos from '@/data/emojiCombos.json';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const userCombosResult = await query(
      'SELECT id, combo, label, category FROM user_emoji_combos ORDER BY created_at DESC'
    );

    const userCombos = userCombosResult.rows.map((row, index) => ({
      id: 1000 + index,
      combo: row.combo,
      label: row.label || 'Community combo',
      category: 'community',
      tags: ['community', 'user-created'],
    }));

    const allCombos = [...emojiCombos, ...userCombos];

    return NextResponse.json(allCombos);
  } catch (error) {
    console.error('Failed to fetch user combos:', error);
    return NextResponse.json(emojiCombos);
  }
}
