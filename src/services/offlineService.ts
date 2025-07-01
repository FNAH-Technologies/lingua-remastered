
export interface OfflineLesson {
  id: string;
  title: string;
  titleFr: string;
  titleEwondo: string;
  content: any;
  audioFiles: string[];
  downloadedAt: Date;
  size: number;
}

export interface OfflineProgress {
  lessonId: string;
  progress: number;
  completed: boolean;
  xpEarned: number;
  timestamp: Date;
  synced: boolean;
}

class OfflineService {
  private dbName = 'LinguaOfflineDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('lessons')) {
          db.createObjectStore('lessons', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: 'lessonId' });
        }
        
        if (!db.objectStoreNames.contains('audioFiles')) {
          db.createObjectStore('audioFiles', { keyPath: 'url' });
        }
      };
    });
  }

  async downloadLesson(lessonId: string): Promise<boolean> {
    try {
      // Simulate lesson download
      const lessonData = {
        id: lessonId,
        title: `Lesson ${lessonId}`,
        titleFr: `Leçon ${lessonId}`,
        titleEwondo: `Nlañ ${lessonId}`,
        content: { /* lesson content */ },
        audioFiles: [`/audio/lesson-${lessonId}.mp3`],
        downloadedAt: new Date(),
        size: 1024 * 1024 // 1MB
      };

      await this.storeLesson(lessonData);
      return true;
    } catch (error) {
      console.error('Error downloading lesson:', error);
      return false;
    }
  }

  private async storeLesson(lesson: OfflineLesson): Promise<void> {
    if (!this.db) await this.initialize();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['lessons'], 'readwrite');
      const store = transaction.objectStore('lessons');
      const request = store.put(lesson);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getOfflineLessons(): Promise<OfflineLesson[]> {
    if (!this.db) await this.initialize();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['lessons'], 'readonly');
      const store = transaction.objectStore('lessons');
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async saveProgress(progress: OfflineProgress): Promise<void> {
    if (!this.db) await this.initialize();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['progress'], 'readwrite');
      const store = transaction.objectStore('progress');
      const request = store.put(progress);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async syncProgress(): Promise<void> {
    const unsyncedProgress = await this.getUnsyncedProgress();
    
    for (const progress of unsyncedProgress) {
      try {
        // Simulate API sync
        await this.syncProgressToServer(progress);
        progress.synced = true;
        await this.saveProgress(progress);
      } catch (error) {
        console.error('Error syncing progress:', error);
      }
    }
  }

  private async getUnsyncedProgress(): Promise<OfflineProgress[]> {
    if (!this.db) await this.initialize();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['progress'], 'readonly');
      const store = transaction.objectStore('progress');
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const allProgress = request.result;
        const unsynced = allProgress.filter(p => !p.synced);
        resolve(unsynced);
      };
    });
  }

  private async syncProgressToServer(progress: OfflineProgress): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async getStorageUsage(): Promise<{ used: number; available: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        used: estimate.usage || 0,
        available: estimate.quota || 0
      };
    }
    
    return { used: 0, available: 0 };
  }

  async clearOfflineData(): Promise<void> {
    if (!this.db) return;
    
    const transaction = this.db.transaction(['lessons', 'progress', 'audioFiles'], 'readwrite');
    
    await Promise.all([
      new Promise(resolve => {
        const request = transaction.objectStore('lessons').clear();
        request.onsuccess = () => resolve(undefined);
      }),
      new Promise(resolve => {
        const request = transaction.objectStore('progress').clear();
        request.onsuccess = () => resolve(undefined);
      }),
      new Promise(resolve => {
        const request = transaction.objectStore('audioFiles').clear();
        request.onsuccess = () => resolve(undefined);
      })
    ]);
  }
}

export const offlineService = new OfflineService();
