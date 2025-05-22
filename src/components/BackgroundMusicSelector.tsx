
import React, { useState } from 'react';
import { VideoConfig } from '../pages/Index';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play, Pause, Volume2, Upload, VolumeX } from 'lucide-react';

interface BackgroundMusicSelectorProps {
  config: VideoConfig;
  updateConfig: (config: VideoConfig) => void;
  onNext: () => void;
}

export const BackgroundMusicSelector: React.FC<BackgroundMusicSelectorProps> = ({ config, updateConfig, onNext }) => {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  const musicCategories = [
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Professional business background music',
      icon: '🏢',
      tracks: [
        { id: 'corp-1', name: 'Inspiring Success', duration: '2:30', mood: 'Uplifting' },
        { id: 'corp-2', name: 'Professional Drive', duration: '3:15', mood: 'Motivational' },
        { id: 'corp-3', name: 'Business Excellence', duration: '2:45', mood: 'Confident' }
      ]
    },
    {
      id: 'calm',
      name: 'Calm & Peaceful',
      description: 'Relaxing ambient background music',
      icon: '🧘',
      tracks: [
        { id: 'calm-1', name: 'Peaceful Moments', duration: '4:20', mood: 'Serene' },
        { id: 'calm-2', name: 'Gentle Breeze', duration: '3:45', mood: 'Tranquil' },
        { id: 'calm-3', name: 'Mindful Journey', duration: '5:10', mood: 'Meditative' }
      ]
    },
    {
      id: 'upbeat',
      name: 'Upbeat & Energetic',
      description: 'High-energy music for dynamic content',
      icon: '⚡',
      tracks: [
        { id: 'upbeat-1', name: 'Electric Vibes', duration: '2:55', mood: 'Energetic' },
        { id: 'upbeat-2', name: 'Dynamic Force', duration: '3:20', mood: 'Powerful' },
        { id: 'upbeat-3', name: 'Pulse Drive', duration: '2:40', mood: 'Exciting' }
      ]
    },
    {
      id: 'tech',
      name: 'Technology',
      description: 'Modern electronic sounds for tech content',
      icon: '💻',
      tracks: [
        { id: 'tech-1', name: 'Digital Innovation', duration: '3:30', mood: 'Futuristic' },
        { id: 'tech-2', name: 'Code Symphony', duration: '2:25', mood: 'Progressive' },
        { id: 'tech-3', name: 'Cyber Flow', duration: '4:00', mood: 'Modern' }
      ]
    },
    {
      id: 'dramatic',
      name: 'Dramatic',
      description: 'Cinematic music for impactful storytelling',
      icon: '🎭',
      tracks: [
        { id: 'drama-1', name: 'Epic Journey', duration: '3:45', mood: 'Cinematic' },
        { id: 'drama-2', name: 'Rising Tension', duration: '2:15', mood: 'Suspenseful' },
        { id: 'drama-3', name: 'Heroic Moments', duration: '4:30', mood: 'Triumphant' }
      ]
    },
    {
      id: 'none',
      name: 'No Music',
      description: 'Voice only without background music',
      icon: '🔇',
      tracks: []
    }
  ];

  const updateMusicConfig = (updates: Partial<VideoConfig['backgroundMusic']>) => {
    updateConfig({
      ...config,
      backgroundMusic: {
        ...config.backgroundMusic,
        ...updates
      }
    });
  };

  const selectCategory = (categoryId: string) => {
    updateMusicConfig({ category: categoryId, track: '' });
  };

  const selectTrack = (trackId: string) => {
    updateMusicConfig({ track: trackId });
  };

  const playTrack = (trackId: string) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(trackId);
      // Simulate audio playback
      setTimeout(() => setPlayingTrack(null), 4000);
    }
  };

  const selectedCategory = musicCategories.find(cat => cat.id === config.backgroundMusic.category);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Background Music</h2>
        <p className="text-gray-300">Choose the perfect soundtrack to enhance your video's impact.</p>
      </div>

      {/* Category Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Music Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {musicCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => selectCategory(category.id)}
              className={`p-4 rounded-lg border text-center transition-all duration-200 ${
                config.backgroundMusic.category === category.id
                  ? 'border-purple-500 bg-purple-500/10 text-white'
                  : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-purple-400'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium mb-1">{category.name}</div>
              <div className="text-xs text-gray-400">{category.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Track Selection */}
      {selectedCategory && selectedCategory.tracks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Select Track</h3>
          <div className="space-y-3">
            {selectedCategory.tracks.map((track) => {
              const isSelected = config.backgroundMusic.track === track.id;
              const isPlaying = playingTrack === track.id;
              
              return (
                <div
                  key={track.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-600 bg-gray-800 hover:border-purple-400'
                  }`}
                  onClick={() => selectTrack(track.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          playTrack(track.id);
                        }}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      
                      <div>
                        <div className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                          {track.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {track.duration} • {track.mood}
                        </div>
                      </div>
                    </div>

                    {isPlaying && (
                      <div className="flex items-center space-x-2 text-green-400">
                        <Volume2 className="w-4 h-4" />
                        <div className="text-sm">Playing...</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Custom Upload */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Upload Custom Music</h3>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-300 mb-2">Upload Your Own Track</p>
          <p className="text-gray-500 text-sm">Drag and drop an MP3, WAV, or M4A file, or click to browse</p>
          <p className="text-gray-600 text-xs mt-1">Maximum file size: 50MB</p>
          <input type="file" className="hidden" accept=".mp3,.wav,.m4a" />
        </div>
      </div>

      {/* Volume Controls */}
      {config.backgroundMusic.category !== 'none' && (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Audio Balance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Background Music Volume</label>
                <span className="text-sm text-gray-400">{Math.round(config.backgroundMusic.volume * 100)}%</span>
              </div>
              <div className="flex items-center space-x-3">
                <VolumeX className="w-4 h-4 text-gray-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={config.backgroundMusic.volume}
                  onChange={(e) => updateMusicConfig({ volume: parseFloat(e.target.value) })}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <Volume2 className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Recommended: 20-40% for voiceover content
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Fade In</label>
                <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                  <option>No Fade</option>
                  <option selected>1 Second</option>
                  <option>2 Seconds</option>
                  <option>3 Seconds</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Fade Out</label>
                <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                  <option>No Fade</option>
                  <option selected>2 Seconds</option>
                  <option>3 Seconds</option>
                  <option>5 Seconds</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
        >
          <ArrowDown className="w-4 h-4 mr-2" />
          Preview Video
        </Button>
      </div>
    </div>
  );
};
