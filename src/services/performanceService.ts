
class PerformanceService {
  private cache = new Map<string, any>();
  private imageCache = new Map<string, string>();

  // Lazy loading utility
  async lazyLoadComponent(importFn: () => Promise<any>) {
    try {
      const module = await importFn();
      return module.default;
    } catch (error) {
      console.error('Error lazy loading component:', error);
      return null;
    }
  }

  // Cache management
  setCache(key: string, data: any, ttl: number = 300000) { // 5 minutes default
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
  }

  getCache(key: string) {
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  // Image optimization
  async optimizeImage(src: string): Promise<string> {
    if (this.imageCache.has(src)) {
      return this.imageCache.get(src)!;
    }

    try {
      // Convert to WebP if supported
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      return new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          
          const webpData = canvas.toDataURL('image/webp', 0.8);
          const fallbackData = canvas.toDataURL('image/jpeg', 0.8);
          
          const optimizedSrc = webpData.length < fallbackData.length ? webpData : fallbackData;
          this.imageCache.set(src, optimizedSrc);
          resolve(optimizedSrc);
        };
        img.onerror = () => resolve(src);
        img.src = src;
      });
    } catch (error) {
      return src;
    }
  }

  // Performance monitoring
  measurePerformance(name: string, fn: () => void) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  }
}

export const performanceService = new PerformanceService();
