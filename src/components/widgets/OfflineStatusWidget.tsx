
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Wifi, WifiOff, HardDrive, Sync } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { offlineService, OfflineLesson } from '@/services/offlineService';
import { toast } from "@/hooks/use-toast";

const OfflineStatusWidget = () => {
  const { language } = useLanguage();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineLessons, setOfflineLessons] = useState<OfflineLesson[]>([]);
  const [storageUsage, setStorageUsage] = useState({ used: 0, available: 0 });
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    loadOfflineData();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineData = async () => {
    try {
      const lessons = await offlineService.getOfflineLessons();
      const usage = await offlineService.getStorageUsage();
      setOfflineLessons(lessons);
      setStorageUsage(usage);
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  };

  const handleDownloadLessons = async () => {
    setIsDownloading(true);
    
    try {
      const lessonsToDownload = ['1', '2', '3']; // Sample lesson IDs
      for (const lessonId of lessonsToDownload) {
        await offlineService.downloadLesson(lessonId);
      }
      
      await loadOfflineData();
      
      toast({
        title: language === 'fr' ? 'Téléchargement terminé' : 'Download Complete',
        description: language === 'fr' 
          ? 'Les leçons sont disponibles hors ligne' 
          : 'Lessons are now available offline'
      });
    } catch (error) {
      console.error('Error downloading lessons:', error);
      toast({
        title: language === 'fr' ? 'Erreur de téléchargement' : 'Download Error',
        description: language === 'fr' 
          ? 'Impossible de télécharger les leçons' 
          : 'Failed to download lessons',
        variant: 'destructive'
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSync = async () => {
    if (!isOnline) {
      toast({
        title: language === 'fr' ? 'Pas de connexion' : 'No Connection',
        description: language === 'fr' 
          ? 'Connexion Internet requise pour la synchronisation' 
          : 'Internet connection required for sync',
        variant: 'destructive'
      });
      return;
    }

    setIsSyncing(true);
    
    try {
      await offlineService.syncProgress();
      
      toast({
        title: language === 'fr' ? 'Synchronisation terminée' : 'Sync Complete',
        description: language === 'fr' 
          ? 'Vos progrès ont été sauvegardés' 
          : 'Your progress has been saved'
      });
    } catch (error) {
      console.error('Error syncing:', error);
      toast({
        title: language === 'fr' ? 'Erreur de synchronisation' : 'Sync Error',
        description: language === 'fr' 
          ? 'Impossible de synchroniser les données' 
          : 'Failed to sync data',
        variant: 'destructive'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="bg-white border-0 shadow-ios-card">
      <CardContent className="p-6 space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isOnline ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            <span className="font-medium text-gray-800">
              {isOnline 
                ? (language === 'fr' ? 'En ligne' : 'Online')
                : (language === 'fr' ? 'Hors ligne' : 'Offline')
              }
            </span>
          </div>
          
          <Badge 
            variant={isOnline ? 'default' : 'destructive'}
            className={isOnline ? 'bg-green-100 text-green-700 border-green-200' : ''}
          >
            {isOnline ? '●' : '●'} {isOnline 
              ? (language === 'fr' ? 'Connecté' : 'Connected')
              : (language === 'fr' ? 'Déconnecté' : 'Disconnected')
            }
          </Badge>
        </div>

        {/* Offline Lessons */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Leçons Hors Ligne' : 'Offline Lessons'}
            </span>
            <Badge variant="outline">
              {offlineLessons.length}
            </Badge>
          </div>
          
          {offlineLessons.length === 0 ? (
            <Button
              onClick={handleDownloadLessons}
              disabled={isDownloading || !isOnline}
              variant="outline"
              size="sm"
              className="w-full"
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin border-2 border-current border-t-transparent rounded-full" />
                  {language === 'fr' ? 'Téléchargement...' : 'Downloading...'}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Télécharger Leçons' : 'Download Lessons'}
                </>
              )}
            </Button>
          ) : (
            <div className="text-sm text-green-600 flex items-center">
              <Badge className="bg-green-100 text-green-700 border-green-200 mr-2">
                ✓
              </Badge>
              {language === 'fr' 
                ? `${offlineLessons.length} leçons disponibles hors ligne`
                : `${offlineLessons.length} lessons available offline`
              }
            </div>
          )}
        </div>

        {/* Storage Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <HardDrive className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Stockage' : 'Storage'}
            </span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>{formatBytes(storageUsage.used)} {language === 'fr' ? 'utilisés' : 'used'}</span>
              <span>{formatBytes(storageUsage.available)} {language === 'fr' ? 'disponibles' : 'available'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${storageUsage.available > 0 ? (storageUsage.used / storageUsage.available) * 100 : 0}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Sync Button */}
        <Button
          onClick={handleSync}
          disabled={isSyncing || !isOnline}
          variant="outline"
          size="sm"
          className="w-full"
        >
          {isSyncing ? (
            <>
              <div className="w-4 h-4 mr-2 animate-spin border-2 border-current border-t-transparent rounded-full" />
              {language === 'fr' ? 'Synchronisation...' : 'Syncing...'}
            </>
          ) : (
            <>
              <Sync className="w-4 h-4 mr-2" />
              {language === 'fr' ? 'Synchroniser' : 'Sync Progress'}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default OfflineStatusWidget;
