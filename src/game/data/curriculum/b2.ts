import { cards, form, pool } from '../../courseCards';
import { b2Grammar } from '../grammar/b2';
import type { Level } from '../../exercises';

export const b2: Level = {
  title: 'Abwägen und argumentieren',
  description: 'Setze Konjunktiv, Passiv und Genitiv ein, um Aussagen zu begründen und einzuschränken.',
  lessons: [
    {
      id: 'b2-haushalt', chapter: 'Stadt und Gesellschaft', title: 'Zwei Ziele gegeneinander abwägen',
      scene: 'Der Stadtrat muss zwischen längeren Bibliothekszeiten und mehr mobilen Angeboten entscheiden.',
      rule: 'Mit „zwar … aber“ räumst du einen Punkt ein und stellst ihm einen Einwand gegenüber. Gewichte beide Seiten anhand eines Kriteriums.',
      exercises: [
        b2Grammar['b2-haushalt'][0],
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
        b2Grammar['b2-haushalt'][1],
      ],
    },
    {
      id: 'b2-kausalitaet', chapter: 'Stadt und Gesellschaft', title: 'Möglichkeit mit „sich lassen“ ausdrücken',
      scene: 'Ein Bericht bringt kürzere Wege und höhere Zufriedenheit in Verbindung.',
      rule: '„Deutet darauf hin“ markiert eine plausible Deutung. „Beweist“ verlangt mehr als einen beobachteten Zusammenhang.',
      exercises: [
        b2Grammar['b2-kausalitaet'][0],
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
        b2Grammar['b2-kausalitaet'][1],
      ],
    },
    {
      id: 'b2-auflagen', chapter: 'Stadt und Gesellschaft', title: 'Bedingungen und Verpflichtungen formulieren',
      scene: 'Eine Initiative möchte einen Platz für eine Veranstaltung reservieren.',
      rule: '„Sofern“ nennt eine Voraussetzung. Formulierungen wie „ist einzureichen“ drücken eine Verpflichtung aus.',
      exercises: [
        b2Grammar['b2-auflagen'][0],
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
        b2Grammar['b2-auflagen'][1],
      ],
    },
    {
      id: 'b2-netzkommentar', chapter: 'Stadt und Gesellschaft', title: 'Eine Behauptung sachlich entkräften',
      scene: 'Ein Kommentar behauptet, eine App erreiche die gesamte Nachbarschaft.',
      rule: 'Formuliere den Einwand als begrenzte Gegenbehauptung. „Inwiefern“ verlangt eine Erklärung des Ausmaßes oder der Art.',
      exercises: [
        b2Grammar['b2-netzkommentar'][0],
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
        b2Grammar['b2-netzkommentar'][1],
      ],
    },
    {
      id: 'b2-protokoll', chapter: 'Beruf und Medien', title: 'Ein Protokoll auf den Punkt bringen',
      scene: 'Du erstellst den Ergebnisteil einer Teamsitzung.',
      rule: 'Im Ergebnisprotokoll gehören Maßnahme, Zuständigkeit und Frist in die Zusammenfassung. Nominalisierungen können häufige Vorgänge verdichten.',
      exercises: [
        b2Grammar['b2-protokoll'][0],
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
        b2Grammar['b2-protokoll'][1],
      ],
    },
    {
      id: 'b2-indirekt', chapter: 'Beruf und Medien', title: 'Aussagen mit Quelle wiedergeben',
      scene: 'Ein Artikel zitiert eine Pressesprecherin zur Verzögerung eines Projekts.',
      rule: 'Konjunktiv I kann in der indirekten Rede zeigen, wessen Aussage wiedergegeben wird. Er bewertet ihre Wahrheit nicht.',
      exercises: [
        b2Grammar['b2-indirekt'][0],
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
        b2Grammar['b2-indirekt'][1],
      ],
    },
    {
      id: 'b2-ursache', chapter: 'Beruf und Medien', title: 'Ursachen im passenden Register formulieren',
      scene: 'Ein Team muss eine Terminänderung öffentlich erklären.',
      rule: '„Weil“ leitet einen Nebensatz ein. „Aufgrund“ verlangt in der formellen Standardsprache meist den Genitiv.',
      exercises: [
        b2Grammar['b2-ursache'][0],
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
        b2Grammar['b2-ursache'][1],
      ],
    },
    {
      id: 'b2-perspektiven', chapter: 'Debatte und Transfer', title: 'Perspektiven fair gegenüberstellen',
      scene: 'Zwei Eltern sprechen über die Einführung digitaler Schulbücher.',
      rule: 'Unterscheide, ob jemand ein Ziel ablehnt oder eine Bedingung für seine Umsetzung nennt.',
      exercises: [
        b2Grammar['b2-perspektiven'][0],
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
        b2Grammar['b2-perspektiven'][1],
      ],
    },
    {
      id: 'b2-einwand', chapter: 'Debatte und Transfer', title: 'Einen Einwand aufnehmen und begrenzen',
      scene: 'In einer Diskussionsrunde geht es um flexible Arbeitszeit.',
      rule: 'Mit „einerseits … andererseits“ stellst du zwei Gesichtspunkte nebeneinander. „Allerdings“ kann den Geltungsbereich einer Aussage einschränken.',
      exercises: [
        b2Grammar['b2-einwand'][0],
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
        b2Grammar['b2-einwand'][1],
      ],
    },
    {
      id: 'b2-abschluss', chapter: 'Debatte und Transfer', title: 'Abschluss · Eine Empfehlung begründen',
      scene: 'Ein Bildungsträger muss entscheiden, ob Abendkurse hybrid angeboten werden.',
      rule: 'Verbinde Befund, Einschränkung und Empfehlung. Verwende eine Schlussfolgerung, die durch die verfügbaren Informationen getragen wird.',
      exercises: [
        b2Grammar['b2-abschluss'][0],
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
        b2Grammar['b2-abschluss'][1],
      ],
    },
  ],
};
