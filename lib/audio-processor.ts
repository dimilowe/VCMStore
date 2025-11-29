import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import crypto from 'crypto';

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

const TAGS_DIR = path.join(process.cwd(), 'public', 'tags');
const TAG_CACHE_DIR = path.join(process.cwd(), 'public', 'tag_cache');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'output');

[TAGS_DIR, TAG_CACHE_DIR, OUTPUT_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const VOICE_MAP: Record<string, string> = {
  'female_soft': 'nova',
  'male_hype': 'onyx',
  'robotic': 'fable',
  'female_warm': 'shimmer',
  'male_deep': 'echo',
  'alloy': 'alloy'
};

export async function getAudioDuration(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) reject(err);
      else resolve(metadata.format.duration || 0);
    });
  });
}

export async function getOrCreateTagVoice(phrase: string, voiceId: string): Promise<string> {
  const normalized = phrase.trim().toLowerCase();
  const hash = crypto.createHash('sha1').update(`${voiceId}:${normalized}`).digest('hex');
  const cachedPath = path.join(TAG_CACHE_DIR, `${hash}.mp3`);

  if (fs.existsSync(cachedPath)) {
    console.log(`Cache hit for tag: ${phrase}`);
    return cachedPath;
  }

  console.log(`Cache miss for tag: ${phrase}, generating with OpenAI TTS...`);
  
  const voice = VOICE_MAP[voiceId] || 'nova';
  
  try {
    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice as any,
      input: phrase,
      response_format: 'mp3'
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(cachedPath, buffer);
    console.log(`Generated and cached tag: ${cachedPath}`);
    
    return cachedPath;
  } catch (error) {
    console.error('OpenAI TTS error:', error);
    throw new Error('Failed to generate custom voice tag');
  }
}

export async function processAudioWithTag(
  inputPath: string,
  tagPath: string,
  intervalSeconds: number = 15,
  tagVolumeDb: number = -5
): Promise<string> {
  const outputFilename = `output_${uuidv4()}.mp3`;
  const outputPath = path.join(OUTPUT_DIR, outputFilename);

  const duration = await getAudioDuration(inputPath);
  console.log(`Processing audio: duration=${duration}s, interval=${intervalSeconds}s`);

  const timestamps: number[] = [];
  for (let t = 2; t < duration; t += intervalSeconds) {
    timestamps.push(t);
  }

  if (timestamps.length === 0) {
    timestamps.push(Math.min(2, duration / 2));
  }

  console.log(`Tag timestamps: ${timestamps.join(', ')}`);

  return new Promise((resolve, reject) => {
    const tagDelays = timestamps.map((ts, i) => 
      `[tag]adelay=${Math.floor(ts * 1000)}|${Math.floor(ts * 1000)}[delayed${i}]`
    ).join(';');
    
    const mixInputs = timestamps.map((_, i) => `[delayed${i}]`).join('');
    
    let filterComplex: string;
    
    if (timestamps.length === 1) {
      filterComplex = `[1:a]volume=${tagVolumeDb}dB[tag];${tagDelays};[0:a][delayed0]amix=inputs=2:duration=first:dropout_transition=2[out]`;
    } else {
      filterComplex = `[1:a]volume=${tagVolumeDb}dB[tag];${tagDelays};${mixInputs}amix=inputs=${timestamps.length}:duration=longest:normalize=0[alltags];[0:a][alltags]amix=inputs=2:duration=first:dropout_transition=2[out]`;
    }

    ffmpeg()
      .input(inputPath)
      .input(tagPath)
      .complexFilter(filterComplex)
      .outputOptions(['-map', '[out]'])
      .audioCodec('libmp3lame')
      .audioBitrate('192k')
      .output(outputPath)
      .on('start', (cmd) => {
        console.log('FFmpeg started:', cmd);
      })
      .on('error', (err) => {
        console.error('FFmpeg error:', err);
        reject(err);
      })
      .on('end', () => {
        console.log('FFmpeg processing complete');
        resolve(outputFilename);
      })
      .run();
  });
}

export function getDefaultTagPath(tagName: string): string {
  const tagMap: Record<string, string> = {
    'vcmsuite': 'vcmsuite.mp3',
    'vcmsuite_dot_com': 'vcmsuite_dot_com.mp3'
  };
  
  const filename = tagMap[tagName] || 'vcmsuite.mp3';
  return path.join(TAGS_DIR, filename);
}

export function cleanupFile(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Failed to cleanup file:', error);
  }
}
