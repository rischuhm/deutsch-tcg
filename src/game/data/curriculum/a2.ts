import { cards, form, pool } from '../../courseCards';
import { choice, listen, practice } from '../../exercises';
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
        listen('Ab wann ist am Donnerstag ein Termin frei?', 'Guten Tag, hier ist die Werkstatt Krüger. Dienstag sind wir ausgebucht. Am Donnerstag können Sie ab halb fünf vorbeikommen. Am Freitag schließen wir schon um vier.', 'Ab 16:30 Uhr.', ['Ab 15:30 Uhr.', 'Ab 17:30 Uhr.'], '„Halb fünf“ bedeutet 16:30 Uhr.'),
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
        practice('write', 'Antworte der Werkstatt. Nenne deinen Wunschtag und die früheste Uhrzeit.', 'Guten Tag, Donnerstag passt mir. Ich kann ab 17 Uhr kommen. Ist dann noch ein Termin frei?', ['Wunschtag genannt', 'Uhrzeit genannt', 'Höflich nach einem Termin gefragt'], 'Mit einer Frage kann die Werkstatt den Termin bestätigen.'),
      ],
    },
    {
      id: 'a2-weg', chapter: 'Im Viertel', title: 'Den Weg erklären',
      scene: 'Ein Nachbar sucht die Bibliothek.',
      rule: '„Bis zur“ zeigt das Ende eines Wegabschnitts. „An der Ampel“ nennt einen Ort, an dem etwas passiert.',
      exercises: [
        choice('Wo muss der Nachbar abbiegen?', 'An der zweiten Ampel.', ['An der ersten Ampel.', 'Vor der Brücke.'], '„Erst an der zweiten“ schließt die erste Ampel aus.', 'Gehen Sie geradeaus über die Brücke. An der ersten Ampel gehen Sie weiter. Biegen Sie erst an der zweiten Ampel links ab.'),
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
        practice('speak', 'Erkläre einer Besucherin den Weg von der Bushaltestelle zu einem Ort in deinem Viertel.', 'Gehen Sie bis zur Kreuzung. Biegen Sie dort rechts ab. Die Apotheke ist neben dem Supermarkt.', ['Ausgangspunkt klar', 'Mindestens zwei Schritte', 'Ziel beschrieben'], '„Dort“ kann den bereits genannten Ort wieder aufnehmen.'),
      ],
    },
    {
      id: 'a2-umtausch', chapter: 'Im Viertel', title: 'Etwas umtauschen',
      scene: 'Die Schuhe aus dem Laden sind zu klein. Lea hat den Kassenbon noch.',
      rule: '„Zu“ vor einem Adjektiv meint hier „mehr als gewünscht“. Nach „weil“ steht das konjugierte Verb am Ende des Nebensatzes.',
      exercises: [
        choice('Welche Begründung passt?', 'weil die Schuhe zu klein sind.', ['weil sind die Schuhe zu klein.', 'weil die Schuhe genug klein sind.'], '„Sind“ schließt den weil-Satz ab.'),
        cards('Bitte um ein größeres Paar.', 'Haben Sie dieses Modell auch eine Nummer größer?', '„Eine Nummer größer“ beschreibt die gewünschte Größe.', [
          pool('verb.haben', { chosenPerson: 'sie' }),
          pool('pron.sie_formal', { chosenCase: 'Nominativ', chosenPronoun: 'Sie' }),
          'dieses Modell',
          'auch',
          'eine Nummer',
          pool('adj.gross', { chosenAdjectiveDegree: 'comparative' }),
        ]),
        practice('speak', 'Bitte im Laden um einen Umtausch. Erkläre, was mit den Schuhen nicht stimmt.', 'Guten Tag, ich möchte diese Schuhe umtauschen, weil sie zu klein sind. Hier ist der Kassenbon.', ['Umtausch erbeten', 'Problem genannt', 'Höfliche Anrede'], '„Ich möchte“ formuliert den Wunsch höflich.'),
      ],
    },
    {
      id: 'a2-wohnung', chapter: 'Im Viertel', title: 'Eine Wohnungsanzeige lesen',
      scene: 'Lea möchte näher an ihrem Arbeitsplatz wohnen und hat einen Hund.',
      rule: 'In Anzeigen geben „ab“, „inklusive“ und „nur“ Auskunft über Zeitpunkt, Preis und Einschränkungen.',
      exercises: [
        choice('Warum ist die Wohnung für Lea ungeeignet?', 'Ihr Hund darf dort nicht wohnen.', ['Sie ist erst im Oktober frei.', 'Es gibt keine Bushaltestelle in der Nähe.'], 'Ein Hund ist ein Haustier. Die Anzeige schließt Haustiere aus.', 'Zwei Zimmer, frei ab 1. September. 780 Euro inklusive Heizung. Zwei Minuten zum Bus. Haustiere sind nicht erlaubt.'),
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
        practice('write', 'Schreib eine kurze Anfrage zu einer anderen Wohnung. Frag nach einem Besichtigungstermin und der Haustierregel.', 'Guten Tag, ich interessiere mich für die Wohnung. Kann ich sie am Samstag besichtigen? Darf ich meinen Hund mitbringen?', ['Besichtigung erfragt', 'Hund oder Haustier erwähnt', 'Zwei klar getrennte Fragen'], 'Die beiden Fragen sollen separat beantwortet werden können.'),
      ],
    },
    {
      id: 'a2-vergangenheit', chapter: 'Unterwegs', title: 'Vom Wochenende erzählen',
      scene: 'Eine Kollegin fragt Lea nach ihrem Ausflug.',
      rule: 'Bei „fahren“ mit Ortswechsel steht das Perfekt mit „sein“. „Besuchen“ bildet das Perfekt mit „haben“ und Partizip ohne ge-.',
      exercises: [
        choice('Welche Form passt zu „Wir ___ nach Bonn gefahren“?', 'sind', ['haben', 'ist'], '„Wir“ verlangt „sind“, wenn „fahren“ eine Ortsveränderung ausdrückt.'),
        cards('Erzähle vom Besuch bei deiner Freundin.', 'Am Samstag habe ich eine Freundin besucht.', 'Nach der Zeitangabe folgt „habe“. Das Partizip „besucht“ steht am Ende.', [
          'Am Samstag',
          pool('verb.haben', { chosenPerson: 'ich' }),
          pool('pron.ich', { chosenCase: 'Nominativ', chosenPronoun: 'ich' }),
          'eine Freundin',
          form('besuchen', 'verb', 'Partizip II', { Infinitiv: 'besuchen', 'Partizip I': 'besuchend', 'Partizip II': 'besucht' }),
        ]),
        practice('speak', 'Erzähle in drei Sätzen von einem Wochenende. Verwende „zuerst“ und „danach“.', 'Zuerst bin ich in die Stadt gefahren. Danach habe ich eine Freundin besucht. Am Abend sind wir zusammen essen gegangen.', ['Drei Ereignisse im Perfekt', 'Reihenfolge erkennbar', 'Hilfsverben passend verwendet'], 'Zeitwörter machen den Ablauf verständlich.'),
      ],
    },
    {
      id: 'a2-ansage', chapter: 'Unterwegs', title: 'Auf eine Durchsage reagieren',
      scene: 'Lea und Noah sind auf dem Weg zu einem Ausflug. Die Verbindung ändert sich.',
      rule: 'Unterscheide in Durchsagen die angekündigte Änderung von der Lösung. „Statt“ ersetzt etwas. „Voraussichtlich“ bezeichnet eine Erwartung.',
      exercises: [
        listen('Was sollen Reisende nach Ulm tun?', 'Der Regionalzug nach Ulm fällt aus. Bitte benutzen Sie den Ersatzbus. Er fährt um elf Uhr zehn vor dem Haupteingang ab. Der Zug nach Augsburg fährt wie geplant.', 'Den Ersatzbus am Haupteingang nehmen.', ['Auf dem Gleis warten.', 'Den Zug nach Augsburg nehmen.'], 'Der Ersatzbus ist die ausdrücklich genannte Verbindung nach Ulm.'),
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
        practice('write', 'Schreib Noah eine Nachricht mit der Änderung, der neuen Uhrzeit und dem Treffpunkt.', 'Der Zug fällt aus. Der Bus fährt um 11:10 Uhr. Treffen wir uns um elf vor dem Haupteingang?', ['Änderung genannt', 'Abfahrt oder Treffzeit genannt', 'Treffpunkt genannt'], 'Eine Treffzeit kurz vor der Abfahrt ist hilfreich.'),
      ],
    },
    {
      id: 'a2-apotheke', chapter: 'Unterwegs', title: 'Beschwerden beschreiben',
      scene: 'Lea übt ein Gespräch in der Apotheke.',
      rule: 'Für eine Beschwerde, die noch besteht, steht nach „seit“ oft Präsens. „Seit“ verlangt den Dativ.',
      exercises: [
        choice('Welche Angabe passt zu „Ich habe ___ Halsschmerzen“?', 'seit zwei Tagen', ['seit zwei Tage', 'seit zwei Tag'], 'Der Dativ Plural von „Tage“ lautet „Tagen“.'),
        cards('Frage in der Apotheke nach einem Mittel gegen Husten.', 'Haben Sie etwas gegen Husten?', 'Nach „gegen“ steht Akkusativ. Ohne Artikel bleibt „Husten“ hier unverändert.', [
          pool('verb.haben', { chosenPerson: 'sie' }),
          pool('pron.sie_formal', { chosenCase: 'Nominativ', chosenPronoun: 'Sie' }),
          'etwas',
          'gegen Husten',
        ]),
        practice('speak', 'Beschreibe eine erfundene Beschwerde und sag, seit wann sie besteht.', 'Guten Tag, ich habe seit gestern Halsschmerzen. Haben Sie etwas dagegen?', ['Beschwerde benannt', 'Dauer oder Beginn genannt', 'Verständliche Frage gestellt'], '„Dagegen“ bezieht sich auf die zuvor genannte Beschwerde.'),
      ],
    },
    {
      id: 'a2-einladung', chapter: 'Pläne und Absprachen', title: 'Auf eine Einladung antworten',
      scene: 'Noah lädt Lea am Samstag ein. Lea arbeitet bis 18 Uhr.',
      rule: '„Ob“ leitet eine indirekte Ja/Nein-Frage ein. Beim Vorschlag mit „können“ steht der Infinitiv am Schluss.',
      exercises: [
        choice('Welche Antwort sagt zu und kündigt späteres Kommen an?', 'Ich komme gern, aber erst gegen sieben.', ['Ich würde gern kommen, schaffe es aber nicht.', 'Danke, ich lade dich nächste Woche ein.'], '„Erst gegen sieben“ ändert die Ankunftszeit. Die Zusage bleibt bestehen.'),
        cards('Frag nach, ob du später kommen kannst.', 'Sag mir bitte, ob ich auch später kommen kann.', 'Nach „ob“ steht „kann“ am Ende.', [
          'Sag mir bitte,',
          'ob',
          pool('pron.ich', { chosenCase: 'Nominativ', chosenPronoun: 'ich' }),
          'auch später',
          pool('verb.kommen', { chosenVerbForm: 'infinitive' }),
          pool('modal.koennen', { chosenPerson: 'ich' }),
        ]),
        practice('write', 'Bedanke dich, erkläre kurz die Verspätung und schlage eine Ankunftszeit vor.', 'Danke für die Einladung! Ich arbeite bis sechs und kann erst gegen sieben kommen. Passt das für dich?', ['Bedankt', 'Verspätung begründet', 'Ankunftszeit vorgeschlagen'], '„Passt das für dich?“ bittet um Bestätigung.'),
      ],
    },
    {
      id: 'a2-arbeitsplan', chapter: 'Pläne und Absprachen', title: 'Einen Dienst tauschen',
      scene: 'Lea und ihre Kollegin brauchen eine faire Lösung für zwei Schichten.',
      rule: '„Übernehmen“ heißt hier, die Aufgabe einer anderen Person zu erledigen. Mit „dafür“ stellst du die Gegenleistung vor.',
      exercises: [
        choice('Wer arbeitet nach dem Vorschlag am Donnerstag?', 'Lea.', ['Noah.', 'Niemand.'], '„Ich“ bezieht sich hier auf Lea. Sie bietet an, am Donnerstag zu arbeiten.', 'Lea schreibt Noah: Kannst du bitte meine Schicht am Mittwoch übernehmen? Dafür arbeite ich am Donnerstag für dich.'),
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
        practice('write', 'Bitte um einen anderen Schichttausch und biete zwei Tage an, an denen du einspringen kannst.', 'Kannst du meine Schicht am Freitag übernehmen? Ich kann dafür am Montag oder am Dienstag für dich arbeiten.', ['Zu tauschende Schicht genannt', 'Zwei Alternativen angeboten', 'Klare Bitte formuliert'], '„Oder“ stellt zwei Alternativen zur Wahl.'),
      ],
    },
    {
      id: 'a2-abschluss', chapter: 'Pläne und Absprachen', title: 'Abschluss · Einen Ausflug planen',
      scene: 'Die Gruppe will einen Tagesausflug machen. Der Veranstalter meldet eine Änderung.',
      rule: 'Bestätige eine Abmachung mit den wichtigen Angaben. Falls etwas geändert wird, nenne den Grund und die neue Lösung.',
      exercises: [
        listen('Was hat sich geändert?', 'Wir treffen uns wie geplant um neun Uhr am Bahnhof. Weil es regnet, gehen wir zuerst ins Museum. Das Picknick im Park fällt aus. Bringen Sie bitte trotzdem etwas zu trinken mit.', 'Das Picknick fällt aus.', ['Die Gruppe trifft sich später.', 'Der Treffpunkt ist das Museum.'], 'Zeit und Treffpunkt bleiben gleich. Das Programm ändert sich.'),
        cards('Begründe, warum die Gruppe zuerst ins Museum geht.', 'Wir gehen zuerst ins Museum, weil es regnet.', 'Das Komma steht zwischen Haupt- und Nebensatz. „Regnet“ schließt den weil-Satz ab.', [
          pool('pron.wir', { chosenCase: 'Nominativ', chosenPronoun: 'wir' }),
          pool('verb.gehen', { chosenPerson: 'wir' }),
          'zuerst ins Museum,',
          'weil',
          'es',
          form('regnen', 'verb', 'Präsens · es', { 'Präsens · es': 'regnet', 'Präteritum · es': 'regnete', 'Partizip II': 'geregnet' }),
        ]),
        practice('write', 'Fasse die drei wichtigsten Informationen für jemanden zusammen, der die Nachricht verpasst hat.', 'Wir treffen uns um neun am Bahnhof. Weil es regnet, gehen wir zuerst ins Museum. Bring bitte etwas zu trinken mit.', ['Zeit und Treffpunkt', 'Neues Programm mit Grund', 'Hinweis zum Getränk'], 'Kurz und vollständig reicht für eine Alltagsnachricht.'),
      ],
    },
  ],
};
