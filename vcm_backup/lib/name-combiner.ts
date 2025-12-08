export type CombineStyle = 'balanced' | 'cute' | 'edgy' | 'fantasy' | 'brandable';

interface CombineResult {
  baseNames: string[];
  style: CombineStyle;
  suggestions: string[];
}

function normalize(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '')
    .trim();
}

function toTitleCase(str: string): string {
  if (!str || str.length < 3) return '';
  const cleaned = str.replace(/[^a-z]/gi, '').toLowerCase();
  if (cleaned.length < 3) return '';
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function getVowelPositions(str: string): number[] {
  const vowels = 'aeiou';
  const positions: number[] = [];
  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      positions.push(i);
    }
  }
  return positions;
}

function halfAndHalfBlends(name1: string, name2: string): string[] {
  const results: string[] = [];
  const mid1 = Math.floor(name1.length / 2);
  const mid2 = Math.floor(name2.length / 2);
  
  if (mid1 > 0 && mid2 > 0) {
    results.push(name1.slice(0, mid1) + name2.slice(mid2));
    results.push(name2.slice(0, mid2) + name1.slice(mid1));
    results.push(name1.slice(0, mid1 + 1) + name2.slice(mid2));
    results.push(name2.slice(0, mid2 + 1) + name1.slice(mid1));
  }
  
  for (let i = 2; i <= 4; i++) {
    if (name1.length >= i && name2.length >= i) {
      results.push(name1.slice(0, i) + name2.slice(-i));
      results.push(name2.slice(0, i) + name1.slice(-i));
      results.push(name1.slice(0, i) + name2.slice(Math.floor(name2.length / 2)));
      results.push(name2.slice(0, i) + name1.slice(Math.floor(name1.length / 2)));
    }
  }
  
  results.push(name1.slice(0, 2) + name2);
  results.push(name2.slice(0, 2) + name1);
  results.push(name1 + name2.slice(-2));
  results.push(name2 + name1.slice(-2));
  
  if (name1.length >= 3 && name2.length >= 3) {
    results.push(name1.slice(0, 3) + name2.slice(-3));
    results.push(name2.slice(0, 3) + name1.slice(-3));
    results.push(name1 + name2.slice(-3));
    results.push(name2 + name1.slice(-3));
  }
  
  return results;
}

function overlapBlends(name1: string, name2: string): string[] {
  const results: string[] = [];
  
  for (let overlap = 1; overlap <= Math.min(3, name1.length, name2.length); overlap++) {
    const end1 = name1.slice(-overlap);
    const start2 = name2.slice(0, overlap);
    
    if (end1 === start2) {
      results.push(name1 + name2.slice(overlap));
    }
    
    const end2 = name2.slice(-overlap);
    const start1 = name1.slice(0, overlap);
    
    if (end2 === start1) {
      results.push(name2 + name1.slice(overlap));
    }
    
    if (end1[0] === start2[0]) {
      results.push(name1.slice(0, -overlap) + name2);
      results.push(name1 + name2.slice(overlap));
    }
  }
  
  return results;
}

function vowelBasedBlends(name1: string, name2: string): string[] {
  const results: string[] = [];
  const vowels1 = getVowelPositions(name1);
  const vowels2 = getVowelPositions(name2);
  
  if (vowels1.length > 0 && vowels2.length > 0) {
    const lastVowel1 = vowels1[vowels1.length - 1];
    const firstVowel2 = vowels2[0];
    
    if (lastVowel1 > 0) {
      results.push(name1.slice(0, lastVowel1) + name2.slice(firstVowel2));
      results.push(name1.slice(0, lastVowel1 + 1) + name2.slice(firstVowel2));
    }
    
    if (vowels1.length > 1) {
      const secondLastVowel1 = vowels1[vowels1.length - 2];
      results.push(name1.slice(0, secondLastVowel1 + 1) + name2.slice(firstVowel2));
    }
    
    if (vowels2.length > 1) {
      const secondVowel2 = vowels2[1];
      results.push(name1.slice(0, lastVowel1 + 1) + name2.slice(secondVowel2));
    }
    
    vowels1.forEach(pos1 => {
      vowels2.forEach(pos2 => {
        if (pos1 > 0 && pos2 < name2.length - 1) {
          results.push(name1.slice(0, pos1 + 1) + name2.slice(pos2));
        }
      });
    });
  }
  
  return results;
}

function syllableBlends(name1: string, name2: string): string[] {
  const results: string[] = [];
  const vowels = 'aeiou';
  
  function getSyllables(name: string): string[] {
    const syllables: string[] = [];
    let current = '';
    let hasVowel = false;
    
    for (let i = 0; i < name.length; i++) {
      current += name[i];
      if (vowels.includes(name[i])) {
        hasVowel = true;
      }
      if (hasVowel && i < name.length - 1 && !vowels.includes(name[i]) && vowels.includes(name[i + 1])) {
        syllables.push(current);
        current = '';
        hasVowel = false;
      }
    }
    if (current) syllables.push(current);
    return syllables;
  }
  
  const syl1 = getSyllables(name1);
  const syl2 = getSyllables(name2);
  
  if (syl1.length >= 1 && syl2.length >= 1) {
    results.push(syl1[0] + syl2[syl2.length - 1]);
    results.push(syl2[0] + syl1[syl1.length - 1]);
    
    if (syl1.length >= 2) {
      results.push(syl1.slice(0, 2).join('') + syl2[syl2.length - 1]);
    }
    if (syl2.length >= 2) {
      results.push(syl2.slice(0, 2).join('') + syl1[syl1.length - 1]);
    }
    
    results.push(syl1[0] + syl2.join(''));
    results.push(syl2[0] + syl1.join(''));
  }
  
  return results;
}

function letterInsertBlends(name1: string, name2: string): string[] {
  const results: string[] = [];
  const mid1 = Math.floor(name1.length / 2);
  const mid2 = Math.floor(name2.length / 2);
  
  results.push(name1.slice(0, mid1) + name2.slice(0, 2) + name1.slice(mid1));
  results.push(name2.slice(0, mid2) + name1.slice(0, 2) + name2.slice(mid2));
  
  results.push(name1.slice(0, mid1) + name2.slice(-2) + name1.slice(mid1));
  results.push(name2.slice(0, mid2) + name1.slice(-2) + name2.slice(mid2));
  
  return results;
}

function threeNameBlends(name1: string, name2: string, name3: string): string[] {
  const results: string[] = [];
  
  for (let len = 2; len <= 3; len++) {
    const l1 = Math.min(len, name1.length);
    const l2 = Math.min(len, name2.length);
    const l3 = Math.min(len, name3.length);
    
    results.push(name1.slice(0, l1) + name2.slice(0, l2) + name3.slice(0, l3));
    results.push(name1.slice(0, l1) + name3.slice(0, l3) + name2.slice(0, l2));
    results.push(name2.slice(0, l2) + name1.slice(0, l1) + name3.slice(0, l3));
    results.push(name3.slice(0, l3) + name2.slice(0, l2) + name1.slice(0, l1));
  }
  
  const mid1 = Math.floor(name1.length / 2);
  const mid2 = Math.floor(name2.length / 2);
  const mid3 = Math.floor(name3.length / 2);
  
  results.push(name1.slice(0, mid1) + name2.slice(mid2) + name3.slice(-2));
  results.push(name1.slice(0, 2) + name2.slice(mid2) + name3.slice(-2));
  results.push(name1.slice(0, mid1) + name3.slice(0, 2) + name2.slice(-2));
  
  return results;
}

function applyStyleVariation(name: string, style: CombineStyle): string[] {
  if (!name || name.length < 2) return [];
  
  const results: string[] = [name];
  
  switch (style) {
    case 'cute':
      const cuteSuffixes = ['y', 'ie', 'kins', 'boo', 'oo', 'ey', 'sy', 'sie', 'poo'];
      cuteSuffixes.forEach(suffix => {
        let base = name;
        if (name.endsWith('y') || name.endsWith('e') || name.endsWith('i')) {
          base = name.slice(0, -1);
        }
        if (base.length >= 2) {
          results.push(base + suffix);
        }
      });
      break;
      
    case 'edgy':
      const edgySuffixes = ['x', 'yx', 'zor', 'rix', 'vex', 'ax', 'ix', 'ox', 'zen', 'xis'];
      edgySuffixes.forEach(suffix => {
        let base = name;
        if ('aeiou'.includes(name.slice(-1))) {
          base = name.slice(0, -1);
        }
        if (base.length >= 2) {
          results.push(base + suffix);
        }
      });
      break;
      
    case 'fantasy':
      const fantasySuffixes = ['riel', 'dor', 'thos', 'wyn', 'iel', 'oria', 'ius', 'ara', 'eon', 'alis', 'wen', 'thor'];
      fantasySuffixes.forEach(suffix => {
        let base = name;
        if (name.length > 3 && 'aeiou'.includes(name.slice(-1))) {
          base = name.slice(0, -1);
        }
        if (base.length >= 2) {
          results.push(base + suffix);
        }
      });
      break;
      
    case 'brandable':
      results.push(name);
      if (name.length > 6) {
        results.push(name.slice(0, 6));
        results.push(name.slice(0, 5));
        results.push(name.slice(0, 4));
      }
      const vowels = 'aeiou';
      let compressed = '';
      let lastWasVowel = false;
      for (const char of name) {
        const isVowel = vowels.includes(char);
        if (!isVowel || !lastWasVowel) {
          compressed += char;
        }
        lastWasVowel = isVowel;
      }
      if (compressed.length >= 3 && compressed !== name) {
        results.push(compressed);
      }
      const brandSuffixes = ['ly', 'io', 'fy', 'go', 'it', 'up'];
      brandSuffixes.forEach(suffix => {
        if (name.length >= 3 && name.length <= 5) {
          results.push(name + suffix);
        }
      });
      break;
      
    case 'balanced':
    default:
      break;
  }
  
  return results;
}

function generateFallbackNames(name1: string, name2: string, style: CombineStyle): string[] {
  const results: string[] = [];
  
  const simpleCombos = [
    name1 + name2,
    name2 + name1,
    name1.slice(0, Math.ceil(name1.length / 2)) + name2,
    name2.slice(0, Math.ceil(name2.length / 2)) + name1,
    name1 + name2.slice(Math.floor(name2.length / 2)),
    name2 + name1.slice(Math.floor(name1.length / 2)),
  ];
  
  simpleCombos.forEach(combo => {
    results.push(...applyStyleVariation(combo, style));
  });
  
  for (let i = 1; i <= Math.min(3, name1.length - 1); i++) {
    for (let j = 1; j <= Math.min(3, name2.length - 1); j++) {
      results.push(name1.slice(0, i) + name2.slice(j));
      results.push(name2.slice(0, j) + name1.slice(i));
    }
  }
  
  return results;
}

function generateShortNameFallbacks(name1: string, name2: string, style: CombineStyle): string[] {
  const results: string[] = [];
  
  const connectors = ['a', 'e', 'i', 'o', 'u', 'ar', 'el', 'an', 'or', 'en', 'er', 'al', 'in'];
  connectors.forEach(conn => {
    results.push(name1 + conn + name2);
    results.push(name2 + conn + name1);
  });
  
  const prefixes = ['la', 'le', 'lo', 'ra', 're', 'ro', 'ma', 'me', 'mi', 'na', 'ne', 'ni', 'sa', 'se', 'si', 'ta', 'te', 'ti'];
  prefixes.forEach(pre => {
    results.push(pre + name1 + name2.slice(-1));
    results.push(pre + name2 + name1.slice(-1));
    results.push(name1 + pre);
    results.push(name2 + pre);
  });
  
  const suffixes = ['ia', 'io', 'ius', 'an', 'en', 'on', 'el', 'al', 'ar', 'er', 'or', 'ix', 'ax', 'ex'];
  suffixes.forEach(suf => {
    results.push(name1 + name2 + suf);
    results.push(name2 + name1 + suf);
  });
  
  results.push(name1 + name1[0] + name2);
  results.push(name2 + name2[0] + name1);
  results.push(name1[0] + name2 + name1);
  results.push(name2[0] + name1 + name2);
  
  results.push(name1 + name2 + name1[name1.length - 1]);
  results.push(name2 + name1 + name2[name2.length - 1]);
  
  const combos: string[] = [];
  results.forEach(r => {
    combos.push(...applyStyleVariation(r, style));
  });
  
  return combos;
}

export function combineNames(
  name1: string,
  name2: string,
  name3: string | null,
  style: CombineStyle
): CombineResult {
  const n1 = normalize(name1);
  const n2 = normalize(name2);
  const n3 = name3 ? normalize(name3) : null;
  
  const baseNames = [name1.trim(), name2.trim()];
  if (name3?.trim()) {
    baseNames.push(name3.trim());
  }
  
  if (!n1 || !n2 || n1.length < 2 || n2.length < 2) {
    return { baseNames, style, suggestions: [] };
  }
  
  let allBlends: string[] = [];
  
  allBlends.push(...halfAndHalfBlends(n1, n2));
  allBlends.push(...overlapBlends(n1, n2));
  allBlends.push(...vowelBasedBlends(n1, n2));
  allBlends.push(...vowelBasedBlends(n2, n1));
  allBlends.push(...syllableBlends(n1, n2));
  allBlends.push(...syllableBlends(n2, n1));
  allBlends.push(...letterInsertBlends(n1, n2));
  
  if (n3 && n3.length >= 2) {
    allBlends.push(...threeNameBlends(n1, n2, n3));
    allBlends.push(...threeNameBlends(n2, n1, n3));
    allBlends.push(...threeNameBlends(n1, n3, n2));
    allBlends.push(...threeNameBlends(n3, n1, n2));
  }
  
  let styledBlends: string[] = [];
  allBlends.forEach(blend => {
    if (blend && blend.length >= 2) {
      styledBlends.push(...applyStyleVariation(blend, style));
    }
  });
  
  let formatted = styledBlends
    .map(toTitleCase)
    .filter(name => name && name.length >= 3 && name.length <= 20)
    .filter((name, index, self) => self.indexOf(name) === index);
  
  if (formatted.length < 20) {
    const fallbacks = generateFallbackNames(n1, n2, style);
    const formattedFallbacks = fallbacks
      .map(toTitleCase)
      .filter(name => name && name.length >= 3 && name.length <= 20)
      .filter(name => !formatted.includes(name));
    formatted.push(...formattedFallbacks);
  }
  
  if (formatted.length < 20 && (n1.length <= 3 || n2.length <= 3)) {
    const shortFallbacks = generateShortNameFallbacks(n1, n2, style);
    const formattedShort = shortFallbacks
      .map(toTitleCase)
      .filter(name => name && name.length >= 3 && name.length <= 20)
      .filter(name => !formatted.includes(name));
    formatted.push(...formattedShort);
  }
  
  formatted = formatted.filter((name, index, self) => self.indexOf(name) === index);
  
  for (let i = formatted.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [formatted[i], formatted[j]] = [formatted[j], formatted[i]];
  }
  
  const suggestions = formatted.slice(0, 20);
  
  return { baseNames, style, suggestions };
}
