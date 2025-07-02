
import { ethnicLanguagesData, getLanguageData, EthnicLanguageContent } from './ethnicLanguageData';

export interface LessonQuestion {
  id: number;
  type: 'multiple-choice' | 'translation' | 'listening' | 'speaking' | 'fill-blank';
  question: string;
  questionFr: string;
  questionNative?: string;
  options: string[];
  correct: string;
  explanation: string;
  explanationFr: string;
  explanationNative?: string;
  audioText?: string;
  pronunciation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  nativeLanguageText?: string;
  nativeLanguagePronunciation?: string;
}

export interface LessonData {
  id: string;
  title: string;
  titleFr: string;
  titleNative?: string;
  description: string;
  descriptionFr: string;
  descriptionNative?: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  targetLanguage?: string;
  questions: LessonQuestion[];
  vocabulary: Array<{
    word: string;
    translation: string;
    nativeWord?: string;
    pronunciation: string;
    nativePronunciation?: string;
    example: string;
    exampleTranslation: string;
    exampleNative?: string;
  }>;
}

class LessonDataService {
  private lessons: Map<string, LessonData> = new Map();
  private currentLanguage: string = '';

  constructor() {
    this.initializeBaseLessons();
  }

  setTargetLanguage(language: string) {
    this.currentLanguage = language;
    this.generateLanguageSpecificLessons(language);
  }

  private initializeBaseLessons() {
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

  private generateLanguageSpecificLessons(selectedLanguage: string) {
    const languageData = getLanguageData(selectedLanguage);
    if (!languageData) return;

    // Clear existing lessons and generate new ones for the selected language
    this.lessons.clear();

    // Generate Basic Greetings lesson
    this.lessons.set('1', {
      id: '1',
      title: 'Basic Greetings',
      titleFr: 'Salutations de base',
      titleNative: `Salutations en ${languageData.language}`,
      description: `Learn essential greetings in ${languageData.language}`,
      descriptionFr: `Apprenez les salutations essentielles en ${languageData.language}`,
      descriptionNative: `Apprenez les salutations de base`,
      category: 'communication',
      difficulty: 'beginner',
      estimatedTime: 15,
      targetLanguage: selectedLanguage,
      vocabulary: [
        {
          word: 'Hello',
          translation: 'Bonjour',
          nativeWord: languageData.greetings.hello.text,
          pronunciation: 'bon-ZHOOR',
          nativePronunciation: languageData.greetings.hello.pronunciation,
          example: 'Hello, how are you?',
          exampleTranslation: 'Bonjour, comment allez-vous ?',
          exampleNative: `${languageData.greetings.hello.text}, ${languageData.greetings.howAreYou.text}`
        },
        {
          word: 'Goodbye',
          translation: 'Au revoir',
          nativeWord: languageData.greetings.goodbye.text,
          pronunciation: 'oh ruh-VWAHR',
          nativePronunciation: languageData.greetings.goodbye.pronunciation,
          example: 'Goodbye, see you later!',
          exampleTranslation: 'Au revoir, à bientôt !',
          exampleNative: `${languageData.greetings.goodbye.text}!`
        },
        {
          word: 'Thank you',
          translation: 'Merci',
          nativeWord: languageData.greetings.thankYou.text,
          pronunciation: 'mer-SEE',
          nativePronunciation: languageData.greetings.thankYou.pronunciation,
          example: 'Thank you very much!',
          exampleTranslation: 'Merci beaucoup !',
          exampleNative: `${languageData.greetings.thankYou.text}!`
        }
      ],
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: `How do you say "Hello" in ${languageData.language}?`,
          questionFr: `Comment dit-on "Hello" en ${languageData.language} ?`,
          questionNative: `Comment dit-on "Bonjour" ?`,
          options: [
            languageData.greetings.hello.text,
            languageData.greetings.goodbye.text,
            languageData.greetings.thankYou.text,
            languageData.greetings.goodEvening.text
          ],
          correct: languageData.greetings.hello.text,
          explanation: `"${languageData.greetings.hello.text}" is the standard greeting in ${languageData.language}`,
          explanationFr: `"${languageData.greetings.hello.text}" est la salutation standard en ${languageData.language}`,
          explanationNative: `"${languageData.greetings.hello.text}" est utilisé pour dire bonjour`,
          audioText: languageData.greetings.hello.text,
          pronunciation: languageData.greetings.hello.pronunciation,
          nativeLanguageText: languageData.greetings.hello.text,
          nativeLanguagePronunciation: languageData.greetings.hello.pronunciation,
          difficulty: 'easy'
        },
        {
          id: 2,
          type: 'listening',
          question: 'Listen and choose the correct meaning',
          questionFr: 'Écoutez et choisissez la bonne signification',
          questionNative: 'Écoutez et choisissez la signification',
          options: ['Hello', 'Goodbye', 'Thank you', 'Good evening'],
          correct: 'Thank you',
          explanation: `"${languageData.greetings.thankYou.text}" means "Thank you"`,
          explanationFr: `"${languageData.greetings.thankYou.text}" signifie "Merci"`,
          explanationNative: `"${languageData.greetings.thankYou.text}" veut dire merci`,
          audioText: languageData.greetings.thankYou.text,
          pronunciation: languageData.greetings.thankYou.pronunciation,
          nativeLanguageText: languageData.greetings.thankYou.text,
          nativeLanguagePronunciation: languageData.greetings.thankYou.pronunciation,
          difficulty: 'easy'
        },
        {
          id: 3,
          type: 'translation',
          question: `Translate: "How are you?" to ${languageData.language}`,
          questionFr: `Traduisez : "Comment allez-vous ?" en ${languageData.language}`,
          questionNative: 'Traduisez: "Comment allez-vous ?"',
          options: [
            languageData.greetings.howAreYou.text,
            languageData.greetings.hello.text,
            languageData.greetings.goodbye.text,
            languageData.greetings.thankYou.text
          ],
          correct: languageData.greetings.howAreYou.text,
          explanation: `This is how you ask about someone's wellbeing in ${languageData.language}`,
          explanationFr: `C'est ainsi qu'on demande le bien-être de quelqu'un en ${languageData.language}`,
          explanationNative: `C'est la façon de demander comment ça va`,
          audioText: languageData.greetings.howAreYou.text,
          pronunciation: languageData.greetings.howAreYou.pronunciation,
          nativeLanguageText: languageData.greetings.howAreYou.text,
          nativeLanguagePronunciation: languageData.greetings.howAreYou.pronunciation,
          difficulty: 'medium'
        }
      ]
    });

    // Generate Numbers lesson
    this.lessons.set('2', {
      id: '2',
      title: 'Numbers 1-5',
      titleFr: 'Nombres 1-5',
      titleNative: `Les nombres en ${languageData.language}`,
      description: `Learn numbers 1-5 in ${languageData.language}`,
      descriptionFr: `Apprenez les nombres 1-5 en ${languageData.language}`,
      descriptionNative: `Apprenez les premiers nombres`,
      category: 'numbers',
      difficulty: 'beginner',
      estimatedTime: 10,
      targetLanguage: selectedLanguage,
      vocabulary: Object.entries(languageData.numbers).slice(0, 5).map(([num, data], index) => ({
        word: (index + 1).toString(),
        translation: num,
        nativeWord: data.text,
        pronunciation: num,
        nativePronunciation: data.pronunciation,
        example: `Count: ${index + 1}`,
        exampleTranslation: `Compter: ${num}`,
        exampleNative: `${data.text}`
      })),
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: `How do you say "1" in ${languageData.language}?`,
          questionFr: `Comment dit-on "1" en ${languageData.language} ?`,
          questionNative: 'Comment dit-on "un" ?',
          options: [
            languageData.numbers['1'].text,
            languageData.numbers['2'].text,
            languageData.numbers['3'].text,
            languageData.numbers['4'].text
          ],
          correct: languageData.numbers['1'].text,
          explanation: `"${languageData.numbers['1'].text}" means "one" in ${languageData.language}`,
          explanationFr: `"${languageData.numbers['1'].text}" signifie "un" en ${languageData.language}`,
          explanationNative: `"${languageData.numbers['1'].text}" c'est le nombre un`,
          audioText: languageData.numbers['1'].text,
          pronunciation: languageData.numbers['1'].pronunciation,
          nativeLanguageText: languageData.numbers['1'].text,
          nativeLanguagePronunciation: languageData.numbers['1'].pronunciation,
          difficulty: 'easy'
        }
      ]
    });

    // Generate Cultural Context lesson
    this.lessons.set('3', {
      id: '3',
      title: 'Cultural Context',
      titleFr: 'Contexte culturel',
      titleNative: `Culture ${languageData.language}`,
      description: `Learn about ${languageData.language} culture and context`,
      descriptionFr: `Découvrez la culture et le contexte du ${languageData.language}`,
      descriptionNative: `Découvrez notre culture`,
      category: 'culture',
      difficulty: 'intermediate',
      estimatedTime: 20,
      targetLanguage: selectedLanguage,
      vocabulary: [
        {
          word: 'Region',
          translation: 'Région',
          nativeWord: 'Région',
          pronunciation: 'ray-zhee-OHN',
          nativePronunciation: 'ray-zhee-OHN',
          example: `${languageData.culturalContext.region}`,
          exampleTranslation: `${languageData.culturalContext.region}`,
          exampleNative: `${languageData.culturalContext.region}`
        }
      ],
      questions: [
        {
          id: 1,
          type: 'multiple-choice',
          question: `In which region is ${languageData.language} primarily spoken?`,
          questionFr: `Dans quelle région parle-t-on principalement le ${languageData.language} ?`,
          questionNative: 'Dans quelle région parlez-vous cette langue ?',
          options: [
            languageData.culturalContext.region,
            'Far North Region',
            'South Region',
            'Adamawa Region'
          ],
          correct: languageData.culturalContext.region,
          explanation: `${languageData.language} is primarily spoken in ${languageData.culturalContext.region}`,
          explanationFr: `Le ${languageData.language} est principalement parlé dans ${languageData.culturalContext.region}`,
          explanationNative: `Notre langue est parlée dans ${languageData.culturalContext.region}`,
          audioText: languageData.culturalContext.region,
          pronunciation: languageData.culturalContext.region,
          difficulty: 'medium'
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
