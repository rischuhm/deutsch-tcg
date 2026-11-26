import { cards, form, pool } from '../../courseCards';
import { b1Grammar } from '../grammar/b1';
import type { Level } from '../../exercises';

export const b1: Level = {
  title: 'Selbstständig unterwegs',
  description: 'Erzähle zusammenhängend, begründe Entscheidungen und kläre Probleme.',
  lessons: [
    {
      id: 'b1-reisebericht', chapter: 'Erlebnisse und Pläne', title: 'Eine Panne erzählen',
      scene: 'Noah berichtet von einer Reise, bei der vieles anders lief als geplant.',
      rule: 'Ein einmaliges Ereignis in der Vergangenheit kannst du mit „als“ einleiten. Bei wiederkehrenden Ereignissen passt „immer wenn“.',
      exercises: [
        b1Grammar['b1-reisebericht'][0],
        cards('Beginne mit dem Zeitsatz.', 'Als ich am Hotel ankam, warteten schon zwei Gäste vor dem Eingang.', 'Der als-Satz besetzt die erste Position des Hauptsatzes. Danach folgt „warteten“.', [
          'Als ich am Hotel ankam,',
          form('warten', 'verb', 'Präteritum · sie (Plural)', {
            'Präsens · sie (Plural)': 'warten',
            'Präteritum · sie (Singular)': 'wartete',
            'Präteritum · sie (Plural)': 'warteten',
          }),
          'schon zwei Gäste',
          'vor dem Eingang',
        ]),
        b1Grammar['b1-reisebericht'][1],
      ],
    },
    {
      id: 'b1-reklamation', chapter: 'Erlebnisse und Pläne', title: 'Eine Reklamation schreiben',
      scene: 'Ein Ersatzgerät kam an, aber das gleiche Problem trat erneut auf.',
      rule: 'Eine verständliche Reklamation nennt den Vorgang, beschreibt den Mangel und sagt klar, welche Lösung gewünscht ist.',
      exercises: [
        b1Grammar['b1-reklamation'][0],
        cards('Verbinde beide Aussagen mit einem Nebensatz mit „obwohl“.', 'Obwohl ich das Gerät geladen habe, lässt es sich nicht einschalten.', '„Obwohl“ nennt einen Umstand, der ein anderes Ergebnis erwarten lässt.', [
          'Obwohl',
          'ich das Gerät',
          form('laden', 'verb', 'Partizip II', { Infinitiv: 'laden', 'Partizip I': 'ladend', 'Partizip II': 'geladen' }),
          pool('verb.haben', { chosenPerson: 'ich' }, { punctuation: ',' }),
          'lässt es sich',
          'nicht einschalten',
        ]),
        b1Grammar['b1-reklamation'][1],
      ],
    },
    {
      id: 'b1-kurswahl', chapter: 'Erlebnisse und Pläne', title: 'Eine Wahl begründen',
      scene: 'Lea vergleicht zwei Weiterbildungskurse.',
      rule: '„Deshalb“ bezeichnet eine Folge und kann im Hauptsatz vorn stehen. Dann folgt gleich das finite Verb.',
      exercises: [
        b1Grammar['b1-kurswahl'][0],
        cards('Formuliere eine begründete Entscheidung. Beginne mit „Deshalb“.', 'Deshalb entscheide ich mich für Kurs B.', 'Steht „deshalb“ vorn, folgt „entscheide“ auf Position zwei.', [
          'Deshalb',
          form('entscheiden', 'verb', 'Präsens · ich', {
            'Präsens · ich': 'entscheide',
            'Präsens · du': 'entscheidest',
            'Präsens · er': 'entscheidet',
          }),
          pool('pron.ich', { chosenCase: 'Nominativ', chosenPronoun: 'ich' }),
          'mich',
          'für Kurs B',
        ]),
        b1Grammar['b1-kurswahl'][1],
      ],
    },
    {
      id: 'b1-ziel', chapter: 'Erlebnisse und Pläne', title: 'Über ein Ziel sprechen',
      scene: 'Noah will mehr mit Menschen arbeiten und spricht über seine beruflichen Pläne.',
      rule: '„Um … zu“ drückt ein Ziel bei gleichem Subjekt aus. Mit „damit“ kannst du auch ein anderes Subjekt nennen.',
      exercises: [
        b1Grammar['b1-ziel'][0],
        cards('Nenne Noahs Ziel mit „um … zu“.', 'Ich absolviere ein Praktikum, um den Beruf besser kennenzulernen.', 'Bei „kennenlernen“ steht „zu“ zwischen den Verbteilen.', [
          'Ich absolviere ein Praktikum,',
          'um',
          'den Beruf',
          'besser',
          form('kennenlernen', 'verb', 'Infinitiv mit zu', {
            Infinitiv: 'kennenlernen',
            'Infinitiv mit zu': 'kennenzulernen',
            'Partizip II': 'kennengelernt',
          }),
        ]),
        b1Grammar['b1-ziel'][1],
      ],
    },
    {
      id: 'b1-nachricht', chapter: 'Arbeit und Öffentlichkeit', title: 'Indirekte Fragen am Arbeitsplatz',
      scene: 'Eine Kollegin war bei der Teambesprechung nicht dabei.',
      rule: 'Unterscheide Beschluss, Bedingung und offenen Punkt. Indirekte Fragen leitet man mit einem Fragewort oder „ob“ ein.',
      exercises: [
        b1Grammar['b1-nachricht'][0],
        cards('Formuliere die offene Frage indirekt.', 'Es ist noch offen, ob am Freitag eine zusätzliche Schicht nötig ist.', 'Die indirekte Frage mit „ob“ endet mit dem finiten Verb.', [
          'Es ist noch offen,',
          'ob',
          'am Freitag',
          'eine zusätzliche Schicht',
          'nötig',
          pool('verb.sein', { chosenPerson: 'er' }),
        ]),
        b1Grammar['b1-nachricht'][1],
      ],
    },
    {
      id: 'b1-mitmachen', chapter: 'Arbeit und Öffentlichkeit', title: 'Relativpronomen im richtigen Fall',
      scene: 'Lea sucht für einen Freund ein passendes Ehrenamt.',
      rule: 'Relativsätze erklären ein Nomen näher. Den Fall des Relativpronomens bestimmt seine Aufgabe im Relativsatz.',
      exercises: [
        b1Grammar['b1-mitmachen'][0],
        cards('Beschreibe die Person näher.', 'Das ist die Frau, die das Reparaturcafé organisiert.', '„Die“ ist das Subjekt von „organisiert“.', [
          'Das ist die Frau,',
          form('Relativpronomen · feminin', 'pronoun', 'Nominativ', {
            Nominativ: 'die',
            Akkusativ: 'die',
            Dativ: 'der',
            Genitiv: 'deren',
          }),
          'das Reparaturcafé',
          'organisiert',
        ]),
        b1Grammar['b1-mitmachen'][1],
      ],
    },
    {
      id: 'b1-hausordnung', chapter: 'Arbeit und Öffentlichkeit', title: 'Regeln ohne handelnde Person erklären',
      scene: 'Am Eingang eines Gemeinschaftsraums hängen neue Regeln.',
      rule: 'Das Vorgangspassiv im Präsens besteht aus „werden“ und Partizip II. Der Vorgang steht im Mittelpunkt.',
      exercises: [
        b1Grammar['b1-hausordnung'][0],
        cards('Beschreibe den Vorgang im Passiv.', 'Die Tische werden nach der Veranstaltung gereinigt.', 'Das Partizip „gereinigt“ schließt die Satzklammer.', [
          pool('noun.tisch', { chosenCase: 'Nominativ' }, { plural: true }),
          form('werden', 'verb', 'Präsens · sie (Plural)', {
            'Präsens · ich': 'werde',
            'Präsens · er / sie / es': 'wird',
            'Präsens · sie (Plural)': 'werden',
          }),
          'nach der Veranstaltung',
          form('reinigen', 'verb', 'Partizip II', { Infinitiv: 'reinigen', 'Partizip I': 'reinigend', 'Partizip II': 'gereinigt' }),
        ]),
        b1Grammar['b1-hausordnung'][1],
      ],
    },
    {
      id: 'b1-konflikt', chapter: 'Meinung und Zusammenarbeit', title: 'Einen Konflikt entschärfen',
      scene: 'Die Nachbarin beschwert sich über laute Musik.',
      rule: 'Geh zuerst auf das Anliegen ein. Konjunktiv II hilft, einen Vorschlag höflich einzubringen.',
      exercises: [
        b1Grammar['b1-konflikt'][0],
        cards('Formuliere einen Gegenvorschlag.', 'Wir könnten uns darauf einigen, dass ab zehn Uhr Ruhe ist.', 'Der dass-Satz nennt den Inhalt der Vereinbarung.', [
          pool('pron.wir', { chosenCase: 'Nominativ', chosenPronoun: 'wir' }),
          form('können', 'modal', 'Konjunktiv II · wir', {
            'Präsens · wir': 'können',
            'Konjunktiv II · ich': 'könnte',
            'Konjunktiv II · wir': 'könnten',
          }),
          'uns',
          'darauf einigen,',
          'dass ab zehn Uhr',
          'Ruhe ist',
        ]),
        b1Grammar['b1-konflikt'][1],
      ],
    },
    {
      id: 'b1-forum', chapter: 'Meinung und Zusammenarbeit', title: 'In einem Forum Stellung nehmen',
      scene: 'Im Stadtteilforum wird über einen autofreien Sonntag diskutiert.',
      rule: 'Eine kurze Stellungnahme braucht eine Position und einen Grund. „Trotzdem“ führt zu einer Aussage, die angesichts des vorherigen Satzes überrascht.',
      exercises: [
        b1Grammar['b1-forum'][0],
        cards('Formuliere die Position mit „meiner Meinung nach“ am Anfang.', 'Meiner Meinung nach sollte die Stadt den Vorschlag ausprobieren.', 'Nach der vorangestellten Angabe steht „sollte“.', [
          'Meiner Meinung nach',
          form('sollen', 'modal', 'Konjunktiv II · sie (Singular)', {
            'Präsens · sie (Singular)': 'soll',
            'Konjunktiv II · sie (Singular)': 'sollte',
            'Konjunktiv II · sie (Plural)': 'sollten',
          }),
          'die Stadt',
          'den Vorschlag',
          'ausprobieren',
        ]),
        b1Grammar['b1-forum'][1],
      ],
    },
    {
      id: 'b1-abschluss', chapter: 'Meinung und Zusammenarbeit', title: 'Abschluss · Einen Vorschlag vermitteln',
      scene: 'Eine Gruppe plant eine Veranstaltung. Du fasst die Diskussion für ein abwesendes Mitglied zusammen.',
      rule: 'Trenne sicher Beschlossenes von Vorschlägen. Gib die Gründe so weiter, dass die andere Person entscheiden kann.',
      exercises: [
        b1Grammar['b1-abschluss'][0],
        cards('Beschreibe die Alternative mit einer Bedingung.', 'Falls das Rathaus nicht frei ist, fragen wir im Jugendzentrum nach.', 'Der Hauptsatz beginnt nach dem vorangestellten Nebensatz mit „fragen“.', [
          'Falls',
          'das Rathaus nicht frei',
          pool('verb.sein', { chosenPerson: 'er' }, { punctuation: ',' }),
          form('nachfragen', 'verb', 'Präsens · wir', {
            'Präsens · ich': 'frage',
            'Präsens · du': 'fragst',
            'Präsens · wir': 'fragen',
          }),
          pool('pron.wir', { chosenCase: 'Nominativ', chosenPronoun: 'wir' }),
          'im Jugendzentrum',
          'nach',
        ]),
        b1Grammar['b1-abschluss'][1],
      ],
    },
  ],
};
