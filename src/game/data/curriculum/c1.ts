import { cards, word } from '../../courseCards';
import type { Level } from '../../exercises';

export const c1: Level = {
  title: "Zwischentöne und komplexe Texte",
  description: "Formuliere präzise mit komplexen Nebensätzen, Partizipialattributen und passenden Verbformen.",
  lessons: [
    {
      id: "c1-diplomatie",
      chapter: "Zwischentöne und Register",
      title: "Förmliche Bedingungen und Absagen",
      scene: "Nach einer Ideenrunde erhält Mara die Antwort eines langjährigen Partners.",
      rule: "Höfliche Gesprächsangebote und unverbindliche Bedingungen können eine Ablehnung abfedern. Entscheidend ist, welche konkrete Zusage fehlt.",
      exercises: [
        cards(
          "Beginne die formelle Absage mit einem Bedingungssatz ohne „wenn“.",
          "Sollten sich die Termine überschneiden, müssten wir die Beteiligung absagen.",
          "Im uneingeleiteten Bedingungssatz steht das finite Verb zuerst. „Sollten“ lässt die Bedingung offen.",
          [
            word("modal", "sollen", "Konjunktiv II · sie"), word("pronoun", "sich"), word("article", "die"),
            word("noun", "Termin", "n"), word("verb", "überschneiden", "infinitive", ","),
            word("modal", "müssen", "Konjunktiv II · wir"), word("pronoun", "wir"), word("article", "die"),
            word("noun", "Beteiligung", "A"), word("verb", "absagen", "infinitive"),
          ],
        ),
        cards(
          "Beginne mit einer förmlichen Bedingung ohne „wenn“.",
          "Sollten sich die Rahmenbedingungen ändern, wären wir bereit, das Gespräch erneut aufzunehmen.",
          "Der konditionale Nebensatz beginnt mit dem finiten „sollten“.",
          [
            word("modal", "sollen", "Konjunktiv II · sie"), word("pronoun", "sich"), word("article", "die"),
            word("noun", "Rahmenbedingung", "n"), word("verb", "ändern", "infinitive", ","),
            word("verb", "sein", "Konjunktiv II · wir"), word("pronoun", "wir"),
            word("adjective", "bereit", "positive", ","), word("article", "das"), word("noun", "Gespräch", "A"),
            word("adjective", "erneut", "positive"), word("verb", "aufnehmen", "Infinitiv mit zu"),
          ],
        ),
        cards(
          "Beginne mit dem Grund. Formuliere die Absage im formellen Register mit „mangels“.",
          "Mangels verfügbarer Kapazitäten müssen wir die Teilnahme ablehnen.",
          "„Mangels“ wird hier mit Genitiv verwendet. Ohne Artikel trägt das Adjektiv die Endung „-er“.",
          [
            word("preposition", "mangels"), word("adjective", "verfügbar", "Endung -er"),
            word("noun", "Kapazität", "g"), word("modal", "müssen", "wir"), word("pronoun", "wir"),
            word("article", "die"), word("noun", "Teilnahme", "A"), word("verb", "ablehnen", "infinitive"),
          ],
        ),
      ],
    },
    {
      id: "c1-ironisch",
      chapter: "Zwischentöne und Register",
      title: "Adjektivendungen im Plural",
      scene: "Ein Kollegenteam bespricht die Zugänglichkeit eines neuen Onlineformulars.",
      rule: "Ironie kann aus dem Konflikt zwischen positivem Wortlaut und einem klar negativen Sachverhalt entstehen. Die Deutung braucht Kontext.",
      exercises: [
        cards(
          "Beginne mit dem Verfahren. Benenne die Hürden ohne Artikel vor dem Pluralobjekt.",
          "Das Verfahren erzeugt vermeidbare Belastungen.",
          "Im Akkusativ Plural ohne Artikel erhält das Adjektiv „-e“.",
          [
            word("article", "das"), word("noun", "Verfahren", "N"), word("verb", "erzeugen", "er"),
            word("adjective", "vermeidbar", "Endung -e"), word("noun", "Belastung", "a"),
          ],
        ),
        cards(
          "Formuliere die Kritik für ein sachliches Protokoll.",
          "Das Verfahren schafft durch die Nachweispflichten zusätzliche Zugangshürden.",
          "Die sachliche Formulierung benennt den Mechanismus hinter der Kritik.",
          [
            word("article", "das"), word("noun", "Verfahren", "N"), word("verb", "schaffen", "er"),
            word("preposition", "durch"), word("article", "die"), word("noun", "Nachweispflicht", "a"),
            word("adjective", "zusätzlich", "Endung -e"), word("noun", "Zugangshürde", "a"),
          ],
        ),
        cards(
          "Beginne mit dem Subjekt. Beschreibe mit „an“ und Dativ den Punkt, an dem das Verfahren scheitert.",
          "Die Anmeldung scheitert an fehlenden Nachweisen.",
          "„An etwas scheitern“ fordert Dativ. Das Adjektiv im Plural endet hier auf „-en“.",
          [
            word("article", "die"), word("noun", "Anmeldung", "N"), word("verb", "scheitern", "er"),
            word("preposition", "an"), word("adjective", "fehlend", "Endung -en"), word("noun", "Nachweis", "d"),
          ],
        ),
      ],
    },
    {
      id: "c1-register",
      chapter: "Zwischentöne und Register",
      title: "Eine Fachinformation vermitteln",
      scene: "Ein Forschungsprojekt will die Ergebnisse einer Befragung verständlich veröffentlichen.",
      rule: "Beim Registerwechsel müssen Reichweite und Unsicherheit der Aussage erhalten bleiben. Erkläre Fachbegriffe über ihre Folgen.",
      exercises: [
        cards(
          "Beginne mit „ob“ und schränke die Übertragbarkeit mit „sich lassen“ ein.",
          "Ob sich die Befunde übertragen lassen, bleibt offen.",
          "„Sich übertragen lassen“ drückt Möglichkeit aus. Im Nebensatz steht „lassen“ am Ende.",
          [
            word("conjunction", "ob"), word("pronoun", "sich"), word("article", "die"),
            word("noun", "Befund", "n"), word("verb", "übertragen", "infinitive"),
            word("verb", "lassen", "sie", ","), word("verb", "bleiben", "er"),
            word("adjective", "offen", "positive"),
          ],
        ),
        cards(
          "Ordne die formelle Einschränkung mit „inwieweit“.",
          "Inwieweit der Befund auf andere Gruppen übertragbar ist, bleibt zu prüfen.",
          "Die indirekte Frage steht als Einheit vor dem Prädikat „bleibt zu prüfen“.",
          [
            word("question", "inwieweit"), word("article", "der"), word("noun", "Befund", "N"),
            word("preposition", "auf"), word("adjective", "ander", "Endung -e"), word("noun", "Gruppe", "a"),
            word("adjective", "übertragbar", "positive"), word("verb", "sein", "er", ","),
            word("verb", "bleiben", "er"), word("particle", "zu"), word("verb", "prüfen", "infinitive"),
          ],
        ),
        cards(
          "Beginne mit „die Aussagekraft“. Baue ein Genitivattribut mit einem artikellosen Plural ein.",
          "Die Aussagekraft selektiv erhobener Daten ist begrenzt.",
          "„Selektiv erhobener Daten“ ist ein Genitivattribut. Das Partizip übernimmt die Adjektivendung „-er“.",
          [
            word("article", "die"), word("noun", "Aussagekraft", "N"), word("adjective", "selektiv", "positive"),
            word("adjective", "erhoben", "Endung -er"), word("noun", "Daten", "g"), word("verb", "sein", "er"),
            word("verb", "begrenzen", "participle2"),
          ],
        ),
      ],
    },
    {
      id: "c1-attribution",
      chapter: "Zwischentöne und Register",
      title: "Eine verdichtete Formulierung auflösen",
      scene: "Ein Verwaltungstext enthält ein umfangreiches Attribut, das beim ersten Lesen schwer zuzuordnen ist.",
      rule: "Partizipialattribute lassen sich oft in Relativsätze umformen. Prüfe dabei, worauf das Attribut bezogen ist und ob ein Vorgang oder eine Verpflichtung beschrieben wird.",
      exercises: [
        cards(
          "Beginne mit dem Subjekt. Verdichte „die Unterlagen, die nachzureichen sind“ zu einer Nominalgruppe.",
          "Die nachzureichenden Unterlagen werden separat geprüft.",
          "„Nachzureichend“ drückt eine Verpflichtung aus. Nach „die“ steht im Nominativ Plural „-en“.",
          [
            word("article", "die"), word("adjective", "nachzureichend", "Endung -en"),
            word("noun", "Unterlage", "n"), word("verb", "werden", "sie"),
            word("adjective", "separat", "positive"), word("verb", "prüfen", "participle2"),
          ],
        ),
        cards(
          "Formuliere die Vorschrift mit einem Relativsatz.",
          "Die Stellungnahmen, die bis Montag eingereicht werden müssen, werden anschließend gesichtet.",
          "Der Relativsatz steht zwischen zwei Kommas.",
          [
            word("article", "die"), word("noun", "Stellungnahme", "n", ","), word("pronoun", "die", "pl"),
            word("preposition", "bis"), word("noun", "Montag", "A"), word("verb", "einreichen", "participle2"),
            word("verb", "werden", "infinitive"), word("modal", "müssen", "sie", ","),
            word("verb", "werden", "sie"), word("adjective", "anschließend", "positive"),
            word("verb", "sichten", "participle2"),
          ],
        ),
        cards(
          "Beginne mit „die Unterlagen“. Forme das verpflichtende Attribut in einen Relativsatz um.",
          "Die Unterlagen, die nachgereicht werden müssen, werden separat geprüft.",
          "Das Gerundiv lässt sich hier durch „nachgereicht werden müssen“ auflösen.",
          [
            word("article", "die"), word("noun", "Unterlage", "n", ","), word("pronoun", "die", "pl"),
            word("verb", "nachreichen", "participle2"), word("verb", "werden", "infinitive"),
            word("modal", "müssen", "sie", ","), word("verb", "werden", "sie"),
            word("adjective", "separat", "positive"), word("verb", "prüfen", "participle2"),
          ],
        ),
      ],
    },
    {
      id: "c1-prognose",
      chapter: "Quellen und Schlussfolgerungen",
      title: "Den Geltungsanspruch einer Prognose prüfen",
      scene: "Eine Expertin wird in einer Anhörung gefragt, ob die Investition Einsparungen bringen werde.",
      rule: "Unterscheide eine Prognose von einer Zusicherung. Konditionale Formulierungen binden die Folgerung an überprüfbare Annahmen.",
      exercises: [
        cards(
          "Beginne mit der Annahme. Formuliere die Prognose als bedingte Folgerung.",
          "Unter dieser Annahme ließen sich die Kosten senken.",
          "„Ließen sich“ stimmt mit dem Pluralsubjekt überein und markiert die bedingte Möglichkeit.",
          [
            word("preposition", "unter"), word("article", "dieser"), word("noun", "Annahme", "D"),
            word("verb", "lassen", "Konjunktiv II · sie"), word("pronoun", "sich"), word("article", "die"),
            word("noun", "Kosten", "a"), word("verb", "senken", "infinitive"),
          ],
        ),
        cards(
          "Formuliere die Bedingung und die Folgerung.",
          "Vorausgesetzt, die Auslastung erreicht siebzig Prozent, ließe sich mittelfristig mit Einsparungen rechnen.",
          "Der Konjunktiv „ließe“ passt zur bedingten Folgerung.",
          [
            word("verb", "voraussetzen", "participle2", ","), word("article", "die"),
            word("noun", "Auslastung", "N"), word("verb", "erreichen", "er"), word("number", "siebzig"),
            word("noun", "Prozent", "a", ","), word("verb", "lassen", "Konjunktiv II · er / sie / es"),
            word("pronoun", "sich"), word("adjective", "mittelfristig", "positive"), word("preposition", "mit"),
            word("noun", "Einsparung", "d"), word("verb", "rechnen", "infinitive"),
          ],
        ),
        cards(
          "Beginne mit dem Subjekt. Verknüpfe die Gültigkeit der Prognose mit einer Voraussetzung.",
          "Die Prognose gilt nur, sofern die Auslastung mindestens siebzig Prozent erreicht.",
          "„Sofern“ schränkt die Gültigkeit ein und verlangt das finite Verb am Ende.",
          [
            word("article", "die"), word("noun", "Prognose", "N"), word("verb", "gelten", "er"),
            word("adverb", "nur", undefined, ","), word("conjunction", "sofern"), word("article", "die"),
            word("noun", "Auslastung", "N"), word("adverb", "mindestens"), word("number", "siebzig"),
            word("noun", "Prozent", "a"), word("verb", "erreichen", "er"),
          ],
        ),
      ],
    },
    {
      id: "c1-synthese",
      chapter: "Quellen und Schlussfolgerungen",
      title: "Zwei Quellen mit unterschiedlichen Maßstäben verbinden",
      scene: "Ein Bericht der Verwaltung und eine Stellungnahme eines Vereins bewerten dieselbe Parkregelung.",
      rule: "Scheinbare Widersprüche können auf unterschiedlichen Kriterien beruhen. Benenne die Kriterien, bevor du die Bewertungen vergleichst.",
      exercises: [
        cards(
          "Beginne mit „der Verein“. Gib seine Beurteilung im Konjunktiv I wieder.",
          "Der Verein betont, der Zugang sei erschwert.",
          "„Sei“ kennzeichnet die dem Verein zugeschriebene Aussage.",
          [
            word("article", "der"), word("noun", "Verein", "N"), word("verb", "betonen", "er", ","),
            word("article", "der"), word("noun", "Zugang", "N"),
            word("verb", "sein", "Konjunktiv I · er / sie / es"), word("verb", "erschweren", "participle2"),
          ],
        ),
        cards(
          "Verbinde die Bewertungen mit einem Kontrast.",
          "Die Maßnahme verkürzt zwar die Parkplatzsuche, geht aber mit erschwertem Zugang zum Pflegeheim einher.",
          "„Mit etwas einhergehen“ beschreibt ein begleitendes Phänomen.",
          [
            word("article", "die"), word("noun", "Maßnahme", "N"), word("verb", "verkürzen", "er"),
            word("adverb", "zwar"), word("article", "die"), word("noun", "Parkplatzsuche", "A", ","),
            word("verb", "einhergehen", "er"), word("conjunction", "aber"), word("preposition", "mit"),
            word("adjective", "erschwert", "Endung -em"), word("noun", "Zugang", "D"), word("preposition", "zum"),
            word("noun", "Pflegeheim", "D"), word("particle", "einher"),
          ],
        ),
        cards(
          "Beginne mit dem Subjekt. Verdichte „weil geeignete Kurzzeitplätze fehlen“ mit „aufgrund“.",
          "Der Zugang verschlechtert sich aufgrund fehlender geeigneter Kurzzeitplätze.",
          "Beide Adjektive tragen im Genitiv Plural ohne Artikel „-er“.",
          [
            word("article", "der"), word("noun", "Zugang", "N"), word("verb", "verschlechtern", "er"),
            word("pronoun", "sich"), word("preposition", "aufgrund"), word("adjective", "fehlend", "Endung -er"),
            word("adjective", "geeignet", "Endung -er"), word("noun", "Kurzzeitplatz", "g"),
          ],
        ),
      ],
    },
    {
      id: "c1-konzession",
      chapter: "Quellen und Schlussfolgerungen",
      title: "Reichweite eines Arguments einschränken",
      scene: "In einer Stellungnahme wird diskutiert, ob eine Maßnahme allein zum Ziel führt.",
      rule: "„Wenngleich“ räumt einen Umstand ein. Formulierungen wie „für sich genommen“ begrenzen, welche Wirkung zugeschrieben wird.",
      exercises: [
        cards(
          "Beginne mit „wenngleich“. Stelle den möglichen Nutzen als vorsichtige Annahme dar.",
          "Wenngleich die Kampagne etwas bewirken dürfte, sind weitere Schritte nötig.",
          "„Dürfte“ drückt eine vorsichtige Einschätzung aus. Das finite Verb steht nach dem Infinitiv.",
          [
            word("conjunction", "wenngleich"), word("article", "die"), word("noun", "Kampagne", "N"),
            word("pronoun", "etwas"), word("verb", "bewirken", "infinitive"),
            word("modal", "dürfen", "Konjunktiv II · er / sie / es", ","), word("verb", "sein", "sie"),
            word("adjective", "weiter", "Endung -e"), word("noun", "Schritt", "n"),
            word("adjective", "nötig", "positive"),
          ],
        ),
        cards(
          "Ordne die Einräumung mit „wenngleich“.",
          "Wenngleich die Kampagne Aufmerksamkeit erzeugen dürfte, wären weitere Maßnahmen erforderlich.",
          "Nach dem vorangestellten Einräumungssatz steht „wären“ zuerst im Hauptsatz.",
          [
            word("conjunction", "wenngleich"), word("article", "die"), word("noun", "Kampagne", "N"),
            word("noun", "Aufmerksamkeit", "A"), word("verb", "erzeugen", "infinitive"),
            word("modal", "dürfen", "Konjunktiv II · er / sie / es", ","),
            word("verb", "sein", "Konjunktiv II · sie"), word("adjective", "weiter", "Endung -e"),
            word("noun", "Maßnahme", "n"), word("adjective", "erforderlich", "positive"),
          ],
        ),
        cards(
          "Beginne mit dem Subjekt. Formuliere eine Einräumung mit „trotz“ und Genitiv.",
          "Die Hürden bleiben trotz intensiver Aufklärung bestehen.",
          "„Trotz“ erlaubt hier den Genitiv. Ohne Artikel steht „intensiver Aufklärung“.",
          [
            word("article", "die"), word("noun", "Hürde", "n"), word("verb", "bleiben", "sie"),
            word("preposition", "trotz"), word("adjective", "intensiv", "Endung -er"),
            word("noun", "Aufklärung", "G"), word("verb", "bestehen", "infinitive"),
          ],
        ),
      ],
    },
    {
      id: "c1-jedoch",
      chapter: "Strategie und Transfer",
      title: "Einen Gedankengang gezielt gliedern",
      scene: "Für ein Gutachten liegen positive erste Ergebnisse vor, doch die Datenbasis ist schmal.",
      rule: "Signale wie „zunächst“, „jedoch“ und „daraus folgt“ führen Leser durch Beobachtung, Einschränkung und Konsequenz. Die Reihenfolge muss die Logik spiegeln.",
      exercises: [
        cards(
          "Beginne mit „daraus“. Formuliere eine vorsichtige Empfehlung.",
          "Daraus ließe sich eine Empfehlung ableiten.",
          "„Ließe sich“ lässt die Schlussfolgerung als Möglichkeit erscheinen.",
          [
            word("adverb", "daraus"), word("verb", "lassen", "Konjunktiv II · er / sie / es"),
            word("pronoun", "sich"), word("article", "eine"), word("noun", "Empfehlung", "N"),
            word("verb", "ableiten", "infinitive"),
          ],
        ),
        cards(
          "Verbinde Beobachtung, Einschränkung und Konsequenz in dieser Reihenfolge.",
          "Der Versuch lieferte positive Ergebnisse. Die Stichprobe war jedoch klein. Daher empfehlen wir eine breitere Erprobung.",
          "„Jedoch“ schränkt die Reichweite ein. „Daher“ zieht die Konsequenz daraus.",
          [
            word("article", "der"), word("noun", "Versuch", "N"),
            word("verb", "liefern", "Präteritum · er / sie / es"), word("adjective", "positiv", "Endung -e"),
            word("noun", "Ergebnis", "a", "."), word("article", "die"), word("noun", "Stichprobe", "N"),
            word("verb", "sein", "Präteritum · er / sie / es"), word("adverb", "jedoch"),
            word("adjective", "klein", "positive", "."), word("adverb", "daher"), word("verb", "empfehlen", "wir"),
            word("pronoun", "wir"), word("article", "eine"), word("adjective", "breit", "Komparativ · Endung -e"),
            word("noun", "Erprobung", "A"),
          ],
        ),
        cards(
          "Beginne mit „zu prüfen“. Binde die offene Frage mit „ob“ an.",
          "Zu prüfen bleibt, ob der Befund übertragbar ist.",
          "Der ob-Satz ist eine indirekte Entscheidungsfrage und endet mit „ist“.",
          [
            word("particle", "zu"), word("verb", "prüfen", "infinitive"), word("verb", "bleiben", "er", ","),
            word("conjunction", "ob"), word("article", "der"), word("noun", "Befund", "N"),
            word("adjective", "übertragbar", "positive"), word("verb", "sein", "er"),
          ],
        ),
      ],
    },
    {
      id: "c1-verhandlung",
      chapter: "Strategie und Transfer",
      title: "In einer Verhandlung präzise reagieren",
      scene: "Zwei Organisationen wollen Daten gemeinsam auswerten, setzen aber unterschiedliche Bedingungen.",
      rule: "Spiegle den Kern eines Einwands, bevor du den Handlungsspielraum beschreibst. „Unter der Maßgabe, dass …“ kennzeichnet eine verbindliche Bedingung.",
      exercises: [
        cards(
          "Beginne mit „die Zusammenarbeit“. Formuliere eine verbindliche Voraussetzung als fortdauernden Zustand.",
          "Die Zusammenarbeit ist möglich, sofern die Einzeldaten geschützt bleiben.",
          "Im Nebensatz steht das finite Verb nach dem Partizip. „Bleiben“ bezeichnet die Fortdauer eines Zustands.",
          [
            word("article", "die"), word("noun", "Zusammenarbeit", "N"), word("verb", "sein", "er"),
            word("adjective", "möglich", "positive", ","), word("conjunction", "sofern"), word("article", "die"),
            word("noun", "Einzeldaten", "n"), word("verb", "schützen", "participle2"),
            word("verb", "bleiben", "infinitive"),
          ],
        ),
        cards(
          "Formuliere das Angebot mit ausdrücklicher Bedingung.",
          "Wir stimmen unter der Maßgabe zu, dass ausschließlich ausgewertete Kennzahlen weitergegeben werden.",
          "„Ausschließlich“ grenzt das freigegebene Material ein.",
          [
            word("pronoun", "wir"), word("verb", "zustimmen", "wir"), word("preposition", "unter"),
            word("article", "der"), word("noun", "Maßgabe", "D"), word("particle", "zu", undefined, ","),
            word("conjunction", "dass"), word("adverb", "ausschließlich"),
            word("adjective", "ausgewertet", "Endung -e"), word("noun", "Kennzahl", "n"),
            word("verb", "weitergeben", "participle2"), word("verb", "werden", "sie"),
          ],
        ),
        cards(
          "Beginne mit dem Subjekt. Formuliere mit „dürfen“ im Passiv, was weitergegeben werden darf.",
          "Nur ausgewertete Kennzahlen dürfen weitergegeben werden.",
          "Das finite „dürfen“ steht auf Position zwei. Die passive Infinitivgruppe steht am Ende.",
          [
            word("adverb", "nur"), word("adjective", "ausgewertet", "Endung -e"), word("noun", "Kennzahl", "n"),
            word("modal", "dürfen", "sie"), word("verb", "weitergeben", "participle2"),
            word("verb", "werden", "infinitive"),
          ],
        ),
      ],
    },
    {
      id: "c1-abschluss",
      chapter: "Strategie und Transfer",
      title: "Abschluss · Maßnahmen sprachlich gewichten",
      scene: "Du berätst eine Stadt zum Ausbau von Hitzeschutzmaßnahmen. Zwei Quellen betonen unterschiedliche Ziele.",
      rule: "Eine Entscheidungsvorlage braucht eine begründete Priorität, einen Umgang mit Unsicherheit und eine nachvollziehbare nächste Entscheidung.",
      exercises: [
        cards(
          "Beginne mit dem langfristigen Ziel. Drücke eine Empfehlung im passiven „sein + zu“-Muster aus.",
          "Langfristig sind geeignete Standorte zu sichern.",
          "„Sind zu sichern“ drückt hier aus, dass die Standorte gesichert werden sollen.",
          [
            word("adjective", "langfristig", "positive"), word("verb", "sein", "sie"),
            word("adjective", "geeignet", "Endung -e"), word("noun", "Standort", "n"), word("particle", "zu"),
            word("verb", "sichern", "infinitive"),
          ],
        ),
        cards(
          "Gliedere die Entscheidung als Sofortmaßnahme mit langfristiger Ergänzung.",
          "Kurzfristig sollten kühle Räume geöffnet werden; zugleich gilt es, die Begrünung langfristig voranzutreiben.",
          "„Zugleich“ zeigt, dass die langfristige Arbeit parallel eingeleitet wird.",
          [
            word("adjective", "kurzfristig", "positive"), word("modal", "sollen", "Konjunktiv II · sie"),
            word("adjective", "kühl", "Endung -e"), word("noun", "Raum", "n"),
            word("verb", "öffnen", "participle2"), word("verb", "werden", "infinitive", ";"),
            word("adverb", "zugleich"), word("verb", "gelten", "er"), word("pronoun", "es", undefined, ","),
            word("article", "die"), word("noun", "Begrünung", "A"), word("adjective", "langfristig", "positive"),
            word("verb", "vorantreiben", "Infinitiv mit zu"),
          ],
        ),
        cards(
          "Beginne mit „zwar“. Verknüpfe Wirkung und Einschränkung mit „doch“.",
          "Zwar bieten Straßenbäume Schatten, doch ihre volle Wirkung entfaltet sich erst später.",
          "Steht „zwar“ vorn, folgt im Hauptsatz das finite Verb. „Straßenbäume“ ist Plural.",
          [
            word("adverb", "zwar"), word("verb", "bieten", "sie"), word("noun", "Straßenbaum", "n"),
            word("noun", "Schatten", "A", ","), word("conjunction", "doch"), word("article", "ihre"),
            word("adjective", "voll", "Endung -e"), word("noun", "Wirkung", "N"), word("verb", "entfalten", "er"),
            word("pronoun", "sich"), word("adverb", "erst"), word("adjective", "spät", "comparative"),
          ],
        ),
      ],
    },
  ],
};
