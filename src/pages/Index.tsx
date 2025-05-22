
import React, { useState } from 'react';
import { ScriptInput } from '../components/ScriptInput';
import { VideoTypeSelector } from '../components/VideoTypeSelector';
import { VoiceoverSelector } from '../components/VoiceoverSelector';
import { BackgroundMusicSelector } from '../components/BackgroundMusicSelector';
import { VideoPreview } from '../components/VideoPreview';
import { ExportOptions } from '../components/ExportOptions';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Play, Video } from 'lucide-react';

export type VideoConfig = {
  script: string;
  videoType: string;
  voice: {
    language: string;
    gender: string;
    emotion: string;
    voiceId: string;
  };
  backgroundMusic: {
    category: string;
    track: string;
    volume: number;
  };
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [videoConfig, setVideoConfig] = useState<VideoConfig>({
    script: '',
    videoType: '',
    voice: {
      language: 'en',
      gender: 'female',
      emotion: 'professional',
      voiceId: 'aria'
    },
    backgroundMusic: {
      category: 'corporate',
      track: '',
      volume: 0.3
    }
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const steps = [
    { id: 1, title: 'Script', component: ScriptInput },
    { id: 2, title: 'Video Type', component: VideoTypeSelector },
    { id: 3, title: 'Voiceover', component: VoiceoverSelector },
    { id: 4, title: 'Background', component: BackgroundMusicSelector },
    { id: 5, title: 'Preview', component: VideoPreview },
    { id: 6, title: 'Export', component: ExportOptions }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateVideo = async () => {
    setIsGenerating(true);
    // Simulate video generation
    setTimeout(() => {
      setGeneratedVideo('sample-video.mp4');
      setIsGenerating(false);
      if (currentStep < 6) setCurrentStep(6);
    }, 3000);
  };

  const CurrentComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">AI Video Studio</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Script to Video in Minutes</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg' 
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {step.id}
                </div>
                <span className={`ml-2 font-medium whitespace-nowrap ${
                  currentStep >= step.id ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-purple-500' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Step Component */}
          <div className="lg:col-span-2">
            <div className="bg-black/20 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <CurrentComponent 
                config={videoConfig} 
                updateConfig={setVideoConfig}
                onNext={nextStep}
                isGenerating={isGenerating}
                generatedVideo={generatedVideo}
                onGenerate={generateVideo}
              />
            </div>
          </div>

          {/* Configuration Summary */}
          <div className="lg:col-span-1">
            <div className="bg-black/20 backdrop-blur-sm border border-gray-700 rounded-xl p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-white mb-4">Configuration</h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <label className="text-gray-300 font-medium">Script</label>
                  <p className="text-gray-400 mt-1">
                    {videoConfig.script ? `${videoConfig.script.substring(0, 100)}...` : 'Not set'}
                  </p>
                </div>

                <div>
                  <label className="text-gray-300 font-medium">Video Type</label>
                  <p className="text-gray-400 mt-1">
                    {videoConfig.videoType || 'Not selected'}
                  </p>
                </div>

                <div>
                  <label className="text-gray-300 font-medium">Voice</label>
                  <p className="text-gray-400 mt-1">
                    {`${videoConfig.voice.gender} ${videoConfig.voice.language} (${videoConfig.voice.emotion})`}
                  </p>
                </div>

                <div>
                  <label className="text-gray-300 font-medium">Background Music</label>
                  <p className="text-gray-400 mt-1">
                    {videoConfig.backgroundMusic.track || videoConfig.backgroundMusic.category || 'None'}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-6 space-y-3">
                {currentStep < 5 && (
                  <Button 
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
                    disabled={!videoConfig.script && currentStep === 1}
                  >
                    <ArrowDown className="w-4 h-4 mr-2" />
                    Next Step
                  </Button>
                )}
                
                {currentStep === 5 && !generatedVideo && (
                  <Button 
                    onClick={generateVideo}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    disabled={isGenerating}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate Video'}
                  </Button>
                )}

                {currentStep > 1 && (
                  <Button 
                    onClick={prevStep}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <ArrowUp className="w-4 h-4 mr-2" />
                    Previous Step
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
