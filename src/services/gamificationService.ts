
export interface Achievement {
  id: string;
  name: string;
  nameFr: string;
  nameEwondo: string;
  description: string;
  icon: string;
  category: 'cultural' | 'language' | 'community' | 'heritage';
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface CulturalChallenge {
  id: string;
  title: string;
  titleFr: string;
  titleEwondo: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  xpReward: number;
  requirements: string[];
  completed: boolean;
  expiresAt: Date;
}

export interface FamilyProgress {
  familyId: string;
  members: Array<{
    id: string;
    name: string;
    level: number;
    xp: number;
    streak: number;
  }>;
  totalXP: number;
  achievements: string[];
  currentGoal: string;
}

class GamificationService {
  private achievements: Achievement[] = [
    {
      id: 'first_greeting',
      name: 'First Hello',
      nameFr: 'Premier Bonjour',
      nameEwondo: 'Mbolo wa kwed',
      description: 'Learn your first traditional greeting',
      icon: '👋',
      category: 'cultural',
      xpReward: 50,
      unlocked: false
    },
    {
      id: 'family_tree',
      name: 'Family Roots',
      nameFr: 'Racines Familiales',
      nameEwondo: 'Miañ mi ndap',
      description: 'Complete family relations lessons',
      icon: '🌳',
      category: 'heritage',
      xpReward: 100,
      unlocked: false
    },
    {
      id: 'cultural_keeper',
      name: 'Cultural Keeper',
      nameFr: 'Gardien Culturel',
      nameEwondo: 'Nkukuma bikukú',
      description: 'Share cultural knowledge with 5 people',
      icon: '🏛️',
      category: 'community',
      xpReward: 200,
      unlocked: false
    }
  ];

  private challenges: CulturalChallenge[] = [
    {
      id: 'daily_greeting',
      title: 'Daily Cultural Greeting',
      titleFr: 'Salutation Culturelle Quotidienne',
      titleEwondo: 'Mbolo mokolo moti',
      description: 'Practice traditional greetings every day this week',
      type: 'daily',
      xpReward: 25,
      requirements: ['Complete 1 greeting lesson', 'Practice pronunciation'],
      completed: false,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  ];

  getAchievements(): Achievement[] {
    return this.achievements;
  }

  getChallenges(): CulturalChallenge[] {
    return this.challenges;
  }

  unlockAchievement(achievementId: string): Achievement | null {
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date();
      return achievement;
    }
    return null;
  }

  completeChallenge(challengeId: string): number {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
      challenge.completed = true;
      return challenge.xpReward;
    }
    return 0;
  }

  calculateStreakBonus(streak: number): number {
    return Math.floor(streak / 7) * 10; // 10 XP bonus for each week streak
  }

  getCulturalMilestones(xp: number): string[] {
    const milestones = [];
    if (xp >= 100) milestones.push('Cultural Beginner');
    if (xp >= 500) milestones.push('Heritage Explorer');
    if (xp >= 1000) milestones.push('Tradition Keeper');
    if (xp >= 2500) milestones.push('Cultural Ambassador');
    if (xp >= 5000) milestones.push('Elder Wisdom');
    return milestones;
  }
}

export const gamificationService = new GamificationService();
