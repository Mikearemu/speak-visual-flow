
import React from 'react';
import { VideoConfig } from '../pages/Index';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play, Users, BookOpen, PenTool, Camera, Presentation } from 'lucide-react';

interface VideoTypeSelectorProps {
  config: VideoConfig;
  updateConfig: (config: VideoConfig) => void;
  onNext: () => void;
}

export const VideoTypeSelector: React.FC<VideoTypeSelectorProps> = ({ config, updateConfig, onNext }) => {
  const videoTypes = [
    {
      id: 'animated-explainer',
      title: 'Animated Explainer',
      description: 'Clean 2D animations perfect for educational content and product demos',
      icon: BookOpen,
      features: ['Professional animations', 'Custom graphics', 'Smooth transitions'],
      preview: '/api/placeholder/300/200',
      bestFor: 'Education, SaaS products, tutorials'
    },
    {
      id: 'realistic-avatar',
      title: 'Realistic Avatar',
      description: 'AI-generated human presenters for professional business content',
      icon: Users,
      features: ['Lifelike avatars', 'Natural expressions', 'Multiple ethnicities'],
      preview: '/api/placeholder/300/200',
      bestFor: 'Corporate training, news, presentations'
    },
    {
      id: 'whiteboard',
      title: 'Whiteboard Animation',
      description: 'Hand-drawn style animations that build concepts step by step',
      icon: PenTool,
      features: ['Hand-drawn style', 'Step-by-step reveals', 'Educational focus'],
      preview: '/api/placeholder/300/200',
      bestFor: 'Training, education, complex concepts'
    },
    {
      id: 'stock-footage',
      title: 'Stock Footage',
      description: 'High-quality video clips matched to your script content',
      icon: Camera,
      features: ['HD video clips', 'Auto-matching', 'Diverse content'],
      preview: '/api/placeholder/300/200',
      bestFor: 'Marketing, lifestyle, testimonials'
    },
    {
      id: 'slideshow',
      title: 'Slideshow Presentation',
      description: 'Professional slides with smooth transitions and animations',
      icon: Presentation,
      features: ['Professional templates', 'Data visualization', 'Clean layouts'],
      preview: '/api/placeholder/300/200',
      bestFor: 'Business reports, data presentations'
    }
  ];

  const selectVideoType = (typeId: string) => {
    updateConfig({
      ...config,
      videoType: typeId
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Video Style</h2>
        <p className="text-gray-300">Select the visual style that best matches your content and audience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videoTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = config.videoType === type.id;
          
          return (
            <div
              key={type.id}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20'
                  : 'border-gray-600 bg-gray-800 hover:border-purple-400 hover:bg-gray-700'
              }`}
              onClick={() => selectVideoType(type.id)}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}

              {/* Preview Image */}
              <div className="w-full h-32 bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <Icon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-500 text-sm">Preview</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-6 w-6 ${isSelected ? 'text-purple-400' : 'text-gray-400'}`} />
                  <h3 className="text-lg font-semibold text-white">{type.title}</h3>
                </div>

                <p className="text-gray-300 text-sm">{type.description}</p>

                <div className="space-y-2">
                  <div className="text-xs text-gray-400 font-medium">Features:</div>
                  <ul className="space-y-1">
                    {type.features.map((feature, index) => (
                      <li key={index} className="text-xs text-gray-400 flex items-center">
                        <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-gray-600">
                  <div className="text-xs text-gray-400">Best for: <span className="text-gray-300">{type.bestFor}</span></div>
                </div>
              </div>

              {/* Preview Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add preview functionality
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Preview Style
              </Button>
            </div>
          );
        })}
      </div>

      {/* Style Customization */}
      {config.videoType && (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Customize Style</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Color Scheme</label>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                <option>Professional Blue</option>
                <option>Modern Purple</option>
                <option>Corporate Gray</option>
                <option>Vibrant Rainbow</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Animation Speed</label>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                <option>Slow & Steady</option>
                <option>Medium Pace</option>
                <option>Fast & Dynamic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Quality</label>
              <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                <option>HD (720p)</option>
                <option>Full HD (1080p)</option>
                <option>4K (2160p)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {config.videoType && (
        <div className="flex justify-end">
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
          >
            <ArrowDown className="w-4 h-4 mr-2" />
            Choose Voice
          </Button>
        </div>
      )}
    </div>
  );
};
