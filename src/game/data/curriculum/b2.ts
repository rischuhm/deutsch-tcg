import { cards, form, pool } from '../../courseCards';
import { choice, listen, practice } from '../../exercises';
import type { Level } from '../../exercises';

export const b2: Level = {
  title: 'Abwägen und argumentieren',
  description: 'Lies komplexere Texte, unterscheide Belege von Behauptungen und vertritt eine begründete Position.',
  lessons: [
    {
      id: 'b2-haushalt', chapter: 'Stadt und Gesellschaft', title: 'Zwei Ziele gegeneinander abwägen',
      scene: 'Der Stadtrat muss zwischen längeren Bibliothekszeiten und mehr mobilen Angeboten entscheiden.',
      rule: 'Mit „zwar … aber“ räumst du einen Punkt ein und stellst ihm einen Einwand gegenüber. Gewichte beide Seiten anhand eines Kriteriums.',
      exercises: [
        choice('Welche Position vertritt die Autorin?', 'Mobile Angebote wären aus ihrer Sicht gerechter verteilt.', ['Bibliotheken sollen ganz schließen.', 'Längere Öffnungszeiten seien günstiger.'], 'Sie bewertet die Reichweite in schlecht versorgten Quartieren höher.', 'Längere Öffnungszeiten wären für bestehende Nutzer attraktiv. Wer weit vom Zentrum wohnt, hätte davon jedoch wenig. Mit einem Bücherbus ließen sich bislang unterversorgte Quartiere erreichen.'),
        cards('Formuliere die Abwägung mit „zwar … aber“.', 'Längere Öffnungszeiten wären zwar hilfreich, aber ein Bücherbus würde mehr Stadtteile erreichen.', 'Nach „aber“ beginnt die übliche Hauptsatzfolge mit dem Subjekt.', [
          'Längere Öffnungszeiten',
          form('sein', 'verb', 'Konjunktiv II · sie (Plural)', {
            'Präsens · sie (Plural)': 'sind',
            'Präteritum · sie (Plural)': 'waren',
            'Konjunktiv II · sie (Plural)': 'wären',
          }),
          'zwar hilfreich,',
          'aber',
          'ein Bücherbus',
          form('werden', 'verb', 'Konjunktiv II · er', {
            'Präsens · er': 'wird',
            'Präteritum · er': 'wurde',
            'Konjunktiv II · er': 'würde',
          }),
          'mehr Stadtteile erreichen',
        ]),
        practice('write', 'Empfiehl dem Stadtrat eine Option. Räume ein Gegenargument ein und benenne ein Entscheidungskriterium.', 'Zwar würde eine längere Öffnung vielen Stammgästen helfen, entscheidend ist für mich aber die Erreichbarkeit. Deshalb empfehle ich den Bücherbus als Pilotprojekt und eine Befragung in den betroffenen Vierteln.', ['Beide Optionen erkennbar', 'Kriterium erläutert', 'Empfehlung begründet'], 'Eine klare Priorität macht die Abwägung nachvollziehbar.'),
      ],
    },
    {
      id: 'b2-kausalitaet', chapter: 'Stadt und Gesellschaft', title: 'Eine Statistik vorsichtig deuten',
      scene: 'Ein Bericht bringt kürzere Wege und höhere Zufriedenheit in Verbindung.',
      rule: '„Deutet darauf hin“ markiert eine plausible Deutung. „Beweist“ verlangt mehr als einen beobachteten Zusammenhang.',
      exercises: [
        choice('Welche Schlussfolgerung trägt die Befragung?', 'Zufriedenheit und kürzere Wege hängen in der Stichprobe zusammen.', ['Kürzere Wege machen alle Menschen zufriedener.', 'Längere Wege erhöhen die Zufriedenheit.'], 'Die Befragung beobachtet einen Zusammenhang. Andere Einflüsse bleiben möglich.', 'In einer Befragung von 400 Beschäftigten berichteten Personen mit kurzen Arbeitswegen häufiger von hoher Zufriedenheit. Einkommen und Arbeitsbedingungen wurden nicht erfasst.'),
        cards('Formuliere die Einschränkung.', 'Aus der Befragung lässt sich kein eindeutiger Kausalzusammenhang ableiten.', '„Sich lassen + Infinitiv“ drückt Möglichkeit oder Unmöglichkeit aus.', [
          'Aus der Befragung',
          form('lassen', 'verb', 'Präsens · er', { 'Präsens · ich': 'lasse', 'Präsens · er': 'lässt', 'Konjunktiv II · er': 'ließe' }),
          'sich',
          'kein eindeutiger Kausalzusammenhang',
          form('ableiten', 'verb', 'Infinitiv', {
            Infinitiv: 'ableiten',
            'Infinitiv mit zu': 'abzuleiten',
            'Partizip II': 'abgeleitet',
          }),
        ]),
        practice('write', 'Schreib einen kurzen Pressehinweis. Nenne den Befund und mindestens einen nicht erfassten Einfluss.', 'Beschäftigte mit kurzen Wegen berichteten häufiger von hoher Zufriedenheit. Ob der Weg dafür ursächlich ist, bleibt offen, weil die Erhebung Arbeitsbedingungen nicht erfasst hat.', ['Befund korrekt wiedergegeben', 'Kausalität vorsichtig formuliert', 'Konkreter Störfaktor genannt'], 'Trenne Beobachtung und Interpretation sprachlich.'),
      ],
    },
    {
      id: 'b2-auflagen', chapter: 'Stadt und Gesellschaft', title: 'Bedingungen in einer Regel erkennen',
      scene: 'Eine Initiative möchte einen Platz für eine Veranstaltung reservieren.',
      rule: '„Sofern“ nennt eine Voraussetzung. Formulierungen wie „ist einzureichen“ drücken eine Verpflichtung aus.',
      exercises: [
        choice('Wann entfällt der schriftliche Antrag?', 'Bei höchstens 30 Teilnehmenden und ohne Lautsprecher.', ['Immer ohne Lautsprecher.', 'Immer unter 30 Teilnehmenden.'], 'Beide Bedingungen sind gleichzeitig erforderlich.', 'Ein Antrag ist einzureichen, sofern mehr als 30 Personen erwartet werden oder Lautsprecher eingesetzt werden.'),
        cards('Formuliere die Voraussetzung für die Genehmigung.', 'Die Genehmigung wird erteilt, sofern die Auflagen eingehalten werden.', 'Das passive „werden“ steht am Ende des Nebensatzes.', [
          'Die Genehmigung',
          form('werden', 'verb', 'Präsens · sie (Singular)', {
            'Präsens · sie (Singular)': 'wird',
            'Präsens · sie (Plural)': 'werden',
            'Präteritum · sie (Singular)': 'wurde',
          }),
          form('erteilen', 'verb', 'Partizip II', { Infinitiv: 'erteilen', 'Partizip I': 'erteilend', 'Partizip II': 'erteilt' }, ','),
          'sofern',
          'die Auflagen',
          'eingehalten werden',
        ]),
        practice('speak', 'Erkläre der Initiative die Regel mündlich. Verwende ein Beispiel, das leicht falsch verstanden wird.', 'Bei 20 Teilnehmenden braucht ihr trotzdem einen Antrag, wenn ihr Lautsprecher einsetzt. Nur bei höchstens 30 Personen und ohne Lautsprecher entfällt der Antrag.', ['Bedingungen vollständig', 'Grenzfall verständlich erklärt', 'Einfache Sprache'], 'Eine korrekte Umformulierung kann Regeln verständlicher machen.'),
      ],
    },
    {
      id: 'b2-netzkommentar', chapter: 'Stadt und Gesellschaft', title: 'Eine Behauptung sachlich entkräften',
      scene: 'Ein Kommentar behauptet, eine App erreiche die gesamte Nachbarschaft.',
      rule: 'Formuliere den Einwand als begrenzte Gegenbehauptung. „Inwiefern“ verlangt eine Erklärung des Ausmaßes oder der Art.',
      exercises: [
        choice('Welche Nachfrage überprüft die Behauptung am besten?', 'Wie viele Haushalte werden erreicht, und wie wurde das gemessen?', ['Warum gibt es überhaupt Apps?', 'Warum nutzt niemand die App?'], 'Die Nachfrage verlangt messbare Angaben und unterstellt kein Ergebnis.'),
        cards('Formuliere den Einwand mit „inwiefern“.', 'Es bleibt offen, inwiefern die App Menschen ohne Smartphone erreicht.', 'Ein indirekter Fragesatz endet mit dem konjugierten Verb.', [
          'Es bleibt offen,',
          'inwiefern',
          'die App',
          'Menschen ohne Smartphone',
          form('erreichen', 'verb', 'Präsens · sie (Singular)', {
            'Präsens · sie (Plural)': 'erreichen',
            'Präsens · sie (Singular)': 'erreicht',
            'Präteritum · sie (Singular)': 'erreichte',
          }),
        ]),
        practice('write', 'Antworte auf den Kommentar. Nenne eine Grenze der App und schlage einen ergänzenden Informationsweg vor.', 'Eine App kann die Information beschleunigen, doch Menschen ohne Smartphone erreicht sie kaum. Ein gedruckter Aushang an zentralen Orten könnte diesen Nachteil abmildern.', ['Nutzen anerkannt', 'Konkrete Grenze', 'Ergänzung vorgeschlagen'], 'Ein begrenzter Einwand wirkt glaubwürdiger als eine pauschale Gegenbehauptung.'),
      ],
    },
    {
      id: 'b2-protokoll', chapter: 'Beruf und Medien', title: 'Ein Protokoll auf den Punkt bringen',
      scene: 'Du erstellst den Ergebnisteil einer Teamsitzung.',
      rule: 'Im Ergebnisprotokoll gehören Maßnahme, Zuständigkeit und Frist in die Zusammenfassung. Nominalisierungen können häufige Vorgänge verdichten.',
      exercises: [
        listen('Was wurde verbindlich beschlossen?', 'Zur Software noch kein Beschluss. Fest steht dagegen: Lea klärt bis Mittwoch die Kosten der Schulung. Die Schulung selbst wird erst nach ihrer Rückmeldung beauftragt.', 'Lea ermittelt bis Mittwoch die Schulungskosten.', ['Die Software wird bestellt.', 'Die Schulung findet am Mittwoch statt.'], 'Die Kostenermittlung ist beschlossen. Der Auftrag bleibt offen.'),
        cards('Formuliere die nächste Maßnahme in Protokollsprache.', 'Die Ermittlung der Schulungskosten erfolgt bis Mittwoch.', 'Die Nominalisierung „Ermittlung“ kann zusammen mit Frist und Zuständigkeit im Protokoll stehen.', [
          'Die Ermittlung',
          form('die Schulungskosten', 'noun', 'Genitiv Plural', {
            'Nominativ / Akkusativ Plural': 'die Schulungskosten',
            'Dativ Plural': 'den Schulungskosten',
            'Genitiv Plural': 'der Schulungskosten',
          }),
          'erfolgt',
          'bis Mittwoch',
        ]),
        practice('write', 'Formuliere einen Protokolleintrag mit Zuständigkeit und Frist. Kennzeichne die offene Entscheidung.', 'Lea ermittelt die Schulungskosten bis Mittwoch. Die Beauftragung der Schulung erfolgt erst nach Vorlage der Kostenschätzung. Die Softwareentscheidung bleibt offen.', ['Zuständigkeit und Termin', 'Maßnahme korrekt', 'Offenen Punkt ausgewiesen'], 'Eine Person als Subjekt ist oft klarer als eine unpersönliche Wendung.'),
      ],
    },
    {
      id: 'b2-indirekt', chapter: 'Beruf und Medien', title: 'Aussagen mit Quelle wiedergeben',
      scene: 'Ein Artikel zitiert eine Pressesprecherin zur Verzögerung eines Projekts.',
      rule: 'Konjunktiv I kann in der indirekten Rede zeigen, wessen Aussage wiedergegeben wird. Er bewertet ihre Wahrheit nicht.',
      exercises: [
        choice('Welche Form gibt die Aussage als indirekte Rede im Konjunktiv I wieder?', 'Die Sprecherin erklärte, das Projekt sei im Zeitplan.', ['Die Sprecherin erklärte, das Projekt war im Zeitplan.', 'Die Sprecherin erklärte, das Projekt wäre im Zeitplan.'], '„Sei“ ist Konjunktiv I zu „sein“ in der dritten Person Singular.'),
        cards('Ordne die indirekte Wiedergabe.', 'Die Sprecherin erklärte, die Prüfung werde im Januar abgeschlossen.', '„Werde“ markiert die indirekte Rede. „Abgeschlossen“ ist das Partizip II im Passiv.', [
          'Die Sprecherin erklärte,',
          'die Prüfung',
          form('werden', 'verb', 'Konjunktiv I · sie (Singular)', {
            'Indikativ · sie (Singular)': 'wird',
            'Konjunktiv I · sie (Singular)': 'werde',
            'Konjunktiv II · sie (Singular)': 'würde',
          }),
          'im Januar',
          form('abschließen', 'verb', 'Partizip II', {
            Infinitiv: 'abschließen',
            'Partizip I': 'abschließend',
            'Partizip II': 'abgeschlossen',
          }),
        ]),
        practice('write', 'Gib zwei Aussagen einer Projektleitung mit klarer Quellenzuordnung wieder. Eine davon soll noch unbestätigt sein.', 'Die Leitung teilte mit, der Zeitplan sei unverändert. Der Auftrag werde voraussichtlich im März vergeben. Der zweite Termin ist bislang nicht bestätigt.', ['Quelle genannt', 'Indirekte Rede erkennbar', 'Unsicherheit korrekt markiert'], 'Zuschreibung und Unsicherheit sind unterschiedliche Informationen.'),
      ],
    },
    {
      id: 'b2-ursache', chapter: 'Beruf und Medien', title: 'Ursachen im passenden Register formulieren',
      scene: 'Ein Team muss eine Terminänderung öffentlich erklären.',
      rule: '„Weil“ leitet einen Nebensatz ein. „Aufgrund“ verlangt in der formellen Standardsprache meist den Genitiv.',
      exercises: [
        choice('Welche formelle Kurzfassung gibt die Ursache korrekt wieder?', 'Aufgrund fehlender Ersatzteile verschiebt sich die Reparatur.', ['Trotz fehlender Ersatzteile verschiebt sich die Reparatur.', 'Statt fehlender Ersatzteile verschiebt sich die Reparatur.'], '„Aufgrund“ gibt die Ursache an.', 'Die Reparatur verschiebt sich, weil Ersatzteile fehlen.'),
        cards('Formuliere eine Mitteilung mit vorgestellter Ursache.', 'Aufgrund eines technischen Defekts muss der Betrieb vorübergehend eingestellt werden.', 'Die vorangestellte Angabe belegt Position eins. „Muss“ folgt unmittelbar.', [
          'Aufgrund',
          form('ein technischer Defekt', 'noun', 'Genitiv', {
            Nominativ: 'ein technischer Defekt',
            Akkusativ: 'einen technischen Defekt',
            Dativ: 'einem technischen Defekt',
            Genitiv: 'eines technischen Defekts',
          }),
          pool('modal.muessen', { chosenPerson: 'er' }),
          'der Betrieb',
          'vorübergehend',
          'eingestellt werden',
        ]),
        practice('write', 'Schreib zwei Versionen derselben Terminänderung, eine für den Aushang und eine für einen Kollegen.', 'Aushang: Aufgrund eines technischen Defekts öffnet das Haus heute erst um zwölf Uhr. Nachricht: Wir öffnen heute erst um zwölf, weil die Anlage repariert werden muss.', ['Ursache und Folge in beiden Versionen', 'Unterschiedliches Register', 'Zeitangabe eindeutig'], 'Wähle die Formulierung passend zur Zielgruppe.'),
      ],
    },
    {
      id: 'b2-perspektiven', chapter: 'Debatte und Transfer', title: 'Perspektiven fair gegenüberstellen',
      scene: 'Zwei Eltern sprechen über die Einführung digitaler Schulbücher.',
      rule: 'Unterscheide, ob jemand ein Ziel ablehnt oder eine Bedingung für seine Umsetzung nennt.',
      exercises: [
        choice('Was ist der tatsächliche Streitpunkt?', 'Ob alle Kinder vor Einführung geeignete Geräte haben.', ['Ob digitale Bücher grundsätzlich verboten werden sollen.', 'Ob Papier billiger ist.'], 'Beide sehen einen möglichen Nutzen. Die zweite Person knüpft die Einführung an Zugang zu Geräten.', 'Mara: Digitale Bücher können sinnvoll sein, wir sollten nächsten Monat starten. Deniz: Ich sehe den Nutzen auch. Wir sollten aber erst starten, wenn jedes Kind ein Gerät hat.'),
        cards('Fasse die beiden Positionen mit „während“ zusammen.', 'Während Mara einen schnellen Start befürwortet, hält Deniz eine vorherige Ausstattung für nötig.', '„Während“ kann hier einen Gegensatz zwischen zwei Positionen ausdrücken.', [
          'Während',
          'Mara einen schnellen Start befürwortet,',
          form('halten', 'verb', 'Präsens · er', {
            'Präsens · ich': 'halte',
            'Präsens · er': 'hält',
            'Präsens · sie (Plural)': 'halten',
          }),
          'Deniz',
          'eine vorherige Ausstattung',
          'für nötig',
        ]),
        practice('speak', 'Moderiere die Meinungsverschiedenheit und schlage einen nächsten Schritt vor.', 'Sie sind sich einig, dass digitale Bücher nützlich sein können. Offen ist, wie wir gleichen Zugang sichern. Mein Vorschlag wäre, die fehlenden Geräte zuerst zu erfassen und dann einen Starttermin festzulegen.', ['Gemeinsamkeit benannt', 'Streitpunkt korrekt', 'Umsetzbarer nächster Schritt'], 'Benenn zuerst die Gemeinsamkeit, bevor du den Gegensatz zuspitzst.'),
      ],
    },
    {
      id: 'b2-einwand', chapter: 'Debatte und Transfer', title: 'Einen Einwand aufnehmen und begrenzen',
      scene: 'In einer Diskussionsrunde geht es um flexible Arbeitszeit.',
      rule: 'Mit „einerseits … andererseits“ stellst du zwei Gesichtspunkte nebeneinander. „Allerdings“ kann den Geltungsbereich einer Aussage einschränken.',
      exercises: [
        choice('Welche Antwort berücksichtigt sowohl Wunsch als auch Gegenargument?', 'Flexible Zeiten helfen vielen. Allerdings brauchen Kundenteams eine feste Erreichbarkeit.', ['Flexible Zeiten lösen jedes Problem.', 'Wegen der Erreichbarkeit sind flexible Zeiten überall sinnlos.'], 'Die Antwort erkennt den Nutzen an und nennt die Bedingung für einen Teilbereich.'),
        cards('Formuliere einen Kompromiss.', 'Einerseits sollen Teams flexibel planen können, andererseits muss die Erreichbarkeit gewährleistet sein.', 'Beide Satzteile stehen als Hauptsätze mit Verb an zweiter Stelle.', [
          'Einerseits',
          'sollen Teams flexibel planen können,',
          'andererseits',
          pool('modal.muessen', { chosenPerson: 'er' }),
          'die Erreichbarkeit',
          form('gewährleisten', 'verb', 'Partizip II', {
            Infinitiv: 'gewährleisten',
            'Partizip I': 'gewährleistend',
            'Partizip II': 'gewährleistet',
          }),
          pool('verb.sein', { chosenVerbForm: 'infinitive' }),
        ]),
        practice('speak', 'Vertritt einen Kompromiss für flexible Zeiten und geh auf einen plausiblen Einwand ein.', 'Ich befürworte flexible Zeiten außerhalb einer kurzen Kernzeit. Der Einwand zur Erreichbarkeit ist berechtigt. Eine feste Vertretung pro Team könnte ihn auffangen.', ['Eigene Position', 'Einwand in fairer Form', 'Konkrete Lösung'], 'Ein guter Kompromiss benennt auch seine Bedingungen.'),
      ],
    },
    {
      id: 'b2-abschluss', chapter: 'Debatte und Transfer', title: 'Abschluss · Eine Empfehlung begründen',
      scene: 'Ein Bildungsträger muss entscheiden, ob Abendkurse hybrid angeboten werden.',
      rule: 'Verbinde Befund, Einschränkung und Empfehlung. Verwende eine Schlussfolgerung, die durch die verfügbaren Informationen getragen wird.',
      exercises: [
        listen('Welche Empfehlung wird durch das Pilotprojekt gestützt?', 'Online nahmen mehr Berufstätige teil. Allerdings brachen mehr Teilnehmende ohne Computererfahrung ab. Wie gut ein hybrides Format funktioniert, haben wir in diesem Versuch noch nicht getestet.', 'Ein hybrides Angebot mit technischer Begleitung erproben.', ['Nur noch Onlinekurse anbieten.', 'Die Onlinekurse sofort abschaffen.'], 'Der Versuch zeigt Chancen und Grenzen. Ein weiterer Pilot ist eine verhältnismäßige Folgerung.'),
        cards('Formuliere die vorsichtige Folgerung.', 'Die Ergebnisse sprechen dafür, ein hybrides Angebot zunächst zu erproben.', '„Zunächst“ begrenzt die Empfehlung auf einen ersten Schritt.', [
          'Die Ergebnisse',
          'sprechen dafür,',
          'ein hybrides Angebot',
          'zunächst',
          form('erproben', 'verb', 'Infinitiv mit zu', {
            Infinitiv: 'erproben',
            'Infinitiv mit zu': 'zu erproben',
            'Partizip II': 'erprobt',
          }),
        ]),
        practice('write', 'Schreib der Leitung eine begründete Empfehlung mit Befund, Einschränkung und nächstem Schritt.', 'Das Onlineangebot erreichte mehr Berufstätige, ging aber mit mehr Abbrüchen bei Personen ohne Computererfahrung einher. Deshalb empfehle ich, ein hybrides Format mit einer technischen Einführung zu erproben und die Abbruchquoten zu vergleichen.', ['Beide Befunde', 'Begrenzte Empfehlung', 'Messbarer nächster Schritt'], 'Der vorgeschlagene Vergleich sollte zur offenen Frage passen.'),
      ],
    },
  ],
};
