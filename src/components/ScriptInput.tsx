
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VideoConfig } from '../pages/Index';
import { ArrowDown, Upload, Video } from 'lucide-react';

interface ScriptInputProps {
  config: VideoConfig;
  updateConfig: (config: VideoConfig) => void;
  onNext: () => void;
}

export const ScriptInput: React.FC<ScriptInputProps> = ({ config, updateConfig, onNext }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGettingSuggestions, setIsGettingSuggestions] = useState(false);

  const handleScriptChange = (value: string) => {
    updateConfig({
      ...config,
      script: value
    });
  };

  const getSuggestions = async () => {
    if (!config.script) return;
    
    setIsGettingSuggestions(true);
    // Simulate AI suggestions
    setTimeout(() => {
      setSuggestions([
        "Consider adding a hook at the beginning to grab attention",
        "Break down complex concepts into simpler explanations", 
        "Add a clear call-to-action at the end",
        "Use more conversational language for better engagement"
      ]);
      setIsGettingSuggestions(false);
    }, 1500);
  };

  const applySuggestion = (suggestion: string) => {
    // For demo purposes, just append to script
    handleScriptChange(config.script + '\n\n[AI Suggestion: ' + suggestion + ']');
  };

  const sampleScripts = [
    {
      title: "Product Demo",
      content: "Welcome to our revolutionary new app that will transform how you manage your daily tasks. In the next 60 seconds, I'll show you exactly how this works and why thousands of users are already loving it."
    },
    {
      title: "Educational Explainer", 
      content: "Today we're going to learn about the fascinating world of renewable energy. Solar panels work by converting sunlight directly into electricity through a process called the photovoltaic effect."
    },
    {
      title: "Marketing Pitch",
      content: "Are you tired of spending hours on social media without seeing real results? Our platform helps businesses like yours create engaging content that actually converts viewers into customers."
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Write Your Video Script</h2>
        <p className="text-gray-300">Enter the script for your video. Keep it conversational and engaging for your audience.</p>
      </div>

      {/* Script Input */}
      <div className="space-y-4">
        <div className="relative">
          <Textarea
            value={config.script}
            onChange={(e) => handleScriptChange(e.target.value)}
            placeholder="Enter your video script here... Keep it natural and conversational. For a 1-minute video, aim for about 150-160 words."
            className="min-h-[200px] bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-400">
            {config.script.length} characters | ~{Math.ceil(config.script.split(' ').length / 160)} min video
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Words: {config.script.split(' ').filter(word => word.length > 0).length}
          </div>
          <Button
            onClick={getSuggestions}
            variant="outline"
            size="sm"
            disabled={!config.script || isGettingSuggestions}
            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
          >
            {isGettingSuggestions ? 'Getting Suggestions...' : 'Get AI Suggestions'}
          </Button>
        </div>
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
          <h3 className="font-semibold text-white mb-3">AI Suggestions</h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded border border-gray-600">
                <span className="text-gray-300 text-sm">{suggestion}</span>
                <Button
                  onClick={() => applySuggestion(suggestion)}
                  size="sm"
                  variant="ghost"
                  className="text-purple-400 hover:text-white hover:bg-purple-500"
                >
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample Scripts */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-3">Sample Scripts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleScripts.map((sample, index) => (
            <div key={index} className="p-3 bg-gray-700 rounded border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer"
                 onClick={() => handleScriptChange(sample.content)}>
              <h4 className="font-medium text-white mb-2">{sample.title}</h4>
              <p className="text-gray-400 text-sm line-clamp-3">{sample.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-300 mb-2">Upload Script File</p>
        <p className="text-gray-500 text-sm">Drag and drop a .txt or .docx file, or click to browse</p>
        <input type="file" className="hidden" accept=".txt,.docx" />
      </div>

      {config.script && (
        <div className="flex justify-end">
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
          >
            <Video className="w-4 h-4 mr-2" />
            Choose Video Style
          </Button>
        </div>
      )}
    </div>
  );
};
