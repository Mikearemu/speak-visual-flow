
import React, { useState } from 'react';
import { ScriptInput } from '../components/ScriptInput';
import { VideoTypeSelector } from '../components/VideoTypeSelector';
import { VoiceoverSelector } from '../components/VoiceoverSelector';
import { BackgroundMusicSelector } from '../components/BackgroundMusicSelector';
import { VideoPreview } from '../components/VideoPreview';
import { ExportOptions } from '../components/ExportOptions';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Play, Video } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher'; // Import ThemeSwitcher

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
      if (currentStep < 6) setCurrentStep(6); // Navigate to Export step after generation
    }, 3000);
  };

  const CurrentComponent = steps[currentStep - 1].component;
  const currentStepDetails = steps[currentStep - 1];

  // Props to pass to the current step component
  const componentProps: any = {
    config: videoConfig,
    updateConfig: setVideoConfig,
    onNext: nextStep,
  };

  if (currentStepDetails.title === 'Preview') {
    componentProps.isGenerating = isGenerating;
    componentProps.onGenerate = generateVideo;
    componentProps.generatedVideo = generatedVideo;
  } else if (currentStepDetails.title === 'Export') {
    componentProps.generatedVideo = generatedVideo;
  }


  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">stackvid</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground hidden md:inline">Script to Video in Minutes</span>
              <ThemeSwitcher />
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
                      ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-primary-foreground shadow-lg' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.id}
                </div>
                <span className={`ml-2 font-medium whitespace-nowrap transition-colors duration-300 ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-purple-500' : 'bg-border'
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
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <CurrentComponent {...componentProps} />
            </div>
          </div>

          {/* Configuration Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24"> {/* Adjusted sticky top */}
              <h3 className="text-xl font-semibold text-foreground mb-4">Configuration</h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <label className="text-foreground font-medium">Script</label>
                  <p className="text-muted-foreground mt-1 line-clamp-3">
                    {videoConfig.script ? videoConfig.script : 'Not set'}
                  </p>
                </div>

                <div>
                  <label className="text-foreground font-medium">Video Type</label>
                  <p className="text-muted-foreground mt-1">
                    {videoConfig.videoType || 'Not selected'}
                  </p>
                </div>

                <div>
                  <label className="text-foreground font-medium">Voice</label>
                  <p className="text-muted-foreground mt-1">
                    {`${videoConfig.voice.gender} ${videoConfig.voice.language} (${videoConfig.voice.emotion})`}
                  </p>
                </div>

                <div>
                  <label className="text-foreground font-medium">Background Music</label>
                  <p className="text-muted-foreground mt-1">
                    {videoConfig.backgroundMusic.track || videoConfig.backgroundMusic.category || 'None'}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-6 space-y-3">
                {currentStep < 5 && (
                  <Button 
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105"
                    disabled={!videoConfig.script && currentStep === 1}
                  >
                    <ArrowDown className="w-4 h-4 mr-2" />
                    Next Step
                  </Button>
                )}
                
                {currentStep === 5 && !generatedVideo && (
                  <Button 
                    onClick={generateVideo}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105"
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
                    className="w-full border-border text-foreground hover:bg-muted transition-colors duration-200"
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
      {/* Footer */}
      <footer className="text-center py-8 border-t border-border mt-12">
        <p className="text-muted-foreground text-sm">
          Developed by stackmike
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          stackvid - AI Powered Video Creation
        </p>
      </footer>
    </div>
  );
};

export default Index;

