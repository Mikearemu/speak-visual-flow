
import React, { useState } from 'react';
import { VideoConfig } from '../pages/Index';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play, Volume2, Pause } from 'lucide-react';

interface VoiceoverSelectorProps {
  config: VideoConfig;
  updateConfig: (config: VideoConfig) => void;
  onNext: () => void;
}

export const VoiceoverSelector: React.FC<VoiceoverSelectorProps> = ({ config, updateConfig, onNext }) => {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' }
  ];

  const voices = [
    {
      id: 'aria',
      name: 'Aria',
      gender: 'female',
      emotion: 'professional',
      description: 'Clear, professional female voice perfect for business content',
      preview: 'Sample: Welcome to our platform. This is Aria speaking in a professional tone.'
    },
    {
      id: 'sarah',
      name: 'Sarah',
      gender: 'female', 
      emotion: 'friendly',
      description: 'Warm, friendly female voice ideal for educational content',
      preview: 'Sample: Hi there! I\'m Sarah, and I\'m excited to share this with you today.'
    },
    {
      id: 'brian',
      name: 'Brian',
      gender: 'male',
      emotion: 'professional',
      description: 'Deep, authoritative male voice for corporate presentations',
      preview: 'Sample: Good morning. I\'m Brian, and I\'ll be presenting today\'s content.'
    },
    {
      id: 'daniel',
      name: 'Daniel',
      gender: 'male',
      emotion: 'casual',
      description: 'Relaxed, conversational male voice for informal content',
      preview: 'Sample: Hey everyone! Daniel here, ready to walk you through this together.'
    },
    {
      id: 'charlotte',
      name: 'Charlotte',
      gender: 'female',
      emotion: 'energetic',
      description: 'Upbeat, energetic female voice for marketing content',
      preview: 'Sample: Welcome! I\'m Charlotte, and I can\'t wait to show you what\'s possible!'
    },
    {
      id: 'will',
      name: 'Will',
      gender: 'male',
      emotion: 'calm',
      description: 'Soothing, calm male voice perfect for meditation or wellness',
      preview: 'Sample: Hello, I\'m Will. Take a moment to relax as we explore this together.'
    }
  ];

  const emotions = [
    { id: 'professional', name: 'Professional', description: 'Clear and authoritative' },
    { id: 'friendly', name: 'Friendly', description: 'Warm and approachable' },
    { id: 'energetic', name: 'Energetic', description: 'Upbeat and exciting' },
    { id: 'calm', name: 'Calm', description: 'Soothing and relaxed' },
    { id: 'casual', name: 'Casual', description: 'Conversational and natural' }
  ];

  const updateVoiceConfig = (updates: Partial<VideoConfig['voice']>) => {
    updateConfig({
      ...config,
      voice: {
        ...config.voice,
        ...updates
      }
    });
  };

  const playVoicePreview = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      // Simulate audio playback
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  const filteredVoices = voices.filter(voice => 
    voice.emotion === config.voice.emotion || config.voice.emotion === 'all'
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Voice</h2>
        <p className="text-gray-300">Select the perfect voice for your video content and audience.</p>
      </div>

      {/* Language Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Language</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => updateVoiceConfig({ language: lang.code })}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                config.voice.language === lang.code
                  ? 'border-purple-500 bg-purple-500/10 text-white'
                  : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-purple-400'
              }`}
            >
              <div className="text-2xl mb-1">{lang.flag}</div>
              <div className="text-sm font-medium">{lang.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Emotion/Style Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Voice Style</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {emotions.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => updateVoiceConfig({ emotion: emotion.id })}
              className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                config.voice.emotion === emotion.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-600 bg-gray-800 hover:border-purple-400'
              }`}
            >
              <div className={`font-medium mb-1 ${
                config.voice.emotion === emotion.id ? 'text-white' : 'text-gray-300'
              }`}>
                {emotion.name}
              </div>
              <div className="text-xs text-gray-400">{emotion.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Voice Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Choose Voice</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVoices.map((voice) => {
            const isSelected = config.voice.voiceId === voice.id;
            const isPlaying = playingVoice === voice.id;
            
            return (
              <div
                key={voice.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-gray-600 bg-gray-800 hover:border-purple-400'
                }`}
                onClick={() => updateVoiceConfig({ voiceId: voice.id, gender: voice.gender })}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      voice.gender === 'female' ? 'bg-pink-500/20 text-pink-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {voice.gender === 'female' ? '♀' : '♂'}
                    </div>
                    <div>
                      <div className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                        {voice.name}
                      </div>
                      <div className="text-xs text-gray-400 capitalize">
                        {voice.gender} • {voice.emotion}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      playVoicePreview(voice.id);
                    }}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>

                <p className="text-gray-400 text-sm mb-2">{voice.description}</p>
                
                <div className="text-xs text-gray-500 italic bg-gray-700 p-2 rounded">
                  "{voice.preview}"
                </div>

                {isPlaying && (
                  <div className="mt-2 flex items-center space-x-2 text-green-400">
                    <Volume2 className="w-4 h-4" />
                    <div className="text-sm">Playing preview...</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Voice Settings */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Voice Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Speech Speed</label>
            <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
              <option>Slow (0.8x)</option>
              <option selected>Normal (1.0x)</option>
              <option>Fast (1.2x)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Pitch</label>
            <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
              <option>Low</option>
              <option selected>Normal</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Emphasis</label>
            <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
              <option>Subtle</option>
              <option selected>Normal</option>
              <option>Strong</option>
            </select>
          </div>
        </div>
      </div>

      {config.voice.voiceId && (
        <div className="flex justify-end">
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
          >
            <ArrowDown className="w-4 h-4 mr-2" />
            Add Background Music
          </Button>
        </div>
      )}
    </div>
  );
};
