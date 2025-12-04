import { NextRequest, NextResponse } from 'next/server';
import { combineNames, CombineStyle } from '@/lib/name-combiner';

const VALID_STYLES: CombineStyle[] = ['balanced', 'cute', 'edgy', 'fantasy', 'brandable'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const name1 = (body.name1 || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    const name2 = (body.name2 || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    const name3 = body.name3 ? (body.name3 || '').trim().replace(/\s+/g, ' ').slice(0, 40) : null;
    const style: CombineStyle = VALID_STYLES.includes(body.style) ? body.style : 'balanced';
    
    if (!name1 || !name2) {
      return NextResponse.json(
        { error: 'Both Name 1 and Name 2 are required.' },
        { status: 400 }
      );
    }
    
    const result = combineNames(name1, name2, name3, style);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Name combiner error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
