'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  postId: number;
}

export function AudioPlayer({ postId }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState<string>('nova');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speeds = [1, 1.25, 1.5, 2];
  const voices = [
    { id: 'nova', name: 'Nova', description: 'Natural, warm female' },
    { id: 'alloy', name: 'Alloy', description: 'Balanced, neutral' },
    { id: 'echo', name: 'Echo', description: 'Clear male' },
    { id: 'fable', name: 'Fable', description: 'Expressive British' },
    { id: 'onyx', name: 'Onyx', description: 'Deep male' },
    { id: 'shimmer', name: 'Shimmer', description: 'Bright female' },
  ];

  const loadAudio = async (voice?: string) => {
    const voiceToUse = voice || selectedVoice;
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/blog/tts/${postId}?voice=${voiceToUse}`);
      
      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }
      
      const data = await response.json();
      setAudioUrl(data.audioUrl);
      
    } catch (err) {
      setError('Failed to load audio');
      console.error('Audio loading error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceChange = async (newVoice: string) => {
    // Pause current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setSelectedVoice(newVoice);
    setIsPlaying(false);
    
    // Reset and reload audio with new voice
    setAudioUrl(null);
    setCurrentTime(0);
    setDuration(0);
    
    // Pass the new voice directly to avoid state timing issues
    await loadAudio(newVoice);
  };

  const togglePlayPause = async () => {
    if (!audioUrl) {
      await loadAudio();
      return;
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.error('Playback failed:', err);
          setError('Playback failed. Please try again.');
          setIsPlaying(false);
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      
      // Defensive check: If duration wasn't set during metadata load,
      // try to get it now during playback
      if (duration === 0) {
        const audioDuration = audioRef.current.duration;
        if (isFinite(audioDuration) && audioDuration > 0) {
          setDuration(audioDuration);
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const audioDuration = audioRef.current.duration;
      
      // Only set duration if it's a valid finite number
      // Streamed MP3s sometimes report NaN or Infinity initially
      if (isFinite(audioDuration) && audioDuration > 0) {
        setDuration(audioDuration);
      }
      
      // Apply the current playback speed when audio is ready
      audioRef.current.playbackRate = playbackSpeed;
    }
  };

  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    // Don't reset currentTime to 0 - some browsers treat this as a seek
    // and auto-restart playback. Leave it at the end position.
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeSpeed = () => {
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    setPlaybackSpeed(newSpeed);
    
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
      console.log(`Playback speed changed to ${newSpeed}x`);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [audioUrl, playbackSpeed]);

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-4">
        <Volume2 className="w-6 h-6 text-yellow-600" />
        <div className="flex-1">
          <h3 className="font-semibold text-stone-900 mb-1">Listen to Article</h3>
          <p className="text-sm text-stone-600">
            {duration > 0 ? `${formatTime(duration)} • ` : ''}Premium AI narration
          </p>
        </div>
        
        <Button
          onClick={togglePlayPause}
          disabled={isLoading}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Loading...
            </>
          ) : isPlaying ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Play
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-4">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Voice
        </label>
        <select
          value={selectedVoice}
          onChange={(e) => handleVoiceChange(e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-white border-2 border-yellow-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {voices.map((voice) => (
            <option key={voice.id} value={voice.id}>
              {voice.name} - {voice.description}
            </option>
          ))}
        </select>
        {audioUrl && (
          <p className="mt-1 text-xs text-stone-500">
            Changing voice will reload the audio
          </p>
        )}
      </div>

      {audioUrl && (
        <>
          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
          />
          
          <div className="mt-4 space-y-2">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
            
            <div className="flex items-center justify-between text-sm text-stone-600">
              <span>{formatTime(currentTime)}</span>
              <button
                onClick={changeSpeed}
                className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 rounded-full text-yellow-700 font-medium transition-colors"
              >
                {playbackSpeed}x
              </button>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
