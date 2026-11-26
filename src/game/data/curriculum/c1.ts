import { cards, form, pool } from '../../courseCards';
import { c1Grammar } from '../grammar/c1';
import type { Level } from '../../exercises';

export const c1: Level = {
  title: 'Zwischentöne und komplexe Texte',
  description: 'Formuliere präzise mit komplexen Nebensätzen, Partizipialattributen und passenden Verbformen.',
  lessons: [
    {
      id: 'c1-diplomatie', chapter: 'Zwischentöne und Register', title: 'Förmliche Bedingungen und Absagen',
      scene: 'Nach einer Ideenrunde erhält Mara die Antwort eines langjährigen Partners.',
      rule: 'Höfliche Gesprächsangebote und unverbindliche Bedingungen können eine Ablehnung abfedern. Entscheidend ist, welche konkrete Zusage fehlt.',
      exercises: [
        c1Grammar['c1-diplomatie'][0],
        cards('Beginne mit einer förmlichen Bedingung ohne „wenn“.', 'Sollten sich die Rahmenbedingungen ändern, wären wir bereit, das Gespräch erneut aufzunehmen.', 'Der konditionale Nebensatz beginnt mit dem finiten „sollten“.', [
          form('sollen', 'modal', 'Konjunktiv II · sie (Plural)', {
            'Präsens · sie (Plural)': 'sollen',
            'Konjunktiv II · sie (Singular)': 'sollte',
            'Konjunktiv II · sie (Plural)': 'sollten',
          }),
          'sich die Rahmenbedingungen ändern,',
          form('sein', 'verb', 'Konjunktiv II · wir', {
            'Präsens · wir': 'sind',
            'Präteritum · wir': 'waren',
            'Konjunktiv II · wir': 'wären',
          }),
          'wir bereit,',
          'das Gespräch',
          'erneut aufzunehmen',
        ]),
        c1Grammar['c1-diplomatie'][1],
      ],
    },
    {
      id: 'c1-ironisch', chapter: 'Zwischentöne und Register', title: 'Adjektivendungen im Plural',
      scene: 'Ein Kollegenteam bespricht die Zugänglichkeit eines neuen Onlineformulars.',
      rule: 'Ironie kann aus dem Konflikt zwischen positivem Wortlaut und einem klar negativen Sachverhalt entstehen. Die Deutung braucht Kontext.',
      exercises: [
        c1Grammar['c1-ironisch'][0],
        cards('Formuliere die Kritik für ein sachliches Protokoll.', 'Das Verfahren schafft durch die Nachweispflichten zusätzliche Zugangshürden.', 'Die sachliche Formulierung benennt den Mechanismus hinter der Kritik.', [
          'Das Verfahren',
          'schafft',
          'durch die Nachweispflichten',
          form('zusätzlich', 'adjective', 'Akkusativ Plural ohne Artikel', {
            'Akkusativ Plural ohne Artikel': 'zusätzliche',
            'Dativ Plural ohne Artikel': 'zusätzlichen',
            'Genitiv Plural ohne Artikel': 'zusätzlicher',
          }),
          'Zugangshürden',
        ]),
        c1Grammar['c1-ironisch'][1],
      ],
    },
    {
      id: 'c1-register', chapter: 'Zwischentöne und Register', title: 'Eine Fachinformation vermitteln',
      scene: 'Ein Forschungsprojekt will die Ergebnisse einer Befragung verständlich veröffentlichen.',
      rule: 'Beim Registerwechsel müssen Reichweite und Unsicherheit der Aussage erhalten bleiben. Erkläre Fachbegriffe über ihre Folgen.',
      exercises: [
        c1Grammar['c1-register'][0],
        cards('Ordne die formelle Einschränkung mit „inwieweit“.', 'Inwieweit der Befund auf andere Gruppen übertragbar ist, bleibt zu prüfen.', 'Die indirekte Frage steht als Einheit vor dem Prädikat „bleibt zu prüfen“.', [
          'Inwieweit',
          'der Befund',
          'auf andere Gruppen',
          'übertragbar',
          pool('verb.sein', { chosenPerson: 'er' }, { punctuation: ',' }),
          'bleibt zu prüfen',
        ]),
        c1Grammar['c1-register'][1],
      ],
    },
    {
      id: 'c1-attribution', chapter: 'Zwischentöne und Register', title: 'Eine verdichtete Formulierung auflösen',
      scene: 'Ein Verwaltungstext enthält ein umfangreiches Attribut, das beim ersten Lesen schwer zuzuordnen ist.',
      rule: 'Partizipialattribute lassen sich oft in Relativsätze umformen. Prüfe dabei, worauf das Attribut bezogen ist und ob ein Vorgang oder eine Verpflichtung beschrieben wird.',
      exercises: [
        c1Grammar['c1-attribution'][0],
        cards('Formuliere die Vorschrift mit einem Relativsatz.', 'Die Stellungnahmen, die bis Montag eingereicht werden müssen, werden anschließend gesichtet.', 'Der Relativsatz steht zwischen zwei Kommas.', [
          'Die Stellungnahmen,',
          'die bis Montag',
          form('einreichen', 'verb', 'Partizip II', {
            Infinitiv: 'einreichen',
            'Infinitiv mit zu': 'einzureichen',
            'Partizip II': 'eingereicht',
          }),
          'werden müssen,',
          'werden anschließend',
          form('sichten', 'verb', 'Partizip II', { Infinitiv: 'sichten', 'Partizip I': 'sichtend', 'Partizip II': 'gesichtet' }),
        ]),
        c1Grammar['c1-attribution'][1],
      ],
    },
    {
      id: 'c1-prognose', chapter: 'Quellen und Schlussfolgerungen', title: 'Den Geltungsanspruch einer Prognose prüfen',
      scene: 'Eine Expertin wird in einer Anhörung gefragt, ob die Investition Einsparungen bringen werde.',
      rule: 'Unterscheide eine Prognose von einer Zusicherung. Konditionale Formulierungen binden die Folgerung an überprüfbare Annahmen.',
      exercises: [
        c1Grammar['c1-prognose'][0],
        cards('Formuliere die Bedingung und die Folgerung.', 'Vorausgesetzt, die Auslastung erreicht siebzig Prozent, ließe sich mittelfristig mit Einsparungen rechnen.', 'Der Konjunktiv „ließe“ passt zur bedingten Folgerung.', [
          'Vorausgesetzt,',
          'die Auslastung erreicht siebzig Prozent,',
          form('lassen', 'verb', 'Konjunktiv II · es', {
            'Präsens · es': 'lässt',
            'Präteritum · es': 'ließ',
            'Konjunktiv II · es': 'ließe',
          }),
          'sich',
          'mittelfristig',
          'mit Einsparungen rechnen',
        ]),
        c1Grammar['c1-prognose'][1],
      ],
    },
    {
      id: 'c1-synthese', chapter: 'Quellen und Schlussfolgerungen', title: 'Zwei Quellen mit unterschiedlichen Maßstäben verbinden',
      scene: 'Ein Bericht der Verwaltung und eine Stellungnahme eines Vereins bewerten dieselbe Parkregelung.',
      rule: 'Scheinbare Widersprüche können auf unterschiedlichen Kriterien beruhen. Benenne die Kriterien, bevor du die Bewertungen vergleichst.',
      exercises: [
        c1Grammar['c1-synthese'][0],
        cards('Verbinde die Bewertungen mit einem Kontrast.', 'Die Maßnahme verkürzt zwar die Parkplatzsuche, geht aber mit erschwertem Zugang zum Pflegeheim einher.', '„Mit etwas einhergehen“ beschreibt ein begleitendes Phänomen.', [
          'Die Maßnahme',
          'verkürzt zwar die Parkplatzsuche,',
          'geht aber',
          'mit',
          form('erschwerter Zugang', 'noun', 'Dativ', {
            Nominativ: 'erschwerter Zugang',
            Akkusativ: 'erschwerten Zugang',
            Dativ: 'erschwertem Zugang',
            Genitiv: 'erschwerten Zugangs',
          }),
          'zum Pflegeheim',
          'einher',
        ]),
        c1Grammar['c1-synthese'][1],
      ],
    },
    {
      id: 'c1-konzession', chapter: 'Quellen und Schlussfolgerungen', title: 'Reichweite eines Arguments einschränken',
      scene: 'In einer Stellungnahme wird diskutiert, ob eine Maßnahme allein zum Ziel führt.',
      rule: '„Wenngleich“ räumt einen Umstand ein. Formulierungen wie „für sich genommen“ begrenzen, welche Wirkung zugeschrieben wird.',
      exercises: [
        c1Grammar['c1-konzession'][0],
        cards('Ordne die Einräumung mit „wenngleich“.', 'Wenngleich die Kampagne Aufmerksamkeit erzeugen dürfte, wären weitere Maßnahmen erforderlich.', 'Nach dem vorangestellten Einräumungssatz steht „wären“ zuerst im Hauptsatz.', [
          'Wenngleich',
          'die Kampagne Aufmerksamkeit erzeugen dürfte,',
          form('sein', 'verb', 'Konjunktiv II · sie (Plural)', {
            'Präsens · sie (Plural)': 'sind',
            'Präteritum · sie (Plural)': 'waren',
            'Konjunktiv II · sie (Plural)': 'wären',
          }),
          'weitere Maßnahmen',
          'erforderlich',
        ]),
        c1Grammar['c1-konzession'][1],
      ],
    },
    {
      id: 'c1-jedoch', chapter: 'Strategie und Transfer', title: 'Einen Gedankengang gezielt gliedern',
      scene: 'Für ein Gutachten liegen positive erste Ergebnisse vor, doch die Datenbasis ist schmal.',
      rule: 'Signale wie „zunächst“, „jedoch“ und „daraus folgt“ führen Leser durch Beobachtung, Einschränkung und Konsequenz. Die Reihenfolge muss die Logik spiegeln.',
      exercises: [
        c1Grammar['c1-jedoch'][0],
        cards('Verbinde Beobachtung, Einschränkung und Konsequenz in dieser Reihenfolge.', 'Der Versuch lieferte positive Ergebnisse. Die Stichprobe war jedoch klein. Daher empfehlen wir eine breitere Erprobung.', '„Jedoch“ schränkt die Reichweite ein. „Daher“ zieht die Konsequenz daraus.', [
          'Der Versuch',
          form('liefern', 'verb', 'Präteritum · er', {
            'Präsens · er': 'liefert',
            'Präteritum · er': 'lieferte',
            'Partizip II': 'geliefert',
          }),
          'positive Ergebnisse.',
          'Die Stichprobe war jedoch klein.',
          'Daher empfehlen wir eine breitere Erprobung',
        ]),
        c1Grammar['c1-jedoch'][1],
      ],
    },
    {
      id: 'c1-verhandlung', chapter: 'Strategie und Transfer', title: 'In einer Verhandlung präzise reagieren',
      scene: 'Zwei Organisationen wollen Daten gemeinsam auswerten, setzen aber unterschiedliche Bedingungen.',
      rule: 'Spiegle den Kern eines Einwands, bevor du den Handlungsspielraum beschreibst. „Unter der Maßgabe, dass …“ kennzeichnet eine verbindliche Bedingung.',
      exercises: [
        c1Grammar['c1-verhandlung'][0],
        cards('Formuliere das Angebot mit ausdrücklicher Bedingung.', 'Wir stimmen unter der Maßgabe zu, dass ausschließlich ausgewertete Kennzahlen weitergegeben werden.', '„Ausschließlich“ grenzt das freigegebene Material ein.', [
          'Wir stimmen',
          'unter der Maßgabe zu,',
          'dass',
          'ausschließlich ausgewertete Kennzahlen',
          form('weitergeben', 'verb', 'Partizip II', {
            Infinitiv: 'weitergeben',
            'Infinitiv mit zu': 'weiterzugeben',
            'Partizip II': 'weitergegeben',
          }),
          'werden',
        ]),
        c1Grammar['c1-verhandlung'][1],
      ],
    },
    {
      id: 'c1-abschluss', chapter: 'Strategie und Transfer', title: 'Abschluss · Maßnahmen sprachlich gewichten',
      scene: 'Du berätst eine Stadt zum Ausbau von Hitzeschutzmaßnahmen. Zwei Quellen betonen unterschiedliche Ziele.',
      rule: 'Eine Entscheidungsvorlage braucht eine begründete Priorität, einen Umgang mit Unsicherheit und eine nachvollziehbare nächste Entscheidung.',
      exercises: [
        c1Grammar['c1-abschluss'][0],
        cards('Gliedere die Entscheidung als Sofortmaßnahme mit langfristiger Ergänzung.', 'Kurzfristig sollten kühle Räume geöffnet werden; zugleich gilt es, die Begrünung langfristig voranzutreiben.', '„Zugleich“ zeigt, dass die langfristige Arbeit parallel eingeleitet wird.', [
          'Kurzfristig',
          form('sollen', 'modal', 'Konjunktiv II · sie (Plural)', {
            'Präsens · sie (Plural)': 'sollen',
            'Konjunktiv II · sie (Singular)': 'sollte',
            'Konjunktiv II · sie (Plural)': 'sollten',
          }),
          'kühle Räume geöffnet werden;',
          'zugleich gilt es,',
          'die Begrünung',
          'langfristig',
          form('vorantreiben', 'verb', 'Infinitiv mit zu', {
            Infinitiv: 'vorantreiben',
            'Infinitiv mit zu': 'voranzutreiben',
            'Partizip II': 'vorangetrieben',
          }),
        ]),
        c1Grammar['c1-abschluss'][1],
      ],
    },
  ],
};
