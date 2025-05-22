
import React from 'react';
import { VideoConfig } from '../pages/Index';
import { Button } from '@/components/ui/button';
import { Play, Download, Share2, Edit, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface VideoPreviewProps {
  config: VideoConfig;
  updateConfig: (config: VideoConfig) => void;
  onNext: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  generatedVideo: string | null;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ 
  config, 
  updateConfig, 
  onNext, 
  onGenerate, 
  isGenerating, 
  generatedVideo 
}) => {
  const generationSteps = [
    { id: 1, name: 'Processing Script', description: 'Analyzing your content...', status: 'completed' },
    { id: 2, name: 'Generating Voiceover', description: 'Creating AI speech...', status: isGenerating ? 'current' : generatedVideo ? 'completed' : 'pending' },
    { id: 3, name: 'Creating Visuals', description: 'Rendering video elements...', status: isGenerating ? 'pending' : generatedVideo ? 'completed' : 'pending' },
    { id: 4, name: 'Adding Music', description: 'Mixing audio tracks...', status: generatedVideo ? 'completed' : 'pending' },
    { id: 5, name: 'Final Rendering', description: 'Exporting your video...', status: generatedVideo ? 'completed' : 'pending' }
  ];

  const getStepStatus = (step: any) => {
    if (step.status === 'completed') return 'completed';
    if (step.status === 'current') return 'current';
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'current':
        return <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Preview & Generate</h2>
        <p className="text-gray-300">Review your configuration and generate your video.</p>
      </div>

      {/* Configuration Summary */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Video Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Script Preview</label>
              <div className="mt-1 p-3 bg-gray-700 rounded border border-gray-600 text-gray-300 text-sm max-h-32 overflow-y-auto">
                {config.script || 'No script provided'}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300">Video Type</label>
              <div className="mt-1 p-3 bg-gray-700 rounded border border-gray-600 text-gray-300 text-sm">
                {config.videoType ? config.videoType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not selected'}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Voice Settings</label>
              <div className="mt-1 p-3 bg-gray-700 rounded border border-gray-600 text-gray-300 text-sm">
                <div>Voice: {config.voice.voiceId || 'Not selected'}</div>
                <div>Language: {config.voice.language}</div>
                <div>Style: {config.voice.emotion}</div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300">Background Music</label>
              <div className="mt-1 p-3 bg-gray-700 rounded border border-gray-600 text-gray-300 text-sm">
                {config.backgroundMusic.category === 'none' 
                  ? 'No background music' 
                  : `${config.backgroundMusic.category} - ${config.backgroundMusic.track || 'Auto-select'}`}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <Edit className="w-4 h-4 mr-2" />
            Edit Configuration
          </Button>
        </div>
      </div>

      {/* Video Preview Area */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Video Preview</h3>
        
        <div className="aspect-video bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center mb-4">
          {generatedVideo ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10 text-green-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Video Ready!</h4>
              <p className="text-gray-400 text-sm">Click to play your generated video</p>
            </div>
          ) : isGenerating ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
              </div>
              <h4 className="text-white font-semibold mb-2">Generating Video...</h4>
              <p className="text-gray-400 text-sm">This may take a few minutes</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10 text-gray-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Ready to Generate</h4>
              <p className="text-gray-400 text-sm">Click the button below to create your video</p>
            </div>
          )}
        </div>

        {!generatedVideo && !isGenerating && (
          <div className="text-center">
            <Button 
              onClick={onGenerate}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3"
              disabled={!config.script || !config.videoType}
            >
              <Play className="w-5 h-5 mr-2" />
              Generate Video
            </Button>
          </div>
        )}

        {generatedVideo && (
          <div className="flex justify-center space-x-3">
            <Button 
              onClick={onNext}
              className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Download & Share
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Edit className="w-4 h-4 mr-2" />
              Make Changes
            </Button>
          </div>
        )}
      </div>

      {/* Generation Progress */}
      {(isGenerating || generatedVideo) && (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Generation Progress</h3>
          
          <div className="space-y-4">
            {generationSteps.map((step) => {
              const status = getStepStatus(step);
              
              return (
                <div key={step.id} className="flex items-center space-x-4">
                  {getStatusIcon(status)}
                  <div className="flex-1">
                    <div className={`font-medium ${
                      status === 'completed' ? 'text-green-400' : 
                      status === 'current' ? 'text-purple-400' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </div>
                    <div className="text-gray-500 text-sm">{step.description}</div>
                  </div>
                  {status === 'current' && (
                    <div className="text-purple-400 text-sm font-medium">In Progress...</div>
                  )}
                  {status === 'completed' && (
                    <div className="text-green-400 text-sm font-medium">Complete</div>
                  )}
                </div>
              );
            })}
          </div>

          {isGenerating && (
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
              <div className="flex items-center space-x-2 text-blue-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Estimated time remaining: 2-3 minutes</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
