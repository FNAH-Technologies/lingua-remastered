
export interface LearningSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  lessonId: string;
  xpEarned: number;
  accuracy: number;
  culturalTopics: string[];
  pronunciationScore?: number;
}

export interface CulturalProgress {
  totalStudyTime: number;
  culturalTopicsLearned: string[];
  pronunciationImprovement: number;
  vocabularyRetention: number;
  culturalMilestonesReached: string[];
  weeklyProgress: Array<{
    week: string;
    xpEarned: number;
    lessonsCompleted: number;
    studyTime: number;
  }>;
}

export interface CommunityStats {
  regionalLearners: { [region: string]: number };
  topCulturalTopics: Array<{ topic: string; learners: number }>;
  communityXP: number;
  activeFamilyGroups: number;
}

class AnalyticsService {
  private sessions: LearningSession[] = [];
  private userProgress: Map<string, CulturalProgress> = new Map();

  logSession(session: Omit<LearningSession, 'id'>): void {
    const newSession: LearningSession = {
      ...session,
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    this.sessions.push(newSession);
  }

  getUserProgress(userId: string): CulturalProgress {
    const userSessions = this.sessions.filter(s => s.userId === userId);
    
    const totalStudyTime = userSessions.reduce((total, session) => {
      return total + (session.endTime.getTime() - session.startTime.getTime());
    }, 0);

    const culturalTopics = [...new Set(userSessions.flatMap(s => s.culturalTopics))];
    
    const avgAccuracy = userSessions.length > 0 
      ? userSessions.reduce((sum, s) => sum + s.accuracy, 0) / userSessions.length 
      : 0;

    const weeklyProgress = this.calculateWeeklyProgress(userSessions);

    return {
      totalStudyTime: Math.floor(totalStudyTime / (1000 * 60)), // Convert to minutes
      culturalTopicsLearned: culturalTopics,
      pronunciationImprovement: this.calculatePronunciationImprovement(userSessions),
      vocabularyRetention: avgAccuracy,
      culturalMilestonesReached: this.getCulturalMilestones(userSessions),
      weeklyProgress
    };
  }

  private calculateWeeklyProgress(sessions: LearningSession[]) {
    const weeks = new Map<string, { xp: number; lessons: number; time: number }>();
    
    sessions.forEach(session => {
      const weekKey = this.getWeekKey(session.startTime);
      const current = weeks.get(weekKey) || { xp: 0, lessons: 0, time: 0 };
      
      current.xp += session.xpEarned;
      current.lessons += 1;
      current.time += session.endTime.getTime() - session.startTime.getTime();
      
      weeks.set(weekKey, current);
    });

    return Array.from(weeks.entries()).map(([week, data]) => ({
      week,
      xpEarned: data.xp,
      lessonsCompleted: data.lessons,
      studyTime: Math.floor(data.time / (1000 * 60))
    }));
  }

  private calculatePronunciationImprovement(sessions: LearningSession[]): number {
    const pronunciationSessions = sessions.filter(s => s.pronunciationScore !== undefined);
    if (pronunciationSessions.length < 2) return 0;

    const first = pronunciationSessions[0].pronunciationScore || 0;
    const latest = pronunciationSessions[pronunciationSessions.length - 1].pronunciationScore || 0;
    
    return ((latest - first) / first) * 100;
  }

  private getCulturalMilestones(sessions: LearningSession[]): string[] {
    const milestones = [];
    const totalXP = sessions.reduce((sum, s) => sum + s.xpEarned, 0);
    const uniqueTopics = new Set(sessions.flatMap(s => s.culturalTopics));

    if (totalXP >= 100) milestones.push('Cultural Explorer');
    if (totalXP >= 500) milestones.push('Heritage Keeper');
    if (uniqueTopics.size >= 5) milestones.push('Cultural Diversity Champion');
    if (sessions.length >= 20) milestones.push('Dedicated Learner');

    return milestones;
  }

  private getWeekKey(date: Date): string {
    const year = date.getFullYear();
    const week = Math.ceil(((date.getTime() - new Date(year, 0, 1).getTime()) / 86400000 + 1) / 7);
    return `${year}-W${week}`;
  }

  getCommunityStats(): CommunityStats {
    // Mock community data
    return {
      regionalLearners: {
        'Cameroon': 1247,
        'France': 423,
        'USA': 312,
        'Canada': 189,
        'UK': 156
      },
      topCulturalTopics: [
        { topic: 'Traditional Greetings', learners: 1832 },
        { topic: 'Family Relations', learners: 1456 },
        { topic: 'Cultural Ceremonies', learners: 1234 },
        { topic: 'Traditional Food', learners: 987 }
      ],
      communityXP: 45679,
      activeFamilyGroups: 234
    };
  }

  exportProgress(userId: string): string {
    const progress = this.getUserProgress(userId);
    return JSON.stringify(progress, null, 2);
  }
}

export const analyticsService = new AnalyticsService();
