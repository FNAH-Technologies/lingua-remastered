
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9c5adeac65544cf9b83fd3ac4b3610a6',
  appName: 'lingua-verse-tales-ai',
  webDir: 'dist',
  server: {
    url: 'https://9c5adeac-6554-4cf9-b83f-d3ac4b3610a6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ff6b35',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    }
  }
};

export default config;
