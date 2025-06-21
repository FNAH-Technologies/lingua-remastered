
export interface LessonQuestion {
  id: number;
  type: 'multiple-choice' | 'translation' | 'listening' | 'speaking' | 'fill-blank';
  question: string;
  questionFr: string;
  options: string[];
  correct: string;
  explanation: string;
  explanationFr: string;
  audioText?: string;
  pronunciation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LessonData {
  id: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  questions: LessonQuestion[];
  vocabulary: Array<{
    word: string;
    translation: string;
    pronunciation: string;
    example: string;
    exampleTranslation: string;
  }>;
}

class LessonDataService {
  private lessons: Map<string, LessonData> = new Map();

  constructor() {
    this.initializeLessons();
  }

  private initializeLessons() {
    // Lesson 1: Basic Communication
    this.lessons.set('1', {
      id: '1',
      title: 'Basic Communication',
      titleFr: 'Communication de base',
      description: 'Learn essential greetings and basic conversation starters',
      descriptionFr: 'Apprenez les salutations essentielles et les débuts de conversation',
      category: 'communication',
      difficulty: 'beginner',
      estimatedTime: 15,
      vocabulary: [
        {
          word: 'Hello',
          translation: 'Bonjour',
          pronunciation: 'bon-ZHOOR',
          example: 'Hello, how are you?',
          exampleTranslation: 'Bonjour, comment allez-vous ?'
        },
        {
          word: 'Goodbye',
          translation: 'Au revoir',
          pronunciation: 'oh ruh-VWAHR',
          example: 'Goodbye, see you later!',
          exampleTranslation: 'Au revoir, à bientôt !'
        },
        {
          word: 'Thank you',
          translation: 'Merci',
          pronunciation: 'mer-SEE',
          example: 'Thank you very much!',
          exampleTranslation: 'Merci beaucoup !'
        }
      ],
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'How do you say "Hello" in French?',
          questionFr: 'Comment dit-on "Hello" en français ?',
          options: ['Bonjour', 'Bonsoir', 'Salut', 'Au revoir'],
          correct: 'Bonjour',
          explanation: '"Bonjour" is the standard formal greeting in French',
          explanationFr: '"Bonjour" est la salutation formelle standard en français',
          audioText: 'Bonjour',
          pronunciation: 'bon-ZHOOR',
          difficulty: 'easy'
        },
        {
          id: 2,
          type: 'listening',
          question: 'Listen and choose the correct meaning',
          questionFr: 'Écoutez et choisissez la bonne signification',
          options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
          correct: 'Thank you',
          explanation: '"Merci" means "Thank you" in English',
          explanationFr: '"Merci" signifie "Thank you" en anglais',
          audioText: 'Merci',
          pronunciation: 'mer-SEE',
          difficulty: 'easy'
        },
        {
          id: 3,
          type: 'translation',
          question: 'Translate: "How are you?"',
          questionFr: 'Traduisez : "How are you?"',
          options: ['Comment allez-vous ?', 'Où êtes-vous ?', 'Que faites-vous ?', 'Qui êtes-vous ?'],
          correct: 'Comment allez-vous ?',
          explanation: 'This is the formal way to ask about someone\'s wellbeing',
          explanationFr: 'C\'est la façon formelle de demander le bien-être de quelqu\'un',
          audioText: 'Comment allez-vous ?',
          pronunciation: 'koh-mahn tah-lay VOO',
          difficulty: 'medium'
        },
        {
          id: 4,
          type: 'speaking',
          question: 'Say "Good evening" in French',
          questionFr: 'Dites "Good evening" en français',
          options: ['Bonsoir', 'Bonjour', 'Bonne nuit', 'Salut'],
          correct: 'Bonsoir',
          explanation: '"Bonsoir" is used for evening greetings',
          explanationFr: '"Bonsoir" est utilisé pour les salutations du soir',
          audioText: 'Bonsoir',
          pronunciation: 'bon-SWAHR',
          difficulty: 'easy'
        },
        {
          id: 5,
          type: 'fill-blank',
          question: 'Complete: "_____ beaucoup!" (Thank you very much!)',
          questionFr: 'Complétez : "_____ beaucoup !" (Merci beaucoup !)',
          options: ['Merci', 'Bonjour', 'Au revoir', 'S\'il vous plaît'],
          correct: 'Merci',
          explanation: '"Merci beaucoup" means "Thank you very much"',
          explanationFr: '"Merci beaucoup" signifie "Thank you very much"',
          audioText: 'Merci beaucoup',
          pronunciation: 'mer-SEE boh-KOO',
          difficulty: 'medium'
        }
      ]
    });

    // Add more lessons for other categories
    this.lessons.set('2', {
      id: '2',
      title: 'Numbers & Counting',
      titleFr: 'Nombres et comptage',
      description: 'Master French numbers from 1 to 100',
      descriptionFr: 'Maîtrisez les nombres français de 1 à 100',
      category: 'numbers',
      difficulty: 'beginner',
      estimatedTime: 20,
      vocabulary: [
        {
          word: 'One',
          translation: 'Un/Une',
          pronunciation: 'uhn/oon',
          example: 'One apple',
          exampleTranslation: 'Une pomme'
        },
        {
          word: 'Two',
          translation: 'Deux',
          pronunciation: 'duh',
          example: 'Two cats',
          exampleTranslation: 'Deux chats'
        }
      ],
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'How do you say "3" in French?',
          questionFr: 'Comment dit-on "3" en français ?',
          options: ['Trois', 'Quatre', 'Cinq', 'Six'],
          correct: 'Trois',
          explanation: '"Trois" is the French word for three',
          explanationFr: '"Trois" est le mot français pour trois',
          audioText: 'Trois',
          pronunciation: 'twah',
          difficulty: 'easy'
        }
      ]
    });
  }

  getLessonById(id: string): LessonData | null {
    return this.lessons.get(id) || null;
  }

  getAllLessons(): LessonData[] {
    return Array.from(this.lessons.values());
  }

  getLessonsByCategory(category: string): LessonData[] {
    return Array.from(this.lessons.values()).filter(lesson => lesson.category === category);
  }

  getLessonsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): LessonData[] {
    return Array.from(this.lessons.values()).filter(lesson => lesson.difficulty === difficulty);
  }
}

export const lessonDataService = new LessonDataService();
