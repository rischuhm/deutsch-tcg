import { cards, word } from '../../courseCards';
import type { Level } from '../../exercises';

export const b1: Level = {
  title: "Selbstständig unterwegs",
  description: "Erzähle zusammenhängend, begründe Entscheidungen und kläre Probleme.",
  lessons: [
    {
      id: "b1-reisebericht",
      chapter: "Erlebnisse und Pläne",
      title: "Eine Panne erzählen",
      scene: "Noah berichtet von einer Reise, bei der vieles anders lief als geplant.",
      rule: "Ein einmaliges Ereignis in der Vergangenheit kannst du mit „als“ einleiten. Bei wiederkehrenden Ereignissen passt „immer wenn“.",
      exercises: [
        cards(
          "Beginne mit „als“ und erzähle die einmalige Ankunft im Präteritum.",
          "Als ich in Bonn ankam, war es schon dunkel.",
          "Bei „als“ steht das ungetrennte Verb „ankam“ am Ende des Nebensatzes.",
          [
            word("conjunction", "als"), word("pronoun", "ich"), word("preposition", "in"),
            word("properNoun", "Bonn"), word("verb", "ankommen", "Präteritum · ich", ","),
            word("verb", "sein", "Präteritum · er / sie / es"), word("pronoun", "es"), word("adverb", "schon"),
            word("adjective", "dunkel", "positive"),
          ],
        ),
        cards(
          "Beginne mit dem Zeitsatz.",
          "Als ich am Hotel ankam, warteten schon zwei Gäste vor dem Eingang.",
          "Der als-Satz besetzt die erste Position des Hauptsatzes. Danach folgt „warteten“.",
          [
            word("conjunction", "als"), word("pronoun", "ich"), word("preposition", "am"),
            word("noun", "Hotel", "D"), word("verb", "ankommen", "Präteritum · ich", ","),
            word("verb", "warten", "Präteritum · sie"), word("adverb", "schon"), word("number", "zwei"),
            word("noun", "Gast", "n"), word("preposition", "vor"), word("article", "dem"),
            word("noun", "Eingang", "D"),
          ],
        ),
        cards(
          "Beginne mit „immer wenn“. Beschreibe eine wiederholte Fahrt in der Vergangenheit.",
          "Immer wenn der Zug ausfiel, nahm ich den Bus.",
          "„Immer wenn“ bezeichnet die Wiederholung. „Ausfiel“ ist Präteritum.",
          [
            word("adverb", "immer"), word("conjunction", "wenn"), word("article", "der"), word("noun", "Zug", "N"),
            word("verb", "ausfallen", "Präteritum · er / sie / es", ","),
            word("verb", "nehmen", "Präteritum · ich"), word("pronoun", "ich"), word("article", "den"),
            word("noun", "Bus", "A"),
          ],
        ),
      ],
    },
    {
      id: "b1-reklamation",
      chapter: "Erlebnisse und Pläne",
      title: "Eine Reklamation schreiben",
      scene: "Ein Ersatzgerät kam an, aber das gleiche Problem trat erneut auf.",
      rule: "Eine verständliche Reklamation nennt den Vorgang, beschreibt den Mangel und sagt klar, welche Lösung gewünscht ist.",
      exercises: [
        cards(
          "Beginne mit „obwohl“. Beschreibe den erfolglosen Versuch im Perfekt.",
          "Obwohl ich das Radio geprüft habe, finde ich den Fehler nicht.",
          "Im obwohl-Satz steht das finite Hilfsverb nach dem Partizip.",
          [
            word("conjunction", "obwohl"), word("pronoun", "ich"), word("article", "das"),
            word("noun", "Radio", "A"), word("verb", "prüfen", "participle2"), word("verb", "haben", "ich", ","),
            word("verb", "finden", "ich"), word("pronoun", "ich"), word("article", "den"),
            word("noun", "Fehler", "A"), word("particle", "nicht"),
          ],
        ),
        cards(
          "Verbinde beide Aussagen mit einem Nebensatz mit „obwohl“.",
          "Obwohl ich das Gerät geladen habe, lässt es sich nicht einschalten.",
          "„Obwohl“ nennt einen Umstand, der ein anderes Ergebnis erwarten lässt.",
          [
            word("conjunction", "obwohl"), word("pronoun", "ich"), word("article", "das"),
            word("noun", "Gerät", "A"), word("verb", "laden", "participle2"), word("verb", "haben", "ich", ","),
            word("verb", "lassen", "er"), word("pronoun", "es"), word("pronoun", "sich"),
            word("particle", "nicht"), word("verb", "einschalten", "infinitive"),
          ],
        ),
        cards(
          "Bitte formal um einen Ersatz. Beginne mit „bitte“.",
          "Bitte senden Sie mir ein Ersatzgerät.",
          "„Senden“ kann einen Empfänger im Dativ und eine Sache im Akkusativ haben.",
          [
            word("particle", "bitte"), word("verb", "senden", "Imperativ · Sie"), word("pronoun", "Sie"),
            word("pronoun", "mir"), word("article", "ein"), word("noun", "Ersatzgerät", "A"),
          ],
        ),
      ],
    },
    {
      id: "b1-kurswahl",
      chapter: "Erlebnisse und Pläne",
      title: "Eine Wahl begründen",
      scene: "Lea vergleicht zwei Weiterbildungskurse.",
      rule: "„Deshalb“ bezeichnet eine Folge und kann im Hauptsatz vorn stehen. Dann folgt gleich das finite Verb.",
      exercises: [
        cards(
          "Beginne mit „deshalb“ und sage, dass du Kurs B wählst.",
          "Deshalb wähle ich Kurs B.",
          "Nach „deshalb“ folgt hier das finite Verb, danach das Subjekt.",
          [
            word("adverb", "deshalb"), word("verb", "wählen", "ich"), word("pronoun", "ich"),
            word("noun", "Kurs", "A"), word("properNoun", "B"),
          ],
        ),
        cards(
          "Formuliere eine begründete Entscheidung. Beginne mit „Deshalb“.",
          "Deshalb entscheide ich mich für Kurs B.",
          "Steht „deshalb“ vorn, folgt „entscheide“ auf Position zwei.",
          [
            word("adverb", "deshalb"), word("verb", "entscheiden", "ich"), word("pronoun", "ich"),
            word("pronoun", "mich"), word("preposition", "für"), word("noun", "Kurs", "A"),
            word("properNoun", "B"),
          ],
        ),
        cards(
          "Begründe mit „weil“, warum du Kurs B wählst. Beginne mit „ich“.",
          "Ich wähle Kurs B, weil er praktische Übungen bietet.",
          "„Bietet“ steht am Ende des weil-Satzes und stimmt mit „er“ überein.",
          [
            word("pronoun", "ich"), word("verb", "wählen", "ich"), word("noun", "Kurs", "A"),
            word("properNoun", "B", undefined, ","), word("conjunction", "weil"), word("pronoun", "er"),
            word("adjective", "praktisch", "Endung -e"), word("noun", "Übung", "a"), word("verb", "bieten", "er"),
          ],
        ),
      ],
    },
    {
      id: "b1-ziel",
      chapter: "Erlebnisse und Pläne",
      title: "Über ein Ziel sprechen",
      scene: "Noah will mehr mit Menschen arbeiten und spricht über seine beruflichen Pläne.",
      rule: "„Um … zu“ drückt ein Ziel bei gleichem Subjekt aus. Mit „damit“ kannst du auch ein anderes Subjekt nennen.",
      exercises: [
        cards(
          "Beginne mit „ich“ und nenne das Ziel deiner Erklärung mit „damit“.",
          "Ich erkläre den Ablauf, damit alle selbstständig anfangen können.",
          "Bei „damit“ steht das finite Modalverb nach dem Infinitiv.",
          [
            word("pronoun", "ich"), word("verb", "erklären", "ich"), word("article", "den"),
            word("noun", "Ablauf", "A", ","), word("conjunction", "damit"), word("pronoun", "alle"),
            word("adjective", "selbstständig", "positive"), word("verb", "anfangen", "infinitive"),
            word("modal", "können", "sie"),
          ],
        ),
        cards(
          "Nenne Noahs Ziel mit „um … zu“.",
          "Ich absolviere ein Praktikum, um den Beruf besser kennenzulernen.",
          "Bei „kennenlernen“ steht „zu“ zwischen den Verbteilen.",
          [
            word("pronoun", "ich"), word("verb", "absolvieren", "ich"), word("article", "ein"),
            word("noun", "Praktikum", "A", ","), word("conjunction", "um"), word("article", "den"),
            word("noun", "Beruf", "A"), word("adjective", "gut", "comparative"),
            word("verb", "kennenlernen", "Infinitiv mit zu"),
          ],
        ),
        cards(
          "Beginne mit „um“ und erkläre, warum du täglich übst.",
          "Um sicherer aufzutreten, übe ich täglich.",
          "Bei „auftreten“ steht „zu“ zwischen Verbzusatz und Verbstamm.",
          [
            word("conjunction", "um"), word("adjective", "sicher", "comparative"),
            word("verb", "auftreten", "Infinitiv mit zu", ","), word("verb", "üben", "ich"),
            word("pronoun", "ich"), word("adjective", "täglich", "positive"),
          ],
        ),
      ],
    },
    {
      id: "b1-nachricht",
      chapter: "Arbeit und Öffentlichkeit",
      title: "Indirekte Fragen am Arbeitsplatz",
      scene: "Eine Kollegin war bei der Teambesprechung nicht dabei.",
      rule: "Unterscheide Beschluss, Bedingung und offenen Punkt. Indirekte Fragen leitet man mit einem Fragewort oder „ob“ ein.",
      exercises: [
        cards(
          "Formuliere eine indirekte Ja/Nein-Frage mit „ob“. Beginne mit „frag bitte“.",
          "Frag bitte, ob die Frühschicht heute ausfällt.",
          "Im ob-Satz bleibt „ausfällt“ am Ende zusammen.",
          [
            word("verb", "fragen", "Imperativ · du"), word("adverb", "bitte", undefined, ","),
            word("conjunction", "ob"), word("article", "die"), word("noun", "Frühschicht", "N"),
            word("adverb", "heute"), word("verb", "ausfallen", "Präsens im Nebensatz · er / sie / es"),
          ],
        ),
        cards(
          "Formuliere die offene Frage indirekt.",
          "Es ist noch offen, ob am Freitag eine zusätzliche Schicht nötig ist.",
          "Die indirekte Frage mit „ob“ endet mit dem finiten Verb.",
          [
            word("pronoun", "es"), word("verb", "sein", "er"), word("adverb", "noch"),
            word("adjective", "offen", "positive", ","), word("conjunction", "ob"), word("preposition", "am"),
            word("noun", "Freitag", "D"), word("article", "eine"), word("adjective", "zusätzlich", "Endung -e"),
            word("noun", "Schicht", "N"), word("adjective", "nötig", "positive"), word("verb", "sein", "er"),
          ],
        ),
        cards(
          "Beginne mit „ich weiß“. Benenne die offene Frage nach der Uhrzeit.",
          "Ich weiß noch nicht, wann die Schicht beginnt.",
          "Bei „wann“ steht das konjugierte Verb am Ende der indirekten Frage.",
          [
            word("pronoun", "ich"), word("verb", "wissen", "ich"), word("adverb", "noch"),
            word("particle", "nicht", undefined, ","), word("question", "wann"), word("article", "die"),
            word("noun", "Schicht", "N"), word("verb", "beginnen", "er"),
          ],
        ),
      ],
    },
    {
      id: "b1-mitmachen",
      chapter: "Arbeit und Öffentlichkeit",
      title: "Relativpronomen im richtigen Fall",
      scene: "Lea sucht für einen Freund ein passendes Ehrenamt.",
      rule: "Relativsätze erklären ein Nomen näher. Den Fall des Relativpronomens bestimmt seine Aufgabe im Relativsatz.",
      exercises: [
        cards(
          "Beginne mit „das ist“. Ergänze einen Relativsatz mit „helfen“.",
          "Das ist der Verein, dem ich helfe.",
          "„Helfen“ verlangt Dativ. Das maskuline Relativpronomen lautet „dem“.",
          [
            word("pronoun", "das"), word("verb", "sein", "er"), word("article", "der"),
            word("noun", "Verein", "N", ","), word("pronoun", "dem"), word("pronoun", "ich"),
            word("verb", "helfen", "ich"),
          ],
        ),
        cards(
          "Beschreibe die Person näher.",
          "Das ist die Frau, die das Reparaturcafé organisiert.",
          "„Die“ ist das Subjekt von „organisiert“.",
          [
            word("pronoun", "das"), word("verb", "sein", "er"), word("article", "die"),
            word("noun", "Frau", "N", ","), word("pronoun", "die"), word("article", "das"),
            word("noun", "Reparaturcafé", "A"), word("verb", "organisieren", "er"),
          ],
        ),
        cards(
          "Beginne mit „das ist“. Ergänze einen Relativsatz mit „besuchen“.",
          "Das ist der Verein, den wir besuchen.",
          "„Besuchen“ verlangt Akkusativ. Das maskuline Relativpronomen lautet „den“.",
          [
            word("pronoun", "das"), word("verb", "sein", "er"), word("article", "der"),
            word("noun", "Verein", "N", ","), word("pronoun", "den"), word("pronoun", "wir"),
            word("verb", "besuchen", "wir"),
          ],
        ),
      ],
    },
    {
      id: "b1-hausordnung",
      chapter: "Arbeit und Öffentlichkeit",
      title: "Regeln ohne handelnde Person erklären",
      scene: "Am Eingang eines Gemeinschaftsraums hängen neue Regeln.",
      rule: "Das Vorgangspassiv im Präsens besteht aus „werden“ und Partizip II. Der Vorgang steht im Mittelpunkt.",
      exercises: [
        cards(
          "Formuliere die Regel als Vorgangspassiv. Beginne mit „die Tür“.",
          "Die Tür wird nach dem Kurs abgeschlossen.",
          "Der Singular verlangt „wird“. Das Partizip II benennt den Vorgang.",
          [
            word("article", "die"), word("noun", "Tür", "N"), word("verb", "werden", "er"),
            word("preposition", "nach"), word("article", "dem"), word("noun", "Kurs", "D"),
            word("verb", "abschließen", "participle2"),
          ],
        ),
        cards(
          "Beschreibe den Vorgang im Passiv.",
          "Die Tische werden nach der Veranstaltung gereinigt.",
          "Das Partizip „gereinigt“ schließt die Satzklammer.",
          [
            word("article", "die"), word("noun", "Tisch", "n"), word("verb", "werden", "sie"),
            word("preposition", "nach"), word("article", "der"), word("noun", "Veranstaltung", "D"),
            word("verb", "reinigen", "participle2"),
          ],
        ),
        cards(
          "Beginne mit „nach dem Treffen“. Beschreibe die Müllentsorgung im Präsens Passiv.",
          "Nach dem Treffen wird der Müll entsorgt.",
          "Das untrennbare „ent-“ bekommt beim Partizip kein zusätzliches „ge-“.",
          [
            word("preposition", "nach"), word("article", "dem"), word("noun", "Treffen", "D"),
            word("verb", "werden", "er"), word("article", "der"), word("noun", "Müll", "N"),
            word("verb", "entsorgen", "participle2"),
          ],
        ),
      ],
    },
    {
      id: "b1-konflikt",
      chapter: "Meinung und Zusammenarbeit",
      title: "Einen Konflikt entschärfen",
      scene: "Die Nachbarin beschwert sich über laute Musik.",
      rule: "Geh zuerst auf das Anliegen ein. Konjunktiv II hilft, einen Vorschlag höflich einzubringen.",
      exercises: [
        cards(
          "Beginne mit „ich“ und biete im Konjunktiv II an, Kopfhörer zu benutzen.",
          "Ich könnte abends Kopfhörer benutzen.",
          "„Könnte“ stellt eine Möglichkeit als höflichen Vorschlag dar.",
          [
            word("pronoun", "ich"), word("modal", "können", "Konjunktiv II · ich"), word("adverb", "abends"),
            word("noun", "Kopfhörer", "a"), word("verb", "benutzen", "infinitive"),
          ],
        ),
        cards(
          "Formuliere einen Gegenvorschlag.",
          "Wir könnten uns darauf einigen, dass ab zehn Uhr Ruhe ist.",
          "Der dass-Satz nennt den Inhalt der Vereinbarung.",
          [
            word("pronoun", "wir"), word("modal", "können", "Konjunktiv II · wir"), word("pronoun", "uns"),
            word("adverb", "darauf"), word("verb", "einigen", "infinitive", ","), word("conjunction", "dass"),
            word("preposition", "ab"), word("number", "zehn"), word("noun", "Uhr", "D"), word("noun", "Ruhe", "N"),
            word("verb", "sein", "er"),
          ],
        ),
        cards(
          "Erfrage die Zustimmung höflich. Beginne mit „sein“ im Konjunktiv II.",
          "Wäre das für Sie in Ordnung?",
          "In der Entscheidungsfrage steht „wäre“ zuerst.",
          [
            word("verb", "sein", "Konjunktiv II · er / sie / es"), word("pronoun", "das"),
            word("preposition", "für"), word("pronoun", "Sie", "A"), word("preposition", "in"),
            word("noun", "Ordnung", "D"),
          ],
        ),
      ],
    },
    {
      id: "b1-forum",
      chapter: "Meinung und Zusammenarbeit",
      title: "In einem Forum Stellung nehmen",
      scene: "Im Stadtteilforum wird über einen autofreien Sonntag diskutiert.",
      rule: "Eine kurze Stellungnahme braucht eine Position und einen Grund. „Trotzdem“ führt zu einer Aussage, die angesichts des vorherigen Satzes überrascht.",
      exercises: [
        cards(
          "Beginne mit „trotzdem“. Sage, dass du den Vorschlag gut findest.",
          "Trotzdem finde ich den Vorschlag gut.",
          "„Trotzdem“ belegt die erste Position, „finde“ die zweite.",
          [
            word("adverb", "trotzdem"), word("verb", "finden", "ich"), word("pronoun", "ich"),
            word("article", "den"), word("noun", "Vorschlag", "A"), word("adjective", "gut", "positive"),
          ],
        ),
        cards(
          "Formuliere die Position mit „meiner Meinung nach“ am Anfang.",
          "Meiner Meinung nach sollte die Stadt den Vorschlag ausprobieren.",
          "Nach der vorangestellten Angabe steht „sollte“.",
          [
            word("article", "meiner"), word("noun", "Meinung", "D"), word("preposition", "nach"),
            word("modal", "sollen", "Konjunktiv II · er / sie / es"), word("article", "die"),
            word("noun", "Stadt", "N"), word("article", "den"), word("noun", "Vorschlag", "A"),
            word("verb", "ausprobieren", "infinitive"),
          ],
        ),
        cards(
          "Beginne mit dem Einwand mit „obwohl“. Befürworte danach den Plan.",
          "Obwohl die Zufahrt schwieriger wird, befürworte ich den Plan.",
          "Im obwohl-Satz steht „wird“ hinten. Der Hauptsatz beginnt mit „befürworte“.",
          [
            word("conjunction", "obwohl"), word("article", "die"), word("noun", "Zufahrt", "N"),
            word("adjective", "schwierig", "comparative"), word("verb", "werden", "er", ","),
            word("verb", "befürworten", "ich"), word("pronoun", "ich"), word("article", "den"),
            word("noun", "Plan", "A"),
          ],
        ),
      ],
    },
    {
      id: "b1-abschluss",
      chapter: "Meinung und Zusammenarbeit",
      title: "Abschluss · Einen Vorschlag vermitteln",
      scene: "Eine Gruppe plant eine Veranstaltung. Du fasst die Diskussion für ein abwesendes Mitglied zusammen.",
      rule: "Trenne sicher Beschlossenes von Vorschlägen. Gib die Gründe so weiter, dass die andere Person entscheiden kann.",
      exercises: [
        cards(
          "Beginne mit „es bleibt offen“. Formuliere die Unsicherheit mit „ob“.",
          "Es bleibt offen, ob der Raum frei ist.",
          "„Ist“ steht am Ende der indirekten Frage.",
          [
            word("pronoun", "es"), word("verb", "bleiben", "er"), word("adjective", "offen", "positive", ","),
            word("conjunction", "ob"), word("article", "der"), word("noun", "Raum", "N"),
            word("adjective", "frei", "positive"), word("verb", "sein", "er"),
          ],
        ),
        cards(
          "Beschreibe die Alternative mit einer Bedingung.",
          "Falls das Rathaus nicht frei ist, fragen wir im Jugendzentrum nach.",
          "Der Hauptsatz beginnt nach dem vorangestellten Nebensatz mit „fragen“.",
          [
            word("conjunction", "falls"), word("article", "das"), word("noun", "Rathaus", "N"),
            word("particle", "nicht"), word("adjective", "frei", "positive"), word("verb", "sein", "er", ","),
            word("verb", "nachfragen", "wir"), word("pronoun", "wir"), word("preposition", "im"),
            word("noun", "Jugendzentrum", "D"), word("particle", "nach"),
          ],
        ),
        cards(
          "Beginne mit „falls“. Sage, wann die Gruppe einen anderen Raum sucht.",
          "Falls das Rathaus geschlossen bleibt, suchen wir einen anderen Raum.",
          "„Bleibt“ schließt den falls-Satz ab. Danach beginnt der Hauptsatz mit „suchen“.",
          [
            word("conjunction", "falls"), word("article", "das"), word("noun", "Rathaus", "N"),
            word("verb", "schließen", "participle2"), word("verb", "bleiben", "er", ","),
            word("verb", "suchen", "wir"), word("pronoun", "wir"), word("article", "einen"),
            word("adjective", "ander", "Endung -en"), word("noun", "Raum", "A"),
          ],
        ),
      ],
    },
  ],
};
