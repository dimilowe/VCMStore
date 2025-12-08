import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { combo, label } = await request.json();

    if (!combo || typeof combo !== 'string' || combo.trim().length === 0) {
      return NextResponse.json(
        { error: 'Combo is required' },
        { status: 400 }
      );
    }

    const trimmedCombo = combo.trim();
    const trimmedLabel = label?.trim() || null;

    if (trimmedCombo.length > 50) {
      return NextResponse.json(
        { error: 'Combo is too long (max 50 characters)' },
        { status: 400 }
      );
    }

    const existingResult = await query(
      'SELECT id FROM user_emoji_combos WHERE combo = $1',
      [trimmedCombo]
    );

    if (existingResult.rows.length > 0) {
      return NextResponse.json(
        { error: 'This combo already exists in the library', duplicate: true },
        { status: 409 }
      );
    }

    const emojiCombos = await import('@/data/emojiCombos.json');
    const premadeExists = emojiCombos.default.some(
      (c: { combo: string }) => c.combo === trimmedCombo
    );

    if (premadeExists) {
      return NextResponse.json(
        { error: 'This combo already exists in the library', duplicate: true },
        { status: 409 }
      );
    }

    const result = await query(
      'INSERT INTO user_emoji_combos (combo, label, category) VALUES ($1, $2, $3) RETURNING id, combo, label, category, created_at',
      [trimmedCombo, trimmedLabel, 'community']
    );

    return NextResponse.json({
      success: true,
      combo: result.rows[0],
      message: 'Combo added to the library!'
    });
  } catch (error) {
    console.error('Failed to submit combo:', error);
    return NextResponse.json(
      { error: 'Failed to submit combo' },
      { status: 500 }
    );
  }
}
