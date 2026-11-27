import { cards, word } from '../../courseCards';
import type { Level } from '../../exercises';

export const a2: Level = {
  title: "Alltag organisieren",
  description: "Verabrede dich, löse kleine Probleme und erzähle von deinem Alltag.",
  lessons: [
    {
      id: "a2-termin",
      chapter: "Im Viertel",
      title: "Einen Termin verschieben",
      scene: "Lea kann am Dienstag erst nach der Arbeit zur Fahrradwerkstatt.",
      rule: "Mit „ab“ nennst du einen möglichen Anfang, mit „bis“ eine Grenze. Die höfliche Frage „Könnten wir …?“ macht einen Vorschlag.",
      exercises: [
        cards(
          "Bitte die Werkstatt höflich um Rückruf. Beginne mit „können“.",
          "Könnten Sie mich morgen zurückrufen?",
          "„Könnten Sie“ ist eine höfliche Bitte im Konjunktiv II.",
          [
            word("modal", "können", "Konjunktiv II · Sie"), word("pronoun", "Sie"), word("pronoun", "mich"),
            word("adverb", "morgen"), word("verb", "zurückrufen", "infinitive"),
          ],
        ),
        cards(
          "Verschiebe den Termin höflich auf Donnerstag.",
          "Könnten wir den Termin auf Donnerstag verschieben?",
          "In der Ja/Nein-Frage steht „könnten“ zuerst, der Infinitiv am Ende.",
          [
            word("modal", "können", "Konjunktiv II · wir"), word("pronoun", "wir"), word("article", "den"),
            word("noun", "Termin", "A"), word("preposition", "auf"), word("noun", "Donnerstag", "A"),
            word("verb", "verschieben", "infinitive"),
          ],
        ),
        cards(
          "Bestätige den Termin am Freitag. Beginne mit „ich“. Verwende den Akkusativ.",
          "Ich bestätige den Termin am Freitag.",
          "„Bestätigen“ verlangt für die Sache den Akkusativ.",
          [
            word("pronoun", "ich"), word("verb", "bestätigen", "ich"), word("article", "den"),
            word("noun", "Termin", "A"), word("preposition", "am"), word("noun", "Freitag", "D"),
          ],
        ),
      ],
    },
    {
      id: "a2-weg",
      chapter: "Im Viertel",
      title: "Den Weg erklären",
      scene: "Ein Nachbar sucht die Bibliothek.",
      rule: "„Bis zur“ zeigt das Ende eines Wegabschnitts. „An der Ampel“ nennt einen Ort, an dem etwas passiert.",
      exercises: [
        cards(
          "Sage einer fremden Person, dass sie geradeaus gehen soll. Beginne mit dem Verb.",
          "Gehen Sie bis zur Kreuzung geradeaus.",
          "Beim höflichen Imperativ folgt „Sie“ auf die Verbform.",
          [
            word("verb", "gehen", "Imperativ · Sie"), word("pronoun", "Sie"), word("preposition", "bis"),
            word("preposition", "zur"), word("noun", "Kreuzung", "D"), word("adverb", "geradeaus"),
          ],
        ),
        cards(
          "Gib die Anweisung mit „abbiegen“.",
          "Biegen Sie an der zweiten Ampel links ab.",
          "Beim höflichen Imperativ stehen Verb und „Sie“ vorn, „ab“ am Ende.",
          [
            word("verb", "abbiegen", "Imperativ · Sie"), word("pronoun", "Sie"), word("preposition", "an"),
            word("article", "der"), word("adjective", "zweit", "Endung -en"), word("noun", "Ampel", "D"),
            word("adverb", "links"), word("particle", "ab"),
          ],
        ),
        cards(
          "Beginne mit der Ortsangabe „an der Kreuzung“ und gib eine höfliche Anweisung.",
          "An der Kreuzung gehen Sie nach links.",
          "Nach der Ortsangabe folgt im Hauptsatz das finite Verb.",
          [
            word("preposition", "an"), word("article", "der"), word("noun", "Kreuzung", "D"),
            word("verb", "gehen", "sie"), word("pronoun", "Sie"), word("preposition", "nach"),
            word("adverb", "links"),
          ],
        ),
      ],
    },
    {
      id: "a2-umtausch",
      chapter: "Im Viertel",
      title: "Etwas umtauschen",
      scene: "Die Schuhe aus dem Laden sind zu klein. Lea hat den Kassenbon noch.",
      rule: "„Zu“ vor einem Adjektiv meint hier „mehr als gewünscht“. Nach „weil“ steht das konjugierte Verb am Ende des Nebensatzes.",
      exercises: [
        cards(
          "Sage, dass ein Paar zu klein ist. Beginne mit „dieses Paar“.",
          "Dieses Paar ist zu klein.",
          "„Paar“ ist Singular. Das Verb lautet „ist“.",
          [
            word("article", "dieses"), word("noun", "Paar", "N"), word("verb", "sein", "er"),
            word("particle", "zu"), word("adjective", "klein", "positive"),
          ],
        ),
        cards(
          "Bitte um ein größeres Paar.",
          "Haben Sie dieses Modell auch eine Nummer größer?",
          "„Eine Nummer größer“ beschreibt die gewünschte Größe.",
          [
            word("verb", "haben", "sie"), word("pronoun", "Sie"), word("article", "dieses"),
            word("noun", "Modell", "A"), word("adverb", "auch"), word("article", "eine"),
            word("noun", "Nummer", "A"), word("adjective", "groß", "comparative"),
          ],
        ),
        cards(
          "Begründe den Umtausch in einem weil-Satz.",
          "Ich möchte das Paar umtauschen, weil die Schuhe zu klein sind.",
          "„Weil“ schickt das finite Verb ans Ende. „Schuhe“ ist Plural.",
          [
            word("pronoun", "ich"), word("modal", "mögen", "Konjunktiv II · ich"), word("article", "das"),
            word("noun", "Paar", "A"), word("verb", "umtauschen", "infinitive", ","), word("conjunction", "weil"),
            word("article", "die"), word("noun", "Schuh", "n"), word("particle", "zu"),
            word("adjective", "klein", "positive"), word("verb", "sein", "sie"),
          ],
        ),
      ],
    },
    {
      id: "a2-wohnung",
      chapter: "Im Viertel",
      title: "Ortsangaben und Dativ",
      scene: "Lea möchte näher an ihrem Arbeitsplatz wohnen und hat einen Hund.",
      rule: "In Anzeigen geben „ab“, „inklusive“ und „nur“ Auskunft über Zeitpunkt, Preis und Einschränkungen.",
      exercises: [
        cards(
          "Beschreibe den Standort mit „neben“. Beginne mit „die Wohnung“.",
          "Die Wohnung liegt neben dem Bahnhof.",
          "„Wo?“ fragt nach dem Standort. Bei „neben“ steht hier Dativ.",
          [
            word("article", "die"), word("noun", "Wohnung", "N"), word("verb", "liegen", "er"),
            word("preposition", "neben"), word("article", "dem"), word("noun", "Bahnhof", "D"),
          ],
        ),
        cards(
          "Beschreibe die Lage der Wohnung.",
          "Die Wohnung liegt in der Nähe vom Bahnhof.",
          "„In der Nähe von“ bezeichnet die Umgebung eines Ortes. „Vom“ bedeutet „von dem“.",
          [
            word("article", "die"), word("noun", "Wohnung", "N"), word("verb", "liegen", "er"),
            word("preposition", "in"), word("article", "der"), word("noun", "Nähe", "D"),
            word("preposition", "vom"), word("noun", "Bahnhof", "D"),
          ],
        ),
        cards(
          "Frag nach einer Besichtigung. Beginne mit „können“ und sprich eine fremde Person an.",
          "Können Sie mir die Wohnung zeigen?",
          "In der Ja/Nein-Frage steht das finite Verb vorn, der Infinitiv am Ende.",
          [
            word("modal", "können", "sie"), word("pronoun", "Sie"), word("pronoun", "mir"), word("article", "die"),
            word("noun", "Wohnung", "A"), word("verb", "zeigen", "infinitive"),
          ],
        ),
      ],
    },
    {
      id: "a2-vergangenheit",
      chapter: "Unterwegs",
      title: "Vom Wochenende erzählen",
      scene: "Eine Kollegin fragt Lea nach ihrem Ausflug.",
      rule: "Bei „fahren“ mit Ortswechsel steht das Perfekt mit „sein“. „Besuchen“ bildet das Perfekt mit „haben“ und Partizip ohne ge-.",
      exercises: [
        cards(
          "Erzähle im Perfekt. Beginne mit „am Sonntag“ und beschreibe eine Fahrt nach Bonn.",
          "Am Sonntag sind wir nach Bonn gefahren.",
          "Bei einer Fahrt mit Ortswechsel steht „sein“ als Hilfsverb.",
          [
            word("preposition", "am"), word("noun", "Sonntag", "D"), word("verb", "sein", "wir"),
            word("pronoun", "wir"), word("preposition", "nach"), word("properNoun", "Bonn"),
            word("verb", "fahren", "participle2"),
          ],
        ),
        cards(
          "Erzähle vom Besuch bei deiner Freundin.",
          "Am Samstag habe ich eine Freundin besucht.",
          "Nach der Zeitangabe folgt „habe“. Das Partizip „besucht“ steht am Ende.",
          [
            word("preposition", "am"), word("noun", "Samstag", "D"), word("verb", "haben", "ich"),
            word("pronoun", "ich"), word("article", "eine"), word("noun", "Freundin", "A"),
            word("verb", "besuchen", "participle2"),
          ],
        ),
        cards(
          "Beginne mit „danach“. Erzähle, dass ihr das Museum besucht habt.",
          "Danach haben wir das Museum besucht.",
          "Das untrennbare „be-“ bekommt beim Partizip kein zusätzliches „ge-“.",
          [
            word("adverb", "danach"), word("verb", "haben", "wir"), word("pronoun", "wir"), word("article", "das"),
            word("noun", "Museum", "A"), word("verb", "besuchen", "participle2"),
          ],
        ),
      ],
    },
    {
      id: "a2-ansage",
      chapter: "Unterwegs",
      title: "Trennbare Verben und Reflexivpronomen",
      scene: "Lea und Noah sind auf dem Weg zu einem Ausflug. Die Verbindung ändert sich.",
      rule: "Unterscheide in Durchsagen die angekündigte Änderung von der Lösung. „Statt“ ersetzt etwas. „Voraussichtlich“ bezeichnet eine Erwartung.",
      exercises: [
        cards(
          "Berichte, dass Noah und du euch am Eingang trefft. Beginne mit „wir“.",
          "Wir treffen uns am Eingang.",
          "Zu „wir“ gehört das Reflexivpronomen „uns“.",
          [
            word("pronoun", "wir"), word("verb", "treffen", "wir"), word("pronoun", "uns"),
            word("preposition", "am"), word("noun", "Eingang", "D"),
          ],
        ),
        cards(
          "Informiere Noah über den neuen Treffpunkt.",
          "Wir treffen uns um elf Uhr vor dem Haupteingang.",
          "„Sich treffen“ braucht bei „wir“ das Reflexivpronomen „uns“.",
          [
            word("pronoun", "wir"), word("verb", "treffen", "wir"), word("pronoun", "uns"),
            word("preposition", "um"), word("number", "elf"), word("noun", "Uhr", "A"), word("preposition", "vor"),
            word("article", "dem"), word("noun", "Haupteingang", "D"),
          ],
        ),
        cards(
          "Sag Noah, wann der Bus abfährt. Beginne mit „der Bus“.",
          "Der Bus fährt um elf Uhr ab.",
          "Das trennbare „ab“ steht im Hauptsatz am Ende.",
          [
            word("article", "der"), word("noun", "Bus", "N"), word("verb", "abfahren", "er"),
            word("preposition", "um"), word("number", "elf"), word("noun", "Uhr", "A"), word("particle", "ab"),
          ],
        ),
      ],
    },
    {
      id: "a2-apotheke",
      chapter: "Unterwegs",
      title: "Beschwerden beschreiben",
      scene: "Lea übt ein Gespräch in der Apotheke.",
      rule: "Für eine Beschwerde, die noch besteht, steht nach „seit“ oft Präsens. „Seit“ verlangt den Dativ.",
      exercises: [
        cards(
          "Sage, dass du seit drei Tagen Husten hast. Beginne mit „ich“.",
          "Ich habe seit drei Tagen Husten.",
          "„Seit“ verlangt den Dativ. „Tag“ bekommt im Dativ Plural die Endung „-en“.",
          [
            word("pronoun", "ich"), word("verb", "haben", "ich"), word("preposition", "seit"),
            word("number", "drei"), word("noun", "Tag", "d"), word("noun", "Husten", "A"),
          ],
        ),
        cards(
          "Frage in der Apotheke nach einem Mittel gegen Husten.",
          "Haben Sie etwas gegen Husten?",
          "Nach „gegen“ steht Akkusativ. Ohne Artikel bleibt „Husten“ hier unverändert.",
          [
            word("verb", "haben", "sie"), word("pronoun", "Sie"), word("pronoun", "etwas"),
            word("preposition", "gegen"), word("noun", "Husten", "A"),
          ],
        ),
        cards(
          "Frage nach einem Mittel gegen den Husten. Beginne mit „haben“.",
          "Haben Sie etwas gegen den Husten?",
          "Nach „gegen“ steht der Akkusativ. Maskulin wird „der“ zu „den“.",
          [
            word("verb", "haben", "sie"), word("pronoun", "Sie"), word("pronoun", "etwas"),
            word("preposition", "gegen"), word("article", "den"), word("noun", "Husten", "A"),
          ],
        ),
      ],
    },
    {
      id: "a2-einladung",
      chapter: "Pläne und Absprachen",
      title: "Indirekte Fragen mit „ob“",
      scene: "Noah lädt Lea am Samstag ein. Lea arbeitet bis 18 Uhr.",
      rule: "„Ob“ leitet eine indirekte Ja/Nein-Frage ein. Beim Vorschlag mit „können“ steht der Infinitiv am Schluss.",
      exercises: [
        cards(
          "Formuliere eine indirekte Frage mit „ob“. Beginne mit „weißt du“.",
          "Weißt du, ob Noah heute kommt?",
          "Bei „ob“ steht „kommt“ am Ende des Nebensatzes.",
          [
            word("verb", "wissen", "du"), word("pronoun", "du", undefined, ","), word("conjunction", "ob"),
            word("properNoun", "Noah"), word("adverb", "heute"), word("verb", "kommen", "er"),
          ],
        ),
        cards(
          "Frag nach, ob du später kommen kannst.",
          "Sag mir bitte, ob ich auch später kommen kann.",
          "Nach „ob“ steht „kann“ am Ende.",
          [
            word("verb", "sagen", "Imperativ · du"), word("pronoun", "mir"),
            word("adverb", "bitte", undefined, ","), word("conjunction", "ob"), word("pronoun", "ich"),
            word("adverb", "auch"), word("adjective", "spät", "comparative"), word("verb", "kommen", "infinitive"),
            word("modal", "können", "ich"),
          ],
        ),
        cards(
          "Sage zu, dass du später kommen kannst. Beginne mit „ich“.",
          "Ich kann erst gegen sieben kommen.",
          "Nach einem Modalverb steht der Infinitiv am Satzende.",
          [
            word("pronoun", "ich"), word("modal", "können", "ich"), word("adverb", "erst"),
            word("preposition", "gegen"), word("number", "sieben"), word("verb", "kommen", "infinitive"),
          ],
        ),
      ],
    },
    {
      id: "a2-arbeitsplan",
      chapter: "Pläne und Absprachen",
      title: "Einen Dienst tauschen",
      scene: "Lea und ihre Kollegin brauchen eine faire Lösung für zwei Schichten.",
      rule: "„Übernehmen“ heißt hier, die Aufgabe einer anderen Person zu erledigen. Mit „dafür“ stellst du die Gegenleistung vor.",
      exercises: [
        cards(
          "Bitte eine Kollegin um Hilfe am Freitag. Beginne mit „können“ im Konjunktiv II.",
          "Könntest du am Freitag einspringen?",
          "Die höfliche du-Form im Konjunktiv II ist „könntest“.",
          [
            word("modal", "können", "Konjunktiv II · du"), word("pronoun", "du"), word("preposition", "am"),
            word("noun", "Freitag", "D"), word("verb", "einspringen", "infinitive"),
          ],
        ),
        cards(
          "Frag Noah höflich nach dem Tausch.",
          "Könntest du am Mittwoch für mich arbeiten?",
          "„Könntest du …?“ ist eine höfliche Bitte unter Kollegen.",
          [
            word("modal", "können", "Konjunktiv II · du"), word("pronoun", "du"), word("preposition", "am"),
            word("noun", "Mittwoch", "D"), word("preposition", "für"), word("pronoun", "mich"),
            word("verb", "arbeiten", "infinitive"),
          ],
        ),
        cards(
          "Biete im Gegenzug an, ihre Schicht am Montag zu übernehmen. Beginne mit „dafür“.",
          "Dafür übernehme ich deine Schicht am Montag.",
          "Steht „dafür“ vorn, folgt das konjugierte Verb auf Position zwei.",
          [
            word("adverb", "dafür"), word("verb", "übernehmen", "ich"), word("pronoun", "ich"),
            word("article", "deine"), word("noun", "Schicht", "A"), word("preposition", "am"),
            word("noun", "Montag", "D"),
          ],
        ),
      ],
    },
    {
      id: "a2-abschluss",
      chapter: "Pläne und Absprachen",
      title: "Abschluss · Einen Ausflug planen",
      scene: "Die Gruppe will einen Tagesausflug machen. Der Veranstalter meldet eine Änderung.",
      rule: "Bestätige eine Abmachung mit den wichtigen Angaben. Falls etwas geändert wird, nenne den Grund und die neue Lösung.",
      exercises: [
        cards(
          "Beginne mit dem Grund. Sage, dass das Picknick wegen des Regens ausfällt.",
          "Weil es regnet, fällt das Picknick aus.",
          "Im weil-Satz steht „regnet“ am Ende. Nach dem Komma beginnt der Hauptsatz mit „fällt“.",
          [
            word("conjunction", "weil"), word("pronoun", "es"), word("verb", "regnen", "er", ","),
            word("verb", "ausfallen", "er"), word("article", "das"), word("noun", "Picknick", "N"),
            word("particle", "aus"),
          ],
        ),
        cards(
          "Begründe, warum die Gruppe zuerst ins Museum geht.",
          "Wir gehen zuerst ins Museum, weil es regnet.",
          "Das Komma steht zwischen Haupt- und Nebensatz. „Regnet“ schließt den weil-Satz ab.",
          [
            word("pronoun", "wir"), word("verb", "gehen", "wir"), word("adverb", "zuerst"),
            word("preposition", "ins"), word("noun", "Museum", "A", ","), word("conjunction", "weil"),
            word("pronoun", "es"), word("verb", "regnen", "er"),
          ],
        ),
        cards(
          "Bestätige den neuen Treffpunkt. Beginne mit „wir“.",
          "Wir treffen uns um neun Uhr am Bahnhof.",
          "Das Reflexivpronomen zu „wir“ ist „uns“.",
          [
            word("pronoun", "wir"), word("verb", "treffen", "wir"), word("pronoun", "uns"),
            word("preposition", "um"), word("number", "neun"), word("noun", "Uhr", "A"), word("preposition", "am"),
            word("noun", "Bahnhof", "D"),
          ],
        ),
      ],
    },
  ],
};
