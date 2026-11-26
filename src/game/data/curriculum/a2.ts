import { cards, form, pool } from '../../courseCards';
import { a2Grammar } from '../grammar/a2';
import type { Level } from '../../exercises';

export const a2: Level = {
  title: 'Alltag organisieren',
  description: 'Verabrede dich, löse kleine Probleme und erzähle von deinem Alltag.',
  lessons: [
    {
      id: 'a2-termin', chapter: 'Im Viertel', title: 'Einen Termin verschieben',
      scene: 'Lea kann am Dienstag erst nach der Arbeit zur Fahrradwerkstatt.',
      rule: 'Mit „ab“ nennst du einen möglichen Anfang, mit „bis“ eine Grenze. Die höfliche Frage „Könnten wir …?“ macht einen Vorschlag.',
      exercises: [
        a2Grammar['a2-termin'][0],
        cards('Verschiebe den Termin höflich auf Donnerstag.', 'Könnten wir den Termin auf Donnerstag verschieben?', 'In der Ja/Nein-Frage steht „könnten“ zuerst, der Infinitiv am Ende.', [
          form('können', 'modal', 'Konjunktiv II · wir', {
            'Präsens · wir': 'können',
            'Konjunktiv II · wir': 'könnten',
            'Konjunktiv II · du': 'könntest',
          }),
          pool('pron.wir', { chosenCase: 'Nominativ', chosenPronoun: 'wir' }),
          form('der Termin', 'noun', 'Akkusativ', { Nominativ: 'der Termin', Akkusativ: 'den Termin', Dativ: 'dem Termin' }),
          'auf Donnerstag',
          'verschieben',
        ]),
        a2Grammar['a2-termin'][1],
      ],
    },
    {
      id: 'a2-weg', chapter: 'Im Viertel', title: 'Den Weg erklären',
      scene: 'Ein Nachbar sucht die Bibliothek.',
      rule: '„Bis zur“ zeigt das Ende eines Wegabschnitts. „An der Ampel“ nennt einen Ort, an dem etwas passiert.',
      exercises: [
        a2Grammar['a2-weg'][0],
        cards('Gib die Anweisung mit „abbiegen“.', 'Biegen Sie an der zweiten Ampel links ab.', 'Beim höflichen Imperativ stehen Verb und „Sie“ vorn, „ab“ am Ende.', [
          form('abbiegen', 'verb', 'Imperativ · Sie', {
            'Imperativ · du': 'bieg',
            'Imperativ · ihr': 'biegt',
            'Imperativ · Sie': 'biegen',
          }),
          pool('pron.sie_formal', { chosenCase: 'Nominativ', chosenPronoun: 'Sie' }),
          'an der zweiten Ampel',
          'links',
          'ab',
        ]),
        a2Grammar['a2-weg'][1],
      ],
    },
    {
      id: 'a2-umtausch', chapter: 'Im Viertel', title: 'Etwas umtauschen',
      scene: 'Die Schuhe aus dem Laden sind zu klein. Lea hat den Kassenbon noch.',
      rule: '„Zu“ vor einem Adjektiv meint hier „mehr als gewünscht“. Nach „weil“ steht das konjugierte Verb am Ende des Nebensatzes.',
      exercises: [
        a2Grammar['a2-umtausch'][0],
        cards('Bitte um ein größeres Paar.', 'Haben Sie dieses Modell auch eine Nummer größer?', '„Eine Nummer größer“ beschreibt die gewünschte Größe.', [
          pool('verb.haben', { chosenPerson: 'sie' }),
          pool('pron.sie_formal', { chosenCase: 'Nominativ', chosenPronoun: 'Sie' }),
          'dieses Modell',
          'auch',
          'eine Nummer',
          pool('adj.gross', { chosenAdjectiveDegree: 'comparative' }),
        ]),
        a2Grammar['a2-umtausch'][1],
      ],
    },
    {
      id: 'a2-wohnung', chapter: 'Im Viertel', title: 'Ortsangaben und Dativ',
      scene: 'Lea möchte näher an ihrem Arbeitsplatz wohnen und hat einen Hund.',
      rule: 'In Anzeigen geben „ab“, „inklusive“ und „nur“ Auskunft über Zeitpunkt, Preis und Einschränkungen.',
      exercises: [
        a2Grammar['a2-wohnung'][0],
        cards('Beschreibe die Lage der Wohnung.', 'Die Wohnung liegt in der Nähe vom Bahnhof.', '„In der Nähe von“ bezeichnet die Umgebung eines Ortes. „Vom“ bedeutet „von dem“.', [
          'Die Wohnung',
          form('liegen', 'verb', 'Präsens · sie (Singular)', {
            'Präsens · ich': 'liege',
            'Präsens · du': 'liegst',
            'Präsens · sie (Singular)': 'liegt',
          }),
          'in der Nähe',
          'vom Bahnhof',
        ]),
        a2Grammar['a2-wohnung'][1],
      ],
    },
    {
      id: 'a2-vergangenheit', chapter: 'Unterwegs', title: 'Vom Wochenende erzählen',
      scene: 'Eine Kollegin fragt Lea nach ihrem Ausflug.',
      rule: 'Bei „fahren“ mit Ortswechsel steht das Perfekt mit „sein“. „Besuchen“ bildet das Perfekt mit „haben“ und Partizip ohne ge-.',
      exercises: [
        a2Grammar['a2-vergangenheit'][0],
        cards('Erzähle vom Besuch bei deiner Freundin.', 'Am Samstag habe ich eine Freundin besucht.', 'Nach der Zeitangabe folgt „habe“. Das Partizip „besucht“ steht am Ende.', [
          'Am Samstag',
          pool('verb.haben', { chosenPerson: 'ich' }),
          pool('pron.ich', { chosenCase: 'Nominativ', chosenPronoun: 'ich' }),
          'eine Freundin',
          form('besuchen', 'verb', 'Partizip II', { Infinitiv: 'besuchen', 'Partizip I': 'besuchend', 'Partizip II': 'besucht' }),
        ]),
        a2Grammar['a2-vergangenheit'][1],
      ],
    },
    {
      id: 'a2-ansage', chapter: 'Unterwegs', title: 'Trennbare Verben und Reflexivpronomen',
      scene: 'Lea und Noah sind auf dem Weg zu einem Ausflug. Die Verbindung ändert sich.',
      rule: 'Unterscheide in Durchsagen die angekündigte Änderung von der Lösung. „Statt“ ersetzt etwas. „Voraussichtlich“ bezeichnet eine Erwartung.',
      exercises: [
        a2Grammar['a2-ansage'][0],
        cards('Informiere Noah über den neuen Treffpunkt.', 'Wir treffen uns um elf Uhr vor dem Haupteingang.', '„Sich treffen“ braucht bei „wir“ das Reflexivpronomen „uns“.', [
          pool('pron.wir', { chosenCase: 'Nominativ', chosenPronoun: 'wir' }),
          'treffen',
          form('sich', 'pronoun', 'wir · Akkusativ', {
            'ich · Akkusativ': 'mich',
            'du · Akkusativ': 'dich',
            'wir · Akkusativ': 'uns',
            'ihr · Akkusativ': 'euch',
          }),
          'um elf Uhr',
          'vor dem Haupteingang',
        ]),
        a2Grammar['a2-ansage'][1],
      ],
    },
    {
      id: 'a2-apotheke', chapter: 'Unterwegs', title: 'Beschwerden beschreiben',
      scene: 'Lea übt ein Gespräch in der Apotheke.',
      rule: 'Für eine Beschwerde, die noch besteht, steht nach „seit“ oft Präsens. „Seit“ verlangt den Dativ.',
      exercises: [
        a2Grammar['a2-apotheke'][0],
        cards('Frage in der Apotheke nach einem Mittel gegen Husten.', 'Haben Sie etwas gegen Husten?', 'Nach „gegen“ steht Akkusativ. Ohne Artikel bleibt „Husten“ hier unverändert.', [
          pool('verb.haben', { chosenPerson: 'sie' }),
          pool('pron.sie_formal', { chosenCase: 'Nominativ', chosenPronoun: 'Sie' }),
          'etwas',
          'gegen Husten',
        ]),
        a2Grammar['a2-apotheke'][1],
      ],
    },
    {
      id: 'a2-einladung', chapter: 'Pläne und Absprachen', title: 'Indirekte Fragen mit „ob“',
      scene: 'Noah lädt Lea am Samstag ein. Lea arbeitet bis 18 Uhr.',
      rule: '„Ob“ leitet eine indirekte Ja/Nein-Frage ein. Beim Vorschlag mit „können“ steht der Infinitiv am Schluss.',
      exercises: [
        a2Grammar['a2-einladung'][0],
        cards('Frag nach, ob du später kommen kannst.', 'Sag mir bitte, ob ich auch später kommen kann.', 'Nach „ob“ steht „kann“ am Ende.', [
          'Sag mir bitte,',
          'ob',
          pool('pron.ich', { chosenCase: 'Nominativ', chosenPronoun: 'ich' }),
          'auch später',
          pool('verb.kommen', { chosenVerbForm: 'infinitive' }),
          pool('modal.koennen', { chosenPerson: 'ich' }),
        ]),
        a2Grammar['a2-einladung'][1],
      ],
    },
    {
      id: 'a2-arbeitsplan', chapter: 'Pläne und Absprachen', title: 'Einen Dienst tauschen',
      scene: 'Lea und ihre Kollegin brauchen eine faire Lösung für zwei Schichten.',
      rule: '„Übernehmen“ heißt hier, die Aufgabe einer anderen Person zu erledigen. Mit „dafür“ stellst du die Gegenleistung vor.',
      exercises: [
        a2Grammar['a2-arbeitsplan'][0],
        cards('Frag Noah höflich nach dem Tausch.', 'Könntest du am Mittwoch für mich arbeiten?', '„Könntest du …?“ ist eine höfliche Bitte unter Kollegen.', [
          form('können', 'modal', 'Konjunktiv II · du', {
            'Präsens · du': 'kannst',
            'Konjunktiv II · du': 'könntest',
            'Konjunktiv II · wir': 'könnten',
          }),
          pool('pron.du', { chosenCase: 'Nominativ', chosenPronoun: 'du' }),
          'am Mittwoch',
          'für',
          pool('pron.ich', { chosenCase: 'Akkusativ', chosenPronoun: 'ich' }),
          'arbeiten',
        ]),
        a2Grammar['a2-arbeitsplan'][1],
      ],
    },
    {
      id: 'a2-abschluss', chapter: 'Pläne und Absprachen', title: 'Abschluss · Einen Ausflug planen',
      scene: 'Die Gruppe will einen Tagesausflug machen. Der Veranstalter meldet eine Änderung.',
      rule: 'Bestätige eine Abmachung mit den wichtigen Angaben. Falls etwas geändert wird, nenne den Grund und die neue Lösung.',
      exercises: [
        a2Grammar['a2-abschluss'][0],
        cards('Begründe, warum die Gruppe zuerst ins Museum geht.', 'Wir gehen zuerst ins Museum, weil es regnet.', 'Das Komma steht zwischen Haupt- und Nebensatz. „Regnet“ schließt den weil-Satz ab.', [
          pool('pron.wir', { chosenCase: 'Nominativ', chosenPronoun: 'wir' }),
          pool('verb.gehen', { chosenPerson: 'wir' }),
          'zuerst ins Museum,',
          'weil',
          'es',
          form('regnen', 'verb', 'Präsens · es', { 'Präsens · es': 'regnet', 'Präteritum · es': 'regnete', 'Partizip II': 'geregnet' }),
        ]),
        a2Grammar['a2-abschluss'][1],
      ],
    },
  ],
};
