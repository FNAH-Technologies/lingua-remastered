
export interface CulturalTheme {
  id: string;
  name: string;
  nameFr: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  patterns: {
    headerPattern: string;
    backgroundTexture: string;
  };
  region: string;
  culturalElements: string[];
}

export interface SeasonalTheme {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  festival: string;
  colors: CulturalTheme['colors'];
}

class ThemeService {
  private themes: CulturalTheme[] = [
    {
      id: 'ewondo_classic',
      name: 'Ewondo Classic',
      nameFr: 'Ewondo Classique',
      colors: {
        primary: '#FF6B35',
        secondary: '#F7931E',
        accent: '#FFD23F',
        background: '#FFF8F3',
        text: '#2D1810'
      },
      patterns: {
        headerPattern: 'traditional-kente',
        backgroundTexture: 'subtle-tribal'
      },
      region: 'Central Cameroon',
      culturalElements: ['palm-trees', 'traditional-huts', 'ancestral-masks']
    },
    {
      id: 'bamileke_royal',
      name: 'Bamileke Royal',
      nameFr: 'Bamiléké Royal',
      colors: {
        primary: '#8B4513',
        secondary: '#DAA520',
        accent: '#CD853F',
        background: '#FDF5E6',
        text: '#4A4A4A'
      },
      patterns: {
        headerPattern: 'royal-geometric',
        backgroundTexture: 'woven-patterns'
      },
      region: 'West Cameroon',
      culturalElements: ['royal-masks', 'traditional-drums', 'ceremonial-beads']
    },
    {
      id: 'fulani_nomadic',
      name: 'Fulani Heritage',
      nameFr: 'Héritage Peul',
      colors: {
        primary: '#8B0000',
        secondary: '#DAA520',
        accent: '#F4A460',
        background: '#FFF8DC',
        text: '#2F4F4F'
      },
      patterns: {
        headerPattern: 'nomadic-geometric',
        backgroundTexture: 'desert-patterns'
      },
      region: 'North Cameroon',
      culturalElements: ['cattle-symbols', 'nomadic-tents', 'traditional-jewelry']
    }
  ];

  private seasonalThemes: SeasonalTheme[] = [
    {
      id: 'nguon_festival',
      name: 'Nguon Festival',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      festival: 'Nguon',
      colors: {
        primary: '#FF4500',
        secondary: '#FF8C00',
        accent: '#FFD700',
        background: '#FFF8F0',
        text: '#8B4513'
      }
    }
  ];

  private currentTheme: string = 'ewondo_classic';

  getThemes(): CulturalTheme[] {
    return this.themes;
  }

  getTheme(themeId: string): CulturalTheme | null {
    return this.themes.find(theme => theme.id === themeId) || null;
  }

  getCurrentTheme(): CulturalTheme {
    return this.getTheme(this.currentTheme) || this.themes[0];
  }

  setTheme(themeId: string): boolean {
    if (this.themes.find(theme => theme.id === themeId)) {
      this.currentTheme = themeId;
      localStorage.setItem('lingua_theme', themeId);
      this.applyTheme(themeId);
      return true;
    }
    return false;
  }

  getSeasonalTheme(): SeasonalTheme | null {
    const today = new Date();
    return this.seasonalThemes.find(theme => {
      const start = new Date(theme.startDate);
      const end = new Date(theme.endDate);
      return today >= start && today <= end;
    }) || null;
  }

  private applyTheme(themeId: string): void {
    const theme = this.getTheme(themeId);
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-text', theme.colors.text);
  }

  initializeTheme(): void {
    const savedTheme = localStorage.getItem('lingua_theme');
    if (savedTheme && this.themes.find(t => t.id === savedTheme)) {
      this.currentTheme = savedTheme;
    }
    
    // Check for seasonal theme override
    const seasonalTheme = this.getSeasonalTheme();
    if (seasonalTheme) {
      this.applySeasonalTheme(seasonalTheme);
    } else {
      this.applyTheme(this.currentTheme);
    }
  }

  private applySeasonalTheme(theme: SeasonalTheme): void {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-text', theme.colors.text);
  }
}

export const themeService = new ThemeService();
