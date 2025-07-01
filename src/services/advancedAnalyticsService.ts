
export interface LearningPattern {
  preferredLearningTime: string[];
  strongestSkills: string[];
  areasForImprovement: string[];
  culturalInterests: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
}

export interface AIInsight {
  id: string;
  type: 'recommendation' | 'achievement' | 'warning' | 'celebration';
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  actionable: boolean;
  culturalRelevance: number; // 1-10 scale
  timestamp: Date;
}

export interface CulturalMilestone {
  id: string;
  name: string;
  nameFr: string;
  nameEwondo: string;
  description: string;
  category: 'language' | 'culture' | 'tradition' | 'history';
  requiredXP: number;
  culturalSignificance: string;
  rewards: string[];
  unlocked: boolean;
  unlockedAt?: Date;
}

class AdvancedAnalyticsService {
  private learningPatterns: Map<string, LearningPattern> = new Map();
  private aiInsights: AIInsight[] = [];
  private culturalMilestones: CulturalMilestone[] = [
    {
      id: 'first_elder_greeting',
      name: 'Elder Respect',
      nameFr: 'Respect des Aînés',
      nameEwondo: 'Toloba Mininga',
      description: 'Master traditional greetings for elders',
      category: 'culture',
      requiredXP: 100,
      culturalSignificance: 'Shows deep understanding of Ewondo social hierarchy',
      rewards: ['Cultural Wisdom Badge', 'Elder Audio Stories'],
      unlocked: false
    },
    {
      id: 'family_storyteller',
      name: 'Family Storyteller',
      nameFr: 'Conteur Familial',
      nameEwondo: 'Mvett-tara Ndap',
      description: 'Learn and share 5 traditional stories',
      category: 'tradition',
      requiredXP: 500,
      culturalSignificance: 'Becomes keeper of oral traditions',
      rewards: ['Storyteller Title', 'Exclusive Story Collection'],
      unlocked: false
    },
    {
      id: 'cultural_ambassador',
      name: 'Cultural Ambassador',
      nameFr: 'Ambassadeur Culturel',
      nameEwondo: 'Mvom-tara Bikukú',
      description: 'Help 10 people learn about Ewondo culture',
      category: 'culture',
      requiredXP: 1000,
      culturalSignificance: 'Recognized as cultural bridge-builder',
      rewards: ['Ambassador Badge', 'Cultural Workshop Access'],
      unlocked: false
    }
  ];

  generateAIInsights(userId: string, userStats: any): AIInsight[] {
    const insights: AIInsight[] = [];
    const pattern = this.learningPatterns.get(userId);
    
    if (!pattern) return insights;

    // Time-based recommendation
    if (pattern.preferredLearningTime.includes('morning')) {
      insights.push({
        id: `morning_${Date.now()}`,
        type: 'recommendation',
        title: 'Morning Cultural Immersion',
        titleFr: 'Immersion Culturelle Matinale',
        description: 'You learn best in the morning. Try our new dawn greeting lessons!',
        descriptionFr: 'Vous apprenez mieux le matin. Essayez nos nouvelles leçons de salutations à l\'aube!',
        actionable: true,
        culturalRelevance: 8,
        timestamp: new Date()
      });
    }

    // Cultural interest insight
    if (pattern.culturalInterests.includes('music')) {
      insights.push({
        id: `music_${Date.now()}`,
        type: 'recommendation',
        title: 'Musical Learning Path',
        titleFr: 'Parcours d\'Apprentissage Musical',
        description: 'Explore traditional Ewondo songs to enhance your language learning',
        descriptionFr: 'Explorez les chansons traditionnelles Ewondo pour améliorer votre apprentissage',
        actionable: true,
        culturalRelevance: 9,
        timestamp: new Date()
      });
    }

    // Achievement celebration
    if (userStats.streak > 14) {
      insights.push({
        id: `streak_${Date.now()}`,
        type: 'celebration',
        title: 'Cultural Dedication Recognized!',
        titleFr: 'Dévouement Culturel Reconnu!',
        description: 'Your consistency shows true respect for the culture. Elders would be proud!',
        descriptionFr: 'Votre constance montre un vrai respect pour la culture. Les aînés seraient fiers!',
        actionable: false,
        culturalRelevance: 10,
        timestamp: new Date()
      });
    }

    this.aiInsights = [...this.aiInsights, ...insights];
    return insights;
  }

  updateLearningPattern(userId: string, sessionData: any): void {
    const currentPattern = this.learningPatterns.get(userId) || {
      preferredLearningTime: [],
      strongestSkills: [],
      areasForImprovement: [],
      culturalInterests: [],
      learningStyle: 'mixed' as const
    };

    // Update learning time preferences
    const hour = new Date().getHours();
    let timeSlot = 'morning';
    if (hour >= 12 && hour < 17) timeSlot = 'afternoon';
    else if (hour >= 17) timeSlot = 'evening';

    if (!currentPattern.preferredLearningTime.includes(timeSlot)) {
      currentPattern.preferredLearningTime.push(timeSlot);
    }

    // Analyze performance to identify strengths
    if (sessionData.accuracy > 0.8) {
      const skill = sessionData.lessonType;
      if (!currentPattern.strongestSkills.includes(skill)) {
        currentPattern.strongestSkills.push(skill);
      }
    }

    // Identify areas for improvement
    if (sessionData.accuracy < 0.6) {
      const area = sessionData.lessonType;
      if (!currentPattern.areasForImprovement.includes(area)) {
        currentPattern.areasForImprovement.push(area);
      }
    }

    this.learningPatterns.set(userId, currentPattern);
  }

  getCulturalMilestones(): CulturalMilestone[] {
    return this.culturalMilestones;
  }

  checkMilestoneProgress(userId: string, userXP: number): CulturalMilestone[] {
    const newlyUnlocked: CulturalMilestone[] = [];
    
    this.culturalMilestones.forEach(milestone => {
      if (!milestone.unlocked && userXP >= milestone.requiredXP) {
        milestone.unlocked = true;
        milestone.unlockedAt = new Date();
        newlyUnlocked.push(milestone);
      }
    });

    return newlyUnlocked;
  }

  getLearningPattern(userId: string): LearningPattern | null {
    return this.learningPatterns.get(userId) || null;
  }

  getRecentInsights(userId: string, limit: number = 5): AIInsight[] {
    return this.aiInsights
      .filter(insight => insight.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  predictOptimalLearningTime(userId: string): string {
    const pattern = this.learningPatterns.get(userId);
    if (!pattern || pattern.preferredLearningTime.length === 0) {
      return 'morning'; // Default recommendation
    }

    // Return most frequent learning time
    const timeCount = pattern.preferredLearningTime.reduce((acc, time) => {
      acc[time] = (acc[time] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(timeCount).reduce((a, b) => timeCount[a] > timeCount[b] ? a : b);
  }
}

export const advancedAnalyticsService = new AdvancedAnalyticsService();
