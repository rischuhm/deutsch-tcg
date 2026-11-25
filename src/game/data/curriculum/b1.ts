import { cards, form, pool } from '../../courseCards';
import { choice, listen, practice } from '../../exercises';
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
        choice('Welches Wort passt zum einmaligen Ereignis? „___ ich gestern ankam, war das Hotel geschlossen.“', 'Als', ['Immer wenn', 'Falls'], '„Gestern“ und „ankam“ markieren ein konkretes vergangenes Ereignis.'),
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
        practice('speak', 'Erzähle von einer Reise mit einem unerwarteten Ereignis. Erkläre, wie sie endete.', 'Als ich am Hafen ankam, war die Fähre schon weg. Deshalb nahm ich den Bus. Am Abend erreichte ich doch noch mein Ziel.', ['Ausgangssituation', 'Unerwartetes Ereignis', 'Reaktion und Ende'], 'Nutze einen Zeit- und einen Folgeverknüpfer.'),
      ],
    },
    {
      id: 'b1-reklamation', chapter: 'Erlebnisse und Pläne', title: 'Eine Reklamation schreiben',
      scene: 'Ein Ersatzgerät kam an, aber das gleiche Problem trat erneut auf.',
      rule: 'Eine verständliche Reklamation nennt den Vorgang, beschreibt den Mangel und sagt klar, welche Lösung gewünscht ist.',
      exercises: [
        choice('Welche Bitte ist sachlich und konkret?', 'Bitte teilen Sie mir bis Freitag mit, ob Sie das Gerät erneut austauschen können.', ['Kümmern Sie sich sofort um alles.', 'Ich hoffe, dass Ihre Geräte irgendwann besser werden.'], 'Frist und gewünschte Maßnahme sind klar.'),
        cards('Verbinde beide Aussagen mit einem Nebensatz mit „obwohl“.', 'Obwohl ich das Gerät geladen habe, lässt es sich nicht einschalten.', '„Obwohl“ nennt einen Umstand, der ein anderes Ergebnis erwarten lässt.', [
          'Obwohl',
          'ich das Gerät',
          form('laden', 'verb', 'Partizip II', { Infinitiv: 'laden', 'Partizip I': 'ladend', 'Partizip II': 'geladen' }),
          pool('verb.haben', { chosenPerson: 'ich' }, { punctuation: ',' }),
          'lässt es sich',
          'nicht einschalten',
        ]),
        practice('write', 'Reklamiere ein vor drei Tagen geliefertes Gerät. Beschreibe einen Mangel und fordere eine konkrete Lösung an.', 'Guten Tag, das am Montag gelieferte Radio empfängt keine Sender. Ich habe es an zwei Orten ausprobiert. Bitte senden Sie mir ein Ersatzgerät oder erstatten Sie den Kaufpreis.', ['Lieferung identifiziert', 'Mangel und Versuch beschrieben', 'Konkrete Lösung erbeten'], 'Ein überprüfbares Detail hilft dem Kundenservice.'),
      ],
    },
    {
      id: 'b1-kurswahl', chapter: 'Erlebnisse und Pläne', title: 'Eine Wahl begründen',
      scene: 'Lea vergleicht zwei Weiterbildungskurse.',
      rule: '„Deshalb“ bezeichnet eine Folge und kann im Hauptsatz vorn stehen. Dann folgt gleich das finite Verb.',
      exercises: [
        choice('Welcher Kurs erfüllt beide Kriterien?', 'Kurs B.', ['Kurs A.', 'Beide Kurse.'], 'Kurs B endet vor 20 Uhr und enthält Übungen.', 'Lea braucht praktische Übungen und muss spätestens um 20 Uhr los. Kurs A: Vorträge bis 19 Uhr. Kurs B: Übungen bis 19:45 Uhr.'),
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
        practice('speak', 'Vergleiche die beiden Kurse. Nenne einen Vorteil beider Angebote und begründe deine Wahl.', 'Kurs A ist früher zu Ende. Kurs B bietet praktische Übungen und endet trotzdem vor 20 Uhr. Deshalb entscheide ich mich für Kurs B.', ['Beide Angebote erwähnt', 'Vorteil pro Angebot', 'Entscheidung begründet'], 'Begründe mit den Kriterien, die für die Person wichtig sind.'),
      ],
    },
    {
      id: 'b1-ziel', chapter: 'Erlebnisse und Pläne', title: 'Über ein Ziel sprechen',
      scene: 'Noah will mehr mit Menschen arbeiten und spricht über seine beruflichen Pläne.',
      rule: '„Um … zu“ drückt ein Ziel bei gleichem Subjekt aus. Mit „damit“ kannst du auch ein anderes Subjekt nennen.',
      exercises: [
        choice('Welcher Anschluss nennt ein Ziel mit anderem Subjekt? „Ich erkläre den Ablauf, …“', 'damit alle selbstständig anfangen können.', ['um alle selbstständig anfangen können.', 'damit ich alles selbst erklären kann.'], 'Im gesuchten Anschluss handeln „ich“ und „alle“ in verschiedenen Teilsätzen.'),
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
        practice('write', 'Beschreibe ein konkretes Lernziel und zwei Schritte dorthin.', 'Ich möchte sicherer präsentieren. Um mich daran zu gewöhnen, spreche ich zuerst vor Freunden. Danach melde ich mich für eine kurze Präsentation im Kurs.', ['Konkretes Ziel', 'Zwei unterschiedliche Schritte', 'Ein Finalsatz'], 'Verbinde mindestens eine Handlung ausdrücklich mit dem Ziel.'),
      ],
    },
    {
      id: 'b1-nachricht', chapter: 'Arbeit und Öffentlichkeit', title: 'Eine Arbeitsnachricht weitergeben',
      scene: 'Eine Kollegin war bei der Teambesprechung nicht dabei.',
      rule: 'Unterscheide Beschluss, Bedingung und offenen Punkt. Indirekte Fragen leitet man mit einem Fragewort oder „ob“ ein.',
      exercises: [
        listen('Was ist noch offen?', 'Ab Montag beginnt die Frühschicht um sieben. Ob es am Freitag eine zusätzliche Schicht gibt, entscheiden wir erst am Mittwoch. Bitte gebt mir bis morgen Bescheid, wer für Freitag verfügbar wäre.', 'Eine zusätzliche Schicht am Freitag.', ['Der Beginn der Frühschicht.', 'Die Frist für Rückmeldungen.'], 'Die Schicht am Freitag wird erst am Mittwoch beschlossen.'),
        cards('Formuliere die offene Frage indirekt.', 'Es ist noch offen, ob am Freitag eine zusätzliche Schicht nötig ist.', 'Die indirekte Frage mit „ob“ endet mit dem finiten Verb.', [
          'Es ist noch offen,',
          'ob',
          'am Freitag',
          'eine zusätzliche Schicht',
          'nötig',
          pool('verb.sein', { chosenPerson: 'er' }),
        ]),
        practice('write', 'Leite die Nachricht weiter. Nenne Beschluss, offenen Punkt und Rückmeldefrist.', 'Ab Montag beginnt die Frühschicht um sieben. Die zusätzliche Freitagsschicht ist noch nicht sicher. Bitte sag bis morgen, ob du am Freitag arbeiten könntest.', ['Beschluss korrekt', 'Offenen Punkt als offen bezeichnet', 'Frist genannt'], 'Kennzeichne klar, welche Information vorläufig ist.'),
      ],
    },
    {
      id: 'b1-mitmachen', chapter: 'Arbeit und Öffentlichkeit', title: 'Einen Verein vorstellen',
      scene: 'Lea sucht für einen Freund ein passendes Ehrenamt.',
      rule: 'Relativsätze erklären ein Nomen näher. Den Fall des Relativpronomens bestimmt seine Aufgabe im Relativsatz.',
      exercises: [
        choice('Welches Relativpronomen passt? „Das ist der Verein, ___ ich helfe.“', 'dem', ['der', 'den'], '„Helfen“ fordert Dativ. „Verein“ ist maskulin.'),
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
        practice('speak', 'Empfiehl einem Freund ein Ehrenamt, das zu seiner Vorliebe für handwerkliche Arbeit passt.', 'Ich empfehle dir das Reparaturcafé, das am Samstag öffnet. Dort kannst du Geräte reparieren und anderen zeigen, wie es geht.', ['Angebot genannt', 'Bezug zur Vorliebe', 'Ein Relativsatz'], 'Eine konkrete Aufgabe macht die Empfehlung überzeugender.'),
      ],
    },
    {
      id: 'b1-hausordnung', chapter: 'Arbeit und Öffentlichkeit', title: 'Regeln ohne handelnde Person erklären',
      scene: 'Am Eingang eines Gemeinschaftsraums hängen neue Regeln.',
      rule: 'Das Vorgangspassiv im Präsens besteht aus „werden“ und Partizip II. Der Vorgang steht im Mittelpunkt.',
      exercises: [
        choice('Was bedeutet die Regel konkret?', 'Die Tür soll abgeschlossen werden, wenn alle gegangen sind.', ['Die Tür bleibt nach dem Kurs offen.', 'Die Tür wird vor dem Ende des Kurses zugeschlossen.'], '„Nach Verlassen“ beschreibt den Zeitpunkt nach dem Hinausgehen.', 'Die Tür wird nach Verlassen des Raums abgeschlossen.'),
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
        practice('write', 'Schreib zwei Regeln für einen Gemeinschaftsraum im Passiv und nenne einen Zweck.', 'Nach dem Treffen wird der Müll entsorgt. Danach werden die Tische gereinigt, damit die nächste Gruppe anfangen kann.', ['Zwei verständliche Regeln', 'Passendes „wird“ oder „werden“', 'Zweck genannt'], 'Das Passiv passt gut, wenn es darum geht, was erledigt werden muss.'),
      ],
    },
    {
      id: 'b1-konflikt', chapter: 'Meinung und Zusammenarbeit', title: 'Einen Konflikt entschärfen',
      scene: 'Die Nachbarin beschwert sich über laute Musik.',
      rule: 'Geh zuerst auf das Anliegen ein. Konjunktiv II hilft, einen Vorschlag höflich einzubringen.',
      exercises: [
        choice('Welche Antwort erkennt das Anliegen an und bietet eine Lösung?', 'Ich verstehe, dass die Musik stört. Ich könnte nach 22 Uhr Kopfhörer benutzen.', ['Sie sollten sich daran gewöhnen.', 'Ich hatte Musik an, mehr weiß ich nicht.'], 'Die Antwort erkennt die Störung an und schlägt eine konkrete Änderung vor.'),
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
        practice('speak', 'Reagiere höflich auf eine Beschwerde über Lärm. Biete eine Lösung an und frage nach Zustimmung.', 'Ich verstehe, dass Sie abends Ruhe brauchen. Ich könnte früher üben oder Kopfhörer verwenden. Wäre das für Sie in Ordnung?', ['Anliegen anerkannt', 'Lösung angeboten', 'Zustimmung erfragt'], 'Eine Rückfrage öffnet das Gespräch.'),
      ],
    },
    {
      id: 'b1-forum', chapter: 'Meinung und Zusammenarbeit', title: 'In einem Forum Stellung nehmen',
      scene: 'Im Stadtteilforum wird über einen autofreien Sonntag diskutiert.',
      rule: 'Eine kurze Stellungnahme braucht eine Position und einen Grund. „Trotzdem“ führt zu einer Aussage, die angesichts des vorherigen Satzes überrascht.',
      exercises: [
        choice('Welche Funktion hat „trotzdem“?', 'Es markiert einen Gegensatz zur erwarteten Folge.', ['Es nennt einen Grund.', 'Es nennt eine Reihenfolge.'], 'Die Person befürwortet den Plan trotz einer erwarteten Schwierigkeit.', 'Die Zufahrt wird komplizierter. Trotzdem finde ich den Vorschlag gut.'),
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
        practice('write', 'Verfasse einen kurzen Forumsbeitrag. Nenne deine Meinung und einen möglichen Einwand.', 'Ich finde den autofreien Sonntag sinnvoll, weil Familien die Straße freier nutzen können. Für Lieferungen wird es vielleicht schwieriger. Deshalb sollte die Stadt Sonderzeiten einplanen.', ['Position klar', 'Begründung', 'Einwand oder Einschränkung berücksichtigt'], 'Ein Beispiel kann zeigen, warum die Meinung sinnvoll ist.'),
      ],
    },
    {
      id: 'b1-abschluss', chapter: 'Meinung und Zusammenarbeit', title: 'Abschluss · Einen Vorschlag vermitteln',
      scene: 'Eine Gruppe plant eine Veranstaltung. Du fasst die Diskussion für ein abwesendes Mitglied zusammen.',
      rule: 'Trenne sicher Beschlossenes von Vorschlägen. Gib die Gründe so weiter, dass die andere Person entscheiden kann.',
      exercises: [
        listen('Welcher Punkt ist entschieden?', 'Wir bleiben beim Samstag. Der Raum im Rathaus wäre günstiger, aber er ist noch nicht bestätigt. Nora schlägt vor, zusätzlich im Jugendzentrum anzufragen. Ich rufe dort morgen an.', 'Die Veranstaltung findet am Samstag statt.', ['Die Veranstaltung ist im Rathaus.', 'Der Raum im Jugendzentrum ist gebucht.'], 'Der Tag steht fest. Beide Räume sind noch mögliche Optionen.'),
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
        practice('write', 'Schreib eine Zusammenfassung und bitte um eine Rückmeldung zu den beiden Räumen.', 'Der Samstag bleibt. Der günstigere Raum im Rathaus ist noch nicht bestätigt. Als Alternative fragen wir im Jugendzentrum nach. Welcher Raum wäre für dich besser erreichbar?', ['Beschluss vom Vorschlag unterschieden', 'Beide Räume genannt', 'Gezielte Rückfrage'], 'Markiere Unsicherheit an der Stelle, an der sie tatsächlich besteht.'),
      ],
    },
  ],
};
