import { cards, word } from '../../courseCards';
import type { Level } from '../../exercises';

export const b2: Level = {
  title: "Abwägen und argumentieren",
  description: "Setze Konjunktiv, Passiv und Genitiv ein, um Aussagen zu begründen und einzuschränken.",
  lessons: [
    {
      id: "b2-haushalt",
      chapter: "Stadt und Gesellschaft",
      title: "Zwei Ziele gegeneinander abwägen",
      scene: "Der Stadtrat muss zwischen längeren Bibliothekszeiten und mehr mobilen Angeboten entscheiden.",
      rule: "Mit „zwar … aber“ räumst du einen Punkt ein und stellst ihm einen Einwand gegenüber. Gewichte beide Seiten anhand eines Kriteriums.",
      exercises: [
        cards(
          "Stelle den Nutzen eines Bücherbusses als hypothetisch dar. Beginne mit dem Subjekt.",
          "Ein Bücherbus könnte entlegene Viertel erreichen.",
          "„Könnte“ bezeichnet eine Möglichkeit im Konjunktiv II.",
          [
            word("article", "ein"), word("noun", "Bücherbus", "N"),
            word("modal", "können", "Konjunktiv II · er / sie / es"), word("adjective", "entlegen", "Endung -e"),
            word("noun", "Viertel", "a"), word("verb", "erreichen", "infinitive"),
          ],
        ),
        cards(
          "Formuliere die Abwägung mit „zwar … aber“.",
          "Längere Öffnungszeiten wären zwar hilfreich, aber ein Bücherbus würde mehr Stadtteile erreichen.",
          "Nach „aber“ beginnt die übliche Hauptsatzfolge mit dem Subjekt.",
          [
            word("adjective", "lang", "Komparativ · Endung -e"), word("noun", "Öffnungszeit", "n"),
            word("verb", "sein", "Konjunktiv II · sie"), word("adverb", "zwar"),
            word("adjective", "hilfreich", "positive", ","), word("conjunction", "aber"), word("article", "ein"),
            word("noun", "Bücherbus", "N"), word("verb", "werden", "Konjunktiv II · er / sie / es"),
            word("number", "mehr"), word("noun", "Stadtteil", "a"), word("verb", "erreichen", "infinitive"),
          ],
        ),
        cards(
          "Beginne mit der Einräumung mit „zwar“ und nenne die Bedingung im aber-Satz.",
          "Zwar wäre ein Bücherbus hilfreich, aber die Finanzierung ist ungeklärt.",
          "„Zwar“ eröffnet den ersten Hauptsatz. „Wäre“ steht an zweiter Stelle.",
          [
            word("adverb", "zwar"), word("verb", "sein", "Konjunktiv II · er / sie / es"), word("article", "ein"),
            word("noun", "Bücherbus", "N"), word("adjective", "hilfreich", "positive", ","),
            word("conjunction", "aber"), word("article", "die"), word("noun", "Finanzierung", "N"),
            word("verb", "sein", "er"), word("adjective", "ungeklärt", "positive"),
          ],
        ),
      ],
    },
    {
      id: "b2-kausalitaet",
      chapter: "Stadt und Gesellschaft",
      title: "Möglichkeit mit „sich lassen“ ausdrücken",
      scene: "Ein Bericht bringt kürzere Wege und höhere Zufriedenheit in Verbindung.",
      rule: "„Deutet darauf hin“ markiert eine plausible Deutung. „Beweist“ verlangt mehr als einen beobachteten Zusammenhang.",
      exercises: [
        cards(
          "Beginne mit dem Subjekt. Drücke mit „sich lassen“ aus, dass man die Ursache nicht feststellen kann.",
          "Die Ursache lässt sich aus den Daten nicht ermitteln.",
          "„Lässt sich ermitteln“ ersetzt hier „kann ermittelt werden“.",
          [
            word("article", "die"), word("noun", "Ursache", "N"), word("verb", "lassen", "er"),
            word("pronoun", "sich"), word("preposition", "aus"), word("article", "den"),
            word("noun", "Daten", "d"), word("particle", "nicht"), word("verb", "ermitteln", "infinitive"),
          ],
        ),
        cards(
          "Formuliere die Einschränkung.",
          "Aus der Befragung lässt sich kein eindeutiger Kausalzusammenhang ableiten.",
          "„Sich lassen + Infinitiv“ drückt Möglichkeit oder Unmöglichkeit aus.",
          [
            word("preposition", "aus"), word("article", "der"), word("noun", "Befragung", "D"),
            word("verb", "lassen", "er"), word("pronoun", "sich"), word("article", "kein"),
            word("adjective", "eindeutig", "Endung -er"), word("noun", "Kausalzusammenhang", "N"),
            word("verb", "ableiten", "infinitive"),
          ],
        ),
        cards(
          "Beginne mit „aus den Daten“. Formuliere eine Folgerung mit „sich lassen“.",
          "Aus den Daten lässt sich ein Zusammenhang ableiten.",
          "„Ableiten“ steht im Infinitiv ohne „zu“.",
          [
            word("preposition", "aus"), word("article", "den"), word("noun", "Daten", "d"),
            word("verb", "lassen", "er"), word("pronoun", "sich"), word("article", "ein"),
            word("noun", "Zusammenhang", "N"), word("verb", "ableiten", "infinitive"),
          ],
        ),
      ],
    },
    {
      id: "b2-auflagen",
      chapter: "Stadt und Gesellschaft",
      title: "Bedingungen und Verpflichtungen formulieren",
      scene: "Eine Initiative möchte einen Platz für eine Veranstaltung reservieren.",
      rule: "„Sofern“ nennt eine Voraussetzung. Formulierungen wie „ist einzureichen“ drücken eine Verpflichtung aus.",
      exercises: [
        cards(
          "Beginne mit „der Antrag“. Formuliere eine Verpflichtung mit „sein + zu“.",
          "Der Antrag ist bis Montag einzureichen.",
          "„Ist einzureichen“ entspricht hier „muss eingereicht werden“.",
          [
            word("article", "der"), word("noun", "Antrag", "N"), word("verb", "sein", "er"),
            word("preposition", "bis"), word("noun", "Montag", "A"),
            word("verb", "einreichen", "Infinitiv mit zu"),
          ],
        ),
        cards(
          "Formuliere die Voraussetzung für die Genehmigung.",
          "Die Genehmigung wird erteilt, sofern die Auflagen eingehalten werden.",
          "Das passive „werden“ steht am Ende des Nebensatzes.",
          [
            word("article", "die"), word("noun", "Genehmigung", "N"), word("verb", "werden", "er"),
            word("verb", "erteilen", "participle2", ","), word("conjunction", "sofern"), word("article", "die"),
            word("noun", "Auflage", "n"), word("verb", "einhalten", "participle2"), word("verb", "werden", "sie"),
          ],
        ),
        cards(
          "Beginne mit „sofern“. Nenne die notwendige Voraussetzung im Passiv.",
          "Sofern die Auflagen erfüllt werden, kann die Veranstaltung stattfinden.",
          "Im passiven sofern-Satz steht „werden“ hinter dem Partizip II.",
          [
            word("conjunction", "sofern"), word("article", "die"), word("noun", "Auflage", "n"),
            word("verb", "erfüllen", "participle2"), word("verb", "werden", "sie", ","),
            word("modal", "können", "er"), word("article", "die"), word("noun", "Veranstaltung", "N"),
            word("verb", "stattfinden", "infinitive"),
          ],
        ),
      ],
    },
    {
      id: "b2-netzkommentar",
      chapter: "Stadt und Gesellschaft",
      title: "Eine Behauptung sachlich entkräften",
      scene: "Ein Kommentar behauptet, eine App erreiche die gesamte Nachbarschaft.",
      rule: "Formuliere den Einwand als begrenzte Gegenbehauptung. „Inwiefern“ verlangt eine Erklärung des Ausmaßes oder der Art.",
      exercises: [
        cards(
          "Beginne mit „es ist unklar“. Frage indirekt nach der Reichweite der App.",
          "Es ist unklar, inwiefern die App das Viertel erreicht.",
          "„Inwiefern“ leitet eine indirekte Frage ein. Das finite Verb steht am Ende.",
          [
            word("pronoun", "es"), word("verb", "sein", "er"), word("adjective", "unklar", "positive", ","),
            word("question", "inwiefern"), word("article", "die"), word("noun", "App", "N"),
            word("article", "das"), word("noun", "Viertel", "A"), word("verb", "erreichen", "er"),
          ],
        ),
        cards(
          "Formuliere den Einwand mit „inwiefern“.",
          "Es bleibt offen, inwiefern die App Menschen ohne Smartphone erreicht.",
          "Ein indirekter Fragesatz endet mit dem konjugierten Verb.",
          [
            word("pronoun", "es"), word("verb", "bleiben", "er"), word("adjective", "offen", "positive", ","),
            word("question", "inwiefern"), word("article", "die"), word("noun", "App", "N"),
            word("noun", "Mensch", "a"), word("preposition", "ohne"), word("noun", "Smartphone", "A"),
            word("verb", "erreichen", "er"),
          ],
        ),
        cards(
          "Beginne mit „wir sollten prüfen“. Frage indirekt nach der Messmethode im Präsens Passiv.",
          "Wir sollten prüfen, wie die Reichweite gemessen wird.",
          "Im indirekten Fragesatz schließt „wird“ die passive Verbgruppe ab.",
          [
            word("pronoun", "wir"), word("modal", "sollen", "Konjunktiv II · wir"),
            word("verb", "prüfen", "infinitive", ","), word("question", "wie"), word("article", "die"),
            word("noun", "Reichweite", "N"), word("verb", "messen", "participle2"), word("verb", "werden", "er"),
          ],
        ),
      ],
    },
    {
      id: "b2-protokoll",
      chapter: "Beruf und Medien",
      title: "Ein Protokoll auf den Punkt bringen",
      scene: "Du erstellst den Ergebnisteil einer Teamsitzung.",
      rule: "Im Ergebnisprotokoll gehören Maßnahme, Zuständigkeit und Frist in die Zusammenfassung. Nominalisierungen können häufige Vorgänge verdichten.",
      exercises: [
        cards(
          "Beginne mit „die Beauftragung“. Formuliere den Zusammenhang im Protokollstil.",
          "Die Beauftragung der Schulung erfolgt nach der Prüfung.",
          "Das Genitivattribut benennt, was beauftragt wird.",
          [
            word("article", "die"), word("noun", "Beauftragung", "N"), word("article", "der"),
            word("noun", "Schulung", "G"), word("verb", "erfolgen", "er"), word("preposition", "nach"),
            word("article", "der"), word("noun", "Prüfung", "D"),
          ],
        ),
        cards(
          "Formuliere die nächste Maßnahme in Protokollsprache.",
          "Die Ermittlung der Schulungskosten erfolgt bis Mittwoch.",
          "Die Nominalisierung „Ermittlung“ kann zusammen mit Frist und Zuständigkeit im Protokoll stehen.",
          [
            word("article", "die"), word("noun", "Ermittlung", "N"), word("article", "der"),
            word("noun", "Schulungskosten", "g"), word("verb", "erfolgen", "er"), word("preposition", "bis"),
            word("noun", "Mittwoch", "A"),
          ],
        ),
        cards(
          "Beginne mit „nach“. Verdichte „nachdem die Kosten geprüft wurden“ zu einer Nominalgruppe.",
          "Nach der Prüfung der Kosten entscheidet das Team.",
          "Nach der Präposition „nach“ steht Dativ. „Der Kosten“ ist ein Genitivattribut.",
          [
            word("preposition", "nach"), word("article", "der"), word("noun", "Prüfung", "D"),
            word("article", "der"), word("noun", "Kosten", "g"), word("verb", "entscheiden", "er"),
            word("article", "das"), word("noun", "Team", "N"),
          ],
        ),
      ],
    },
    {
      id: "b2-indirekt",
      chapter: "Beruf und Medien",
      title: "Aussagen mit Quelle wiedergeben",
      scene: "Ein Artikel zitiert eine Pressesprecherin zur Verzögerung eines Projekts.",
      rule: "Konjunktiv I kann in der indirekten Rede zeigen, wessen Aussage wiedergegeben wird. Er bewertet ihre Wahrheit nicht.",
      exercises: [
        cards(
          "Beginne mit „die Leitung“. Gib die Aussage in indirekter Rede wieder.",
          "Die Leitung erklärte, der Zeitplan sei unverändert.",
          "„Sei“ ist der Konjunktiv I von „sein“ in der dritten Person Singular.",
          [
            word("article", "die"), word("noun", "Leitung", "N"),
            word("verb", "erklären", "Präteritum · sie (Singular)", ","), word("article", "der"),
            word("noun", "Zeitplan", "N"), word("verb", "sein", "Konjunktiv I · er / sie / es"),
            word("adjective", "unverändert", "positive"),
          ],
        ),
        cards(
          "Ordne die indirekte Wiedergabe.",
          "Die Sprecherin erklärte, die Prüfung werde im Januar abgeschlossen.",
          "„Werde“ markiert die indirekte Rede. „Abgeschlossen“ ist das Partizip II im Passiv.",
          [
            word("article", "die"), word("noun", "Sprecherin", "N"),
            word("verb", "erklären", "Präteritum · sie (Singular)", ","), word("article", "die"),
            word("noun", "Prüfung", "N"), word("verb", "werden", "Konjunktiv I · er / sie / es"),
            word("preposition", "im"), word("noun", "Januar", "D"), word("verb", "abschließen", "participle2"),
          ],
        ),
        cards(
          "Beginne mit „laut der Leitung“. Gib den Termin in indirekter Rede mit einem Passiv wieder.",
          "Laut der Leitung werde der Auftrag im März vergeben.",
          "„Werde“ markiert die fremde Aussage. Das Partizip II bildet mit ihm das Vorgangspassiv.",
          [
            word("preposition", "laut"), word("article", "der"), word("noun", "Leitung", "D"),
            word("verb", "werden", "Konjunktiv I · er / sie / es"), word("article", "der"),
            word("noun", "Auftrag", "N"), word("preposition", "im"), word("noun", "März", "D"),
            word("verb", "vergeben", "participle2"),
          ],
        ),
      ],
    },
    {
      id: "b2-ursache",
      chapter: "Beruf und Medien",
      title: "Ursachen im passenden Register formulieren",
      scene: "Ein Team muss eine Terminänderung öffentlich erklären.",
      rule: "„Weil“ leitet einen Nebensatz ein. „Aufgrund“ verlangt in der formellen Standardsprache meist den Genitiv.",
      exercises: [
        cards(
          "Beginne mit „aufgrund“. Nenne den Mangel an Ersatzteilen als Grund.",
          "Aufgrund fehlender Ersatzteile verschiebt sich die Reparatur.",
          "Der Genitiv Plural ohne Artikel ist an „-er“ beim Adjektiv erkennbar.",
          [
            word("preposition", "aufgrund"), word("adjective", "fehlend", "Endung -er"),
            word("noun", "Ersatzteil", "g"), word("verb", "verschieben", "er"), word("pronoun", "sich"),
            word("article", "die"), word("noun", "Reparatur", "N"),
          ],
        ),
        cards(
          "Formuliere eine Mitteilung mit vorgestellter Ursache.",
          "Aufgrund eines technischen Defekts muss der Betrieb vorübergehend eingestellt werden.",
          "Die vorangestellte Angabe belegt Position eins. „Muss“ folgt unmittelbar.",
          [
            word("preposition", "aufgrund"), word("article", "eines"),
            word("adjective", "technisch", "Endung -en"), word("noun", "Defekt", "G"),
            word("modal", "müssen", "er"), word("article", "der"), word("noun", "Betrieb", "N"),
            word("adjective", "vorübergehend", "positive"), word("verb", "einstellen", "participle2"),
            word("verb", "werden", "infinitive"),
          ],
        ),
        cards(
          "Beginne mit der Folge. Nenne den Grund mit „weil“ im Präsens Passiv.",
          "Das Haus öffnet später, weil die Anlage repariert wird.",
          "Der weil-Satz endet mit dem finiten Passivhilfsverb.",
          [
            word("article", "das"), word("noun", "Haus", "N"), word("verb", "öffnen", "er"),
            word("adjective", "spät", "comparative", ","), word("conjunction", "weil"), word("article", "die"),
            word("noun", "Anlage", "N"), word("verb", "reparieren", "participle2"), word("verb", "werden", "er"),
          ],
        ),
      ],
    },
    {
      id: "b2-perspektiven",
      chapter: "Debatte und Transfer",
      title: "Perspektiven fair gegenüberstellen",
      scene: "Zwei Eltern sprechen über die Einführung digitaler Schulbücher.",
      rule: "Unterscheide, ob jemand ein Ziel ablehnt oder eine Bedingung für seine Umsetzung nennt.",
      exercises: [
        cards(
          "Beginne mit „während“. Stelle in zwei Teilsätzen Maras und Deniz’ Position gegenüber.",
          "Während Mara sofort starten möchte, wartet Deniz auf die Geräte.",
          "Im während-Satz steht das konjugierte Modalverb nach dem Infinitiv.",
          [
            word("conjunction", "während"), word("properNoun", "Mara"), word("adverb", "sofort"),
            word("verb", "starten", "infinitive"), word("modal", "mögen", "Konjunktiv II · er / sie / es", ","),
            word("verb", "warten", "er"), word("properNoun", "Deniz"), word("preposition", "auf"),
            word("article", "die"), word("noun", "Gerät", "a"),
          ],
        ),
        cards(
          "Fasse die beiden Positionen mit „während“ zusammen.",
          "Während Mara einen schnellen Start befürwortet, hält Deniz eine vorherige Ausstattung für nötig.",
          "„Während“ kann hier einen Gegensatz zwischen zwei Positionen ausdrücken.",
          [
            word("conjunction", "während"), word("properNoun", "Mara"), word("article", "einen"),
            word("adjective", "schnell", "Endung -en"), word("noun", "Start", "A"),
            word("verb", "befürworten", "er", ","), word("verb", "halten", "er"), word("properNoun", "Deniz"),
            word("article", "eine"), word("adjective", "vorherig", "Endung -e"), word("noun", "Ausstattung", "A"),
            word("preposition", "für"), word("adjective", "nötig", "positive"),
          ],
        ),
        cards(
          "Beginne mit „Deniz“. Nenne seine Voraussetzung mit „dass“.",
          "Deniz betont, dass jedes Kind ein Gerät braucht.",
          "„Jedes Kind“ ist Singular. Das Verb steht am Ende des dass-Satzes.",
          [
            word("properNoun", "Deniz"), word("verb", "betonen", "er", ","), word("conjunction", "dass"),
            word("article", "jedes"), word("noun", "Kind", "N"), word("article", "ein"),
            word("noun", "Gerät", "A"), word("verb", "brauchen", "er"),
          ],
        ),
      ],
    },
    {
      id: "b2-einwand",
      chapter: "Debatte und Transfer",
      title: "Einen Einwand aufnehmen und begrenzen",
      scene: "In einer Diskussionsrunde geht es um flexible Arbeitszeit.",
      rule: "Mit „einerseits … andererseits“ stellst du zwei Gesichtspunkte nebeneinander. „Allerdings“ kann den Geltungsbereich einer Aussage einschränken.",
      exercises: [
        cards(
          "Beginne mit „allerdings“. Formuliere die Einschränkung im Präsens.",
          "Allerdings brauchen Kundenteams eine feste Erreichbarkeit.",
          "Nach „allerdings“ steht das Verb in der Pluralform an zweiter Stelle.",
          [
            word("adverb", "allerdings"), word("verb", "brauchen", "sie"), word("noun", "Kundenteam", "n"),
            word("article", "eine"), word("adjective", "fest", "Endung -e"), word("noun", "Erreichbarkeit", "A"),
          ],
        ),
        cards(
          "Formuliere einen Kompromiss.",
          "Einerseits sollen Teams flexibel planen können, andererseits muss die Erreichbarkeit gewährleistet sein.",
          "Beide Satzteile stehen als Hauptsätze mit Verb an zweiter Stelle.",
          [
            word("adverb", "einerseits"), word("modal", "sollen", "sie"), word("noun", "Team", "n"),
            word("adjective", "flexibel", "positive"), word("verb", "planen", "infinitive"),
            word("modal", "können", "infinitive", ","), word("adverb", "andererseits"),
            word("modal", "müssen", "er"), word("article", "die"), word("noun", "Erreichbarkeit", "N"),
            word("verb", "gewährleisten", "participle2"), word("verb", "sein", "infinitive"),
          ],
        ),
        cards(
          "Beginne mit „die Erreichbarkeit“. Formuliere den geforderten Zustand mit „muss“.",
          "Die Erreichbarkeit muss gewährleistet sein.",
          "„Gewährleistet sein“ bezeichnet den Zustand, der bestehen soll.",
          [
            word("article", "die"), word("noun", "Erreichbarkeit", "N"), word("modal", "müssen", "er"),
            word("verb", "gewährleisten", "participle2"), word("verb", "sein", "infinitive"),
          ],
        ),
      ],
    },
    {
      id: "b2-abschluss",
      chapter: "Debatte und Transfer",
      title: "Abschluss · Eine Empfehlung begründen",
      scene: "Ein Bildungsträger muss entscheiden, ob Abendkurse hybrid angeboten werden.",
      rule: "Verbinde Befund, Einschränkung und Empfehlung. Verwende eine Schlussfolgerung, die durch die verfügbaren Informationen getragen wird.",
      exercises: [
        cards(
          "Beginne mit „die Befunde“. Empfiehl eine Erprobung mit einem zu-Infinitiv.",
          "Die Befunde sprechen dafür, das Angebot zunächst zu erproben.",
          "„Dafür“ verweist auf die folgende Infinitivgruppe. Das Komma trennt sie ab.",
          [
            word("article", "die"), word("noun", "Befund", "n"), word("verb", "sprechen", "sie"),
            word("adverb", "dafür", undefined, ","), word("article", "das"), word("noun", "Angebot", "A"),
            word("adverb", "zunächst"), word("particle", "zu"), word("verb", "erproben", "infinitive"),
          ],
        ),
        cards(
          "Formuliere die vorsichtige Folgerung.",
          "Die Ergebnisse sprechen dafür, ein hybrides Angebot zunächst zu erproben.",
          "„Zunächst“ begrenzt die Empfehlung auf einen ersten Schritt.",
          [
            word("article", "die"), word("noun", "Ergebnis", "n"), word("verb", "sprechen", "sie"),
            word("adverb", "dafür", undefined, ","), word("article", "ein"),
            word("adjective", "hybrid", "Endung -es"), word("noun", "Angebot", "A"), word("adverb", "zunächst"),
            word("particle", "zu"), word("verb", "erproben", "infinitive"),
          ],
        ),
        cards(
          "Beginne mit „obwohl“. Räume den Erfolg ein und begrenze die Schlussfolgerung.",
          "Obwohl mehr Berufstätige teilnahmen, bleibt die Wirkung eines Hybridformats offen.",
          "Im Nebensatz bleibt das trennbare Verb zusammen. „Teilnahmen“ ist Präteritum im Plural.",
          [
            word("conjunction", "obwohl"), word("number", "mehr"), word("noun", "Berufstätige", "n"),
            word("verb", "teilnehmen", "Präteritum · sie", ","), word("verb", "bleiben", "er"),
            word("article", "die"), word("noun", "Wirkung", "N"), word("article", "eines"),
            word("noun", "Hybridformat", "G"), word("adjective", "offen", "positive"),
          ],
        ),
      ],
    },
  ],
};
