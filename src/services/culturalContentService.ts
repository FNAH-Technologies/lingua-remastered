
export interface CulturalEvent {
  id: string;
  name: string;
  nameFr: string;
  nameEwondo: string;
  date: string;
  description: string;
  descriptionFr: string;
  traditions: string[];
  region: string;
}

export interface CulturalTip {
  id: string;
  category: 'greeting' | 'family' | 'food' | 'tradition' | 'language';
  tip: string;
  tipFr: string;
  tipEwondo: string;
  culturalContext: string;
  audioUrl?: string;
}

export interface NativeSpeakerContent {
  id: string;
  speakerName: string;
  region: string;
  audioUrl: string;
  transcription: string;
  transcriptionEwondo: string;
  culturalNote: string;
}

class CulturalContentService {
  private culturalEvents: CulturalEvent[] = [
    {
      id: '1',
      name: 'Nguon Festival',
      nameFr: 'Festival Nguon',
      nameEwondo: 'Nguon',
      date: '2024-08-15',
      description: 'Traditional harvest celebration of the Bamoun people',
      descriptionFr: 'Célébration traditionnelle de la récolte du peuple Bamoun',
      traditions: ['Traditional dances', 'Cultural exhibitions', 'Community feasts'],
      region: 'West Cameroon'
    },
    {
      id: '2',
      name: 'Medzan Ceremony',
      nameFr: 'Cérémonie Medzan',
      nameEwondo: 'Medzan',
      date: '2024-09-20',
      description: 'Beti initiation ceremony for young adults',
      descriptionFr: 'Cérémonie d\'initiation Beti pour les jeunes adultes',
      traditions: ['Elder teachings', 'Traditional songs', 'Cultural wisdom sharing'],
      region: 'Central Cameroon'
    }
  ];

  private culturalTips: CulturalTip[] = [
    {
      id: '1',
      category: 'greeting',
      tip: 'Always greet elders first in traditional Ewondo culture',
      tipFr: 'Saluez toujours les aînés en premier dans la culture Ewondo traditionnelle',
      tipEwondo: 'Toloba mininga nnem va ndap Ewondo',
      culturalContext: 'Respect for elders is fundamental in Ewondo society'
    },
    {
      id: '2',
      category: 'family',
      tip: 'Extended family includes spiritual ancestors in Ewondo tradition',
      tipFr: 'La famille élargie inclut les ancêtres spirituels dans la tradition Ewondo',
      tipEwondo: 'Ndap eyong na bekukuma be nnem',
      culturalContext: 'Ancestors are considered active family members who guide the living'
    }
  ];

  private nativeSpeakerContent: NativeSpeakerContent[] = [
    {
      id: '1',
      speakerName: 'Mama Akono',
      region: 'Yaoundé, Cameroon',
      audioUrl: '/audio/mama-akono-greeting.mp3',
      transcription: 'Welcome to our beautiful Ewondo language',
      transcriptionEwondo: 'Akwaaba na kan Ewondo esili ye',
      culturalNote: 'Traditional greeting used by Ewondo elders'
    }
  ];

  getCulturalEvents(): CulturalEvent[] {
    return this.culturalEvents;
  }

  getCulturalTips(category?: string): CulturalTip[] {
    if (category) {
      return this.culturalTips.filter(tip => tip.category === category);
    }
    return this.culturalTips;
  }

  getNativeSpeakerContent(): NativeSpeakerContent[] {
    return this.nativeSpeakerContent;
  }

  getRandomCulturalTip(): CulturalTip {
    const randomIndex = Math.floor(Math.random() * this.culturalTips.length);
    return this.culturalTips[randomIndex];
  }

  getUpcomingEvents(): CulturalEvent[] {
    const today = new Date();
    return this.culturalEvents.filter(event => new Date(event.date) >= today);
  }
}

export const culturalContentService = new CulturalContentService();
