// Ethnic Language Data for Cameroon
export interface EthnicLanguageContent {
  language: string;
  greetings: {
    hello: { text: string; pronunciation: string; },
    goodbye: { text: string; pronunciation: string; },
    goodMorning: { text: string; pronunciation: string; },
    goodEvening: { text: string; pronunciation: string; },
    thankYou: { text: string; pronunciation: string; },
    howAreYou: { text: string; pronunciation: string; }
  };
  numbers: {
    [key: string]: { text: string; pronunciation: string; }
  };
  basicPhrases: {
    [key: string]: { text: string; pronunciation: string; meaning: string; }
  };
  culturalContext: {
    region: string;
    speakers: string;
    significance: string;
  };
}

export const ethnicLanguagesData: Record<string, EthnicLanguageContent> = {
  'Ewondo (Centre)': {
    language: 'Ewondo',
    greetings: {
      hello: { text: 'Mbolo', pronunciation: 'mm-BOH-loh' },
      goodbye: { text: 'A biama', pronunciation: 'ah bee-AH-mah' },
      goodMorning: { text: 'Mbolo a nkukuma', pronunciation: 'mm-BOH-loh ah nn-koo-KOO-mah' },
      goodEvening: { text: 'Mbolo a ngon', pronunciation: 'mm-BOH-loh ah nn-GOHN' },
      thankYou: { text: 'Akiba', pronunciation: 'ah-KEE-bah' },
      howAreYou: { text: 'Nga nge be?', pronunciation: 'nn-GAH nn-geh BEH' }
    },
    numbers: {
      '1': { text: 'fok', pronunciation: 'FOHK' },
      '2': { text: 'iba', pronunciation: 'EE-bah' },
      '3': { text: 'ila', pronunciation: 'EE-lah' },
      '4': { text: 'inai', pronunciation: 'ee-NAH-ee' },
      '5': { text: 'itan', pronunciation: 'ee-TAHN' }
    },
    basicPhrases: {
      'what_is_your_name': { 
        text: 'Ndze dze nga?', 
        pronunciation: 'nn-DZEH dzeh nn-GAH', 
        meaning: 'What is your name?' 
      },
      'my_name_is': { 
        text: 'Mam ma dze...', 
        pronunciation: 'MAHM mah DZEH', 
        meaning: 'My name is...' 
      },
      'please': { 
        text: 'Nga feghe', 
        pronunciation: 'nn-GAH feh-GHEH', 
        meaning: 'Please' 
      }
    },
    culturalContext: {
      region: 'Centre Region',
      speakers: '~1.2 million speakers',
      significance: 'One of the most widely spoken Bantu languages in Cameroon, centered around Yaoundé'
    }
  },
  'Duala (Littoral)': {
    language: 'Duala',
    greetings: {
      hello: { text: 'Moiso', pronunciation: 'moh-EE-soh' },
      goodbye: { text: 'Na nyango', pronunciation: 'nah nn-YAHN-goh' },
      goodMorning: { text: 'Moiso a mudumba', pronunciation: 'moh-EE-soh ah moo-DOOM-bah' },
      goodEvening: { text: 'Moiso a mpamba', pronunciation: 'moh-EE-soh ah mm-PAHM-bah' },
      thankYou: { text: 'Bonam', pronunciation: 'boh-NAHM' },
      howAreYou: { text: 'Oyokani?', pronunciation: 'oh-yoh-KAH-nee' }
    },
    numbers: {
      '1': { text: 'moi', pronunciation: 'MOH-ee' },
      '2': { text: 'iba', pronunciation: 'EE-bah' },
      '3': { text: 'lalo', pronunciation: 'LAH-loh' },
      '4': { text: 'nai', pronunciation: 'NAH-ee' },
      '5': { text: 'tano', pronunciation: 'TAH-noh' }
    },
    basicPhrases: {
      'what_is_your_name': { 
        text: 'Ndina nyango nde?', 
        pronunciation: 'nn-DEE-nah nn-YAHN-goh nn-DEH', 
        meaning: 'What is your name?' 
      },
      'my_name_is': { 
        text: 'Ndina nam na...', 
        pronunciation: 'nn-DEE-nah nahm nah', 
        meaning: 'My name is...' 
      },
      'please': { 
        text: 'Na mbongo', 
        pronunciation: 'nah mm-BOHN-goh', 
        meaning: 'Please' 
      }
    },
    culturalContext: {
      region: 'Littoral Region',
      speakers: '~1.5 million speakers',
      significance: 'Major trading language along the coast, historically important for commerce'
    }
  },
  'Bamiléké (Ouest)': {
    language: 'Bamiléké',
    greetings: {
      hello: { text: 'Kou nou', pronunciation: 'KOH noo' },
      goodbye: { text: 'Kamsi', pronunciation: 'KAHM-see' },
      goodMorning: { text: 'Dji matin', pronunciation: 'djee mah-TEEN' },
      goodEvening: { text: 'Dji soir', pronunciation: 'djee SWAHR' },
      thankYou: { text: 'Mèci', pronunciation: 'MEH-see' },
      howAreYou: { text: 'I ya nô?', pronunciation: 'ee yah NOH' }
    },
    numbers: {
      '1': { text: 'posi', pronunciation: 'POH-see' },
      '2': { text: 'iba', pronunciation: 'EE-bah' },
      '3': { text: 'itat', pronunciation: 'ee-TAHT' },
      '4': { text: 'inai', pronunciation: 'ee-NAH-ee' },
      '5': { text: 'itaano', pronunciation: 'ee-TAH-noh' }
    },
    basicPhrases: {
      'what_is_your_name': { 
        text: 'I rɛ li?', 
        pronunciation: 'ee reh LEE', 
        meaning: 'What is your name?' 
      },
      'my_name_is': { 
        text: 'Mɛ rɛ na...', 
        pronunciation: 'meh reh nah', 
        meaning: 'My name is...' 
      },
      'please': { 
        text: 'Biko', 
        pronunciation: 'BEE-koh', 
        meaning: 'Please' 
      }
    },
    culturalContext: {
      region: 'West Region',
      speakers: '~3 million speakers',
      significance: 'Major ethnic group known for entrepreneurship and cultural richness'
    }
  },
  'Fulfulde (Nord)': {
    language: 'Fulfulde',
    greetings: {
      hello: { text: 'Sannu', pronunciation: 'SAHN-noo' },
      goodbye: { text: 'Hay salkida', pronunciation: 'HAH-ee sahl-KEE-dah' },
      goodMorning: { text: 'Jam weeti', pronunciation: 'jahm WEH-tee' },
      goodEvening: { text: 'Jam hiiri', pronunciation: 'jahm HEE-ree' },
      thankYou: { text: 'A jaarama', pronunciation: 'ah jah-RAH-mah' },
      howAreYou: { text: 'No mbada?', pronunciation: 'noh mm-BAH-dah' }
    },
    numbers: {
      '1': { text: 'go\'o', pronunciation: 'GOH-oh' },
      '2': { text: 'ɗiɗi', pronunciation: 'DEE-dee' },
      '3': { text: 'tati', pronunciation: 'TAH-tee' },
      '4': { text: 'nayi', pronunciation: 'NAH-yee' },
      '5': { text: 'joyi', pronunciation: 'JOH-yee' }
    },
    basicPhrases: {
      'what_is_your_name': { 
        text: 'Innde maa ko?', 
        pronunciation: 'EEN-ndeh mah KOH', 
        meaning: 'What is your name?' 
      },
      'my_name_is': { 
        text: 'Innde am na...', 
        pronunciation: 'EEN-ndeh ahm nah', 
        meaning: 'My name is...' 
      },
      'please': { 
        text: 'Baɗte', 
        pronunciation: 'BAHD-teh', 
        meaning: 'Please' 
      }
    },
    culturalContext: {
      region: 'North Region',
      speakers: '~2 million speakers',
      significance: 'Pastoral people traditionally involved in cattle herding and trade'
    }
  },
  'Bassa (Centre/Littoral)': {
    language: 'Bassa',
    greetings: {
      hello: { text: 'Mbem', pronunciation: 'mm-BEHM' },
      goodbye: { text: 'Yén', pronunciation: 'YEHN' },
      goodMorning: { text: 'Mbem a mut', pronunciation: 'mm-BEHM ah MOOT' },
      goodEvening: { text: 'Mbem a nkié', pronunciation: 'mm-BEHM ah nn-KEEH' },
      thankYou: { text: 'Ussé', pronunciation: 'oos-SEH' },
      howAreYou: { text: 'I dyé kés?', pronunciation: 'ee dyeh KEHS' }
    },
    numbers: {
      '1': { text: 'bos', pronunciation: 'BOHS' },
      '2': { text: 'iba', pronunciation: 'EE-bah' },
      '3': { text: 'irar', pronunciation: 'ee-RAHR' },
      '4': { text: 'inai', pronunciation: 'ee-NAH-ee' },
      '5': { text: 'itan', pronunciation: 'ee-TAHN' }
    },
    basicPhrases: {
      'what_is_your_name': { 
        text: 'Dzom dyôk nde?', 
        pronunciation: 'dzohm dyohk nn-DEH', 
        meaning: 'What is your name?' 
      },
      'my_name_is': { 
        text: 'Dzom djam na...', 
        pronunciation: 'dzohm djahm nah', 
        meaning: 'My name is...' 
      },
      'please': { 
        text: 'Bi hiöl', 
        pronunciation: 'bee hee-OHL', 
        meaning: 'Please' 
      }
    },
    culturalContext: {
      region: 'Centre and Littoral Regions',
      speakers: '~800,000 speakers',
      significance: 'Ancient Bantu group with rich oral traditions and cultural practices'
    }
  }
};

export const getLanguageCode = (fullLanguageName: string): string => {
  return fullLanguageName.split(' ')[0].toLowerCase();
};

export const getLanguageData = (selectedLanguage: string): EthnicLanguageContent | null => {
  return ethnicLanguagesData[selectedLanguage] || null;
};