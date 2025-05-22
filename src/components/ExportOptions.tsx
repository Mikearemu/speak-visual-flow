
import React, { useState } from 'react';
import { VideoConfig } from '../pages/Index';
import { Button } from '@/components/ui/button';
import { Download, Share2, Copy, Mail, Facebook, Twitter, Linkedin, CheckCircle, QrCode, Link } from 'lucide-react';

interface ExportOptionsProps {
  config: VideoConfig;
  updateConfig: (config: VideoConfig) => void;
  generatedVideo: string | null;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ config, updateConfig, generatedVideo }) => {
  const [downloadFormat, setDownloadFormat] = useState('mp4');
  const [quality, setQuality] = useState('1080p');
  const [shareLink, setShareLink] = useState('https://aivideostudio.com/v/abc123xyz');
  const [copied, setCopied] = useState(false);

  const downloadFormats = [
    { id: 'mp4', name: 'MP4', description: 'Best for most platforms', size: '45 MB' },
    { id: 'mov', name: 'MOV', description: 'High quality for editing', size: '72 MB' },
    { id: 'webm', name: 'WebM', description: 'Optimized for web', size: '38 MB' },
    { id: 'gif', name: 'GIF', description: 'Animated preview', size: '12 MB' }
  ];

  const qualityOptions = [
    { id: '720p', name: '720p HD', description: 'Good quality, smaller file', size: '25 MB' },
    { id: '1080p', name: '1080p Full HD', description: 'High quality, standard', size: '45 MB' },
    { id: '4k', name: '4K Ultra HD', description: 'Premium quality, large file', size: '180 MB' }
  ];

  const socialPlatforms = [
    { id: 'youtube', name: 'YouTube', icon: '📺', specs: '1920x1080, MP4' },
    { id: 'instagram', name: 'Instagram', icon: '📷', specs: '1080x1080, MP4' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', specs: '1080x1920, MP4' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', specs: '1920x1080, MP4' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', specs: '1280x720, MP4' },
    { id: 'facebook', name: 'Facebook', icon: '👥', specs: '1920x1080, MP4' }
  ];

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadVideo = () => {
    // Simulate download
    console.log(`Downloading video in ${downloadFormat} format at ${quality} quality`);
  };

  const shareToSocial = (platform: string) => {
    // Simulate sharing to social platform
    console.log(`Sharing to ${platform}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Export & Share</h2>
        <p className="text-gray-300">Download your video or share it across platforms.</p>
      </div>

      {/* Video Info */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Video Generated Successfully!</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Duration:</span>
            <div className="text-white font-medium">2:34</div>
          </div>
          <div>
            <span className="text-gray-400">Resolution:</span>
            <div className="text-white font-medium">1920x1080</div>
          </div>
          <div>
            <span className="text-gray-400">File Size:</span>
            <div className="text-white font-medium">45.2 MB</div>
          </div>
          <div>
            <span className="text-gray-400">Generated:</span>
            <div className="text-white font-medium">Just now</div>
          </div>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Download Options</h3>
        
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Format</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {downloadFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setDownloadFormat(format.id)}
                  className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                    downloadFormat === format.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-600 bg-gray-700 hover:border-purple-400'
                  }`}
                >
                  <div className={`font-medium mb-1 ${
                    downloadFormat === format.id ? 'text-white' : 'text-gray-300'
                  }`}>
                    {format.name}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">{format.description}</div>
                  <div className="text-xs text-gray-500">~{format.size}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quality Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Quality</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {qualityOptions.map((qual) => (
                <button
                  key={qual.id}
                  onClick={() => setQuality(qual.id)}
                  className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                    quality === qual.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-600 bg-gray-700 hover:border-purple-400'
                  }`}
                >
                  <div className={`font-medium mb-1 ${
                    quality === qual.id ? 'text-white' : 'text-gray-300'
                  }`}>
                    {qual.name}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">{qual.description}</div>
                  <div className="text-xs text-gray-500">~{qual.size}</div>
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={downloadVideo}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Video ({downloadFormat.toUpperCase()} - {quality})
          </Button>
        </div>
      </div>

      {/* Share Options */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Share Your Video</h3>
        
        <div className="space-y-6">
          {/* Share Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Share Link</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded text-white"
              />
              <Button
                onClick={copyShareLink}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Anyone with this link can view your video
            </p>
          </div>

          {/* Social Media Platforms */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Share to Social Media</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => shareToSocial(platform.id)}
                  className="p-4 rounded-lg border border-gray-600 bg-gray-700 hover:border-purple-400 hover:bg-gray-600 transition-all duration-200 text-left"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="font-medium text-white">{platform.name}</span>
                  </div>
                  <div className="text-xs text-gray-400">{platform.specs}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-3">
            <Button
              onClick={() => shareToSocial('email')}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <QrCode className="w-4 h-4 mr-2" />
              QR Code
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Link className="w-4 h-4 mr-2" />
              Embed
            </Button>
          </div>
        </div>
      </div>

      {/* Analytics Preview */}
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Video Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-700 rounded">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-sm text-gray-400">Views</div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-sm text-gray-400">Shares</div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-sm text-gray-400">Downloads</div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-400">Completion</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
          Create Another Video
        </Button>
        <Button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600">
          Save to Dashboard
        </Button>
      </div>
    </div>
  );
};
