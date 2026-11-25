import { cards, form, pool } from '../../courseCards';
import { choice, listen, practice } from '../../exercises';
import type { Level } from '../../exercises';

export const c1: Level = {
  title: 'Zwischentöne und komplexe Texte',
  description: 'Erschließe implizite Aussagen, vermittle zwischen Perspektiven und wechsle gezielt das Register.',
  lessons: [
    {
      id: 'c1-diplomatie', chapter: 'Zwischentöne und Register', title: 'Eine höfliche Ablehnung erkennen',
      scene: 'Nach einer Ideenrunde erhält Mara die Antwort eines langjährigen Partners.',
      rule: 'Höfliche Gesprächsangebote und unverbindliche Bedingungen können eine Ablehnung abfedern. Entscheidend ist, welche konkrete Zusage fehlt.',
      exercises: [
        choice('Welche Lesart ist am besten begründet?', 'Der Partner lehnt eine Beteiligung vorerst ab, lässt spätere Gespräche aber offen.', ['Der Partner hat seine Beteiligung zugesagt.', 'Der Partner fordert verbindlich eine Fassung bis zum nächsten Quartal.'], 'Wertschätzung und Gesprächsbereitschaft enthalten weder eine Zusage noch eine Frist.', 'Ihr Vorschlag setzt einen interessanten Impuls. Angesichts unserer derzeitigen Verpflichtungen sehen wir für dieses Quartal allerdings keine tragfähige Beteiligungsmöglichkeit. Sollten sich die Rahmenbedingungen ändern, kommen wir gern auf den Austausch zurück.'),
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
        practice('write', 'Lehne eine Einladung zu einem Projekt diplomatisch ab, ohne eine spätere Zusage anzudeuten.', 'Vielen Dank für die Einladung und die ausführlichen Unterlagen. Für die vorgesehene Projektphase können wir derzeit keine personellen Ressourcen bereitstellen. Für Ihre weiteren Planungen wünschen wir Ihnen gutes Gelingen.', ['Klare Absage', 'Angemessen wertschätzend', 'Keine unbeabsichtigte Zusage'], 'Wertschätzung kann vor der klaren Absage stehen.'),
      ],
    },
    {
      id: 'c1-ironisch', chapter: 'Zwischentöne und Register', title: 'Ironie anhand von Widersprüchen erschließen',
      scene: 'Ein Kollegenteam bespricht die Zugänglichkeit eines neuen Onlineformulars.',
      rule: 'Ironie kann aus dem Konflikt zwischen positivem Wortlaut und einem klar negativen Sachverhalt entstehen. Die Deutung braucht Kontext.',
      exercises: [
        choice('Was legt die Formulierung „vorbildlich niedrigschwellig“ nahe?', 'Die Zugänglichkeit wird kritisiert.', ['Die Person lobt die zusätzlichen Nachweise.', 'Die Person erläutert neutral eine gesetzliche Pflicht.'], 'Fünf Nachweise und ein fehlender Zugang widersprechen der wörtlichen Bewertung.', '„Vorbildlich niedrigschwellig“, schrieb Deniz im Teamchat, nachdem er für die Anmeldung fünf Nachweise zusammensuchen musste und Menschen ohne elektronischen Ausweis ganz ausgeschlossen blieben.'),
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
        practice('write', 'Gib die Kritik in zwei Sätzen für eine Leitungsvorlage wieder und benenne eine offene Frage.', 'Die aufwendigen Nachweispflichten und der erforderliche elektronische Ausweis erschweren den Zugang. Zu klären ist, ob eine persönliche Anmeldung dieselbe Prüfung gewährleisten könnte.', ['Kritik aus dem Kontext erschlossen', 'Sachliches Register', 'Offene Frage sinnvoll'], 'Ersetze die ironische Bewertung durch konkrete, überprüfbare Gründe.'),
      ],
    },
    {
      id: 'c1-register', chapter: 'Zwischentöne und Register', title: 'Eine Fachinformation vermitteln',
      scene: 'Ein Forschungsprojekt will die Ergebnisse einer Befragung verständlich veröffentlichen.',
      rule: 'Beim Registerwechsel müssen Reichweite und Unsicherheit der Aussage erhalten bleiben. Erkläre Fachbegriffe über ihre Folgen.',
      exercises: [
        choice('Welche Fassung vermittelt die Aussage ohne Übertreibung?', 'Die Ergebnisse können für diese Gruppe aufschlussreich sein. Für andere Gruppen wissen wir es noch nicht.', ['Die Ergebnisse gelten für niemanden.', 'Die Ergebnisse gelten für alle, solange niemand widerspricht.'], 'Begrenzte Übertragbarkeit betrifft die Reichweite, nicht den Wert der Ergebnisse für die untersuchte Gruppe.', 'Die Aussagekraft für die untersuchte Stichprobe bleibt bestehen, während die externe Validität wegen der selektiven Rekrutierung eingeschränkt ist.'),
        cards('Ordne die formelle Einschränkung mit „inwieweit“.', 'Inwieweit der Befund auf andere Gruppen übertragbar ist, bleibt zu prüfen.', 'Die indirekte Frage steht als Einheit vor dem Prädikat „bleibt zu prüfen“.', [
          'Inwieweit',
          'der Befund',
          'auf andere Gruppen',
          'übertragbar',
          pool('verb.sein', { chosenPerson: 'er' }, { punctuation: ',' }),
          'bleibt zu prüfen',
        ]),
        practice('speak', 'Erkläre den Befund in Alltagssprache. Nenne dabei einen Grund, warum die Ergebnisse nicht für alle gelten müssen.', 'Die Ergebnisse sagen etwas über diejenigen aus, die wir befragt haben. Weil sich vor allem Menschen mit Interesse am Thema gemeldet haben, wissen wir noch nicht, ob andere Gruppen genauso antworten würden.', ['Reichweite korrekt', 'Auswahlproblem erklärt', 'Ohne unnötige Fachwörter'], 'Das Beispiel zur Auswahl ersetzt abstrakte Begriffe, ohne die Aussage zu vergrößern.'),
      ],
    },
    {
      id: 'c1-attribution', chapter: 'Zwischentöne und Register', title: 'Eine verdichtete Formulierung auflösen',
      scene: 'Ein Verwaltungstext enthält ein umfangreiches Attribut, das beim ersten Lesen schwer zuzuordnen ist.',
      rule: 'Partizipialattribute lassen sich oft in Relativsätze umformen. Prüfe dabei, worauf das Attribut bezogen ist und ob ein Vorgang oder eine Verpflichtung beschrieben wird.',
      exercises: [
        choice('Welcher Relativsatz erhält die Bedeutung?', 'Die Stellungnahmen, die bis Montag eingereicht werden müssen.', ['Die Stellungnahmen, die bereits am Montag eingereicht wurden.', 'Die Stellungnahmen, die am Montag eingereicht werden dürfen.'], '„Einzureichende“ enthält hier eine Verpflichtung und beschreibt keine bereits erledigte Handlung.', 'Die bis Montag einzureichenden Stellungnahmen werden anschließend gesichtet.'),
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
        practice('write', 'Formuliere den Verwaltungssatz als zwei kurze Anweisungen für die Beteiligten.', 'Reichen Sie Ihre Stellungnahme bitte bis Montag ein. Danach sichten wir alle eingegangenen Stellungnahmen.', ['Frist erhalten', 'Zuständigkeit nachvollziehbar', 'Abfolge klar'], 'Ein Tätigkeitsverb wie „einreichen“ macht eine Anweisung direkter.'),
      ],
    },
    {
      id: 'c1-prognose', chapter: 'Quellen und Schlussfolgerungen', title: 'Den Geltungsanspruch einer Prognose prüfen',
      scene: 'Eine Expertin wird in einer Anhörung gefragt, ob die Investition Einsparungen bringen werde.',
      rule: 'Unterscheide eine Prognose von einer Zusicherung. Konditionale Formulierungen binden die Folgerung an überprüfbare Annahmen.',
      exercises: [
        listen('Welche Einschränkung ist für die Prognose entscheidend?', 'Dass sich die Investition mittelfristig rechnet, ist unter den getroffenen Annahmen plausibel. Vorausgesetzt ist allerdings eine Auslastung von mindestens siebzig Prozent. Wie sich die Nachfrage entwickelt, können wir zurzeit nicht belastbar abschätzen.', 'Die notwendige Auslastung ist mangels Nachfrageprognose ungewiss.', ['Die Investition ist rechtlich unzulässig.', 'Die Prognose ist bereits durch Messdaten bestätigt.'], 'Die Auslastung ist eine Bedingung und keine feststehende Beobachtung.'),
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
        practice('write', 'Fasse für ein Protokoll Annahme, Prognose und Wissenslücke zusammen.', 'Die Expertin hält Einsparungen mittelfristig für plausibel, sofern die Auslastung bei mindestens 70 Prozent liegt. Für die Nachfrage und damit für das Erreichen dieser Schwelle fehlen belastbare Angaben.', ['Annahme spezifiziert', 'Prognose vorsichtig', 'Wissenslücke erkennbar'], 'Schreib die Bedingung möglichst unmittelbar zur Prognose.'),
      ],
    },
    {
      id: 'c1-synthese', chapter: 'Quellen und Schlussfolgerungen', title: 'Zwei Quellen mit unterschiedlichen Maßstäben verbinden',
      scene: 'Ein Bericht der Verwaltung und eine Stellungnahme eines Vereins bewerten dieselbe Parkregelung.',
      rule: 'Scheinbare Widersprüche können auf unterschiedlichen Kriterien beruhen. Benenne die Kriterien, bevor du die Bewertungen vergleichst.',
      exercises: [
        choice('Warum widersprechen sich die Texte nur scheinbar?', 'Sie bewerten unterschiedliche Folgen derselben Maßnahme.', ['Ein Text widerlegt die Zeitmessung des anderen.', 'Beide setzen dieselbe Priorität.'], 'Suchdauer und Zugang zu einem Pflegeheim sind unterschiedliche Bewertungsgrößen.', 'Bericht der Verwaltung: Seit Einführung der Parkregelung finden Autofahrende im untersuchten Gebiet im Mittel vier Minuten schneller einen Stellplatz. Der Bericht erfasst die Suchdauer an Werktagen. Wege zwischen dem Stellplatz und dem eigentlichen Ziel wurden nicht gemessen.\n\nStellungnahme des Angehörigenvereins: Die Kurzzeitplätze vor dem Pflegeheim sind entfallen. Die verbliebenen Stellplätze sind für kürzere Besuche oft ungeeignet, weil Angehörige danach einen längeren Fußweg zurücklegen müssen. Das betrifft besonders Menschen, die eine betreuungsbedürftige Person beim Ein- und Aussteigen unterstützen. Der Verein stellt den gemessenen Zeitgewinn nicht infrage, hält ihn aber als alleiniges Erfolgskriterium für unzureichend.'),
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
        practice('write', 'Verfasse eine kurze Synthese mit einem offenen Prüfauftrag.', 'Die Verwaltung belegt kürzere Suchzeiten, während der Verein auf erschwerten Zugang für pflegende Angehörige verweist. Zu prüfen wäre, ob gezielte Kurzzeitplätze die Zugänglichkeit verbessern, ohne den Zeitgewinn insgesamt aufzuheben.', ['Beide Quellen zugeordnet', 'Unterschiedliche Kriterien erkennbar', 'Passender Prüfauftrag'], 'Ein Synthesesatz kann beide Perspektiven fair erhalten.'),
      ],
    },
    {
      id: 'c1-konzession', chapter: 'Quellen und Schlussfolgerungen', title: 'Reichweite eines Arguments einschränken',
      scene: 'In einer Stellungnahme wird diskutiert, ob eine Maßnahme allein zum Ziel führt.',
      rule: '„Wenngleich“ räumt einen Umstand ein. Formulierungen wie „für sich genommen“ begrenzen, welche Wirkung zugeschrieben wird.',
      exercises: [
        choice('Welche Aussage fasst den Einwand zusammen?', 'Die Maßnahme kann helfen, reicht für sich allein jedoch nicht aus.', ['Die Maßnahme ist nachweislich wirkungslos.', 'Weitere Maßnahmen wären schädlich.'], 'Die Formulierung räumt einen möglichen Nutzen ein und bestreitet seine Hinlänglichkeit.', 'Wenngleich eine Aufklärungskampagne das Problembewusstsein schärfen dürfte, ist sie für sich genommen kaum geeignet, strukturelle Zugangshürden abzubauen.'),
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
        practice('write', 'Formuliere einen differenzierten Einwand und schlage eine strukturelle Ergänzung vor.', 'Eine Kampagne kann über Angebote informieren. Solange die Anmeldung allerdings nur online möglich ist, bleiben Menschen ohne Internetzugang außen vor. Eine telefonische Anmeldung würde diese Hürde gezielt senken.', ['Nutzen eingeräumt', 'Unzureichende Reichweite erklärt', 'Ergänzung adressiert die Hürde'], 'Unterscheide Kommunikationsprobleme von tatsächlichen Zugangshürden.'),
      ],
    },
    {
      id: 'c1-jedoch', chapter: 'Strategie und Transfer', title: 'Einen Gedankengang gezielt gliedern',
      scene: 'Für ein Gutachten liegen positive erste Ergebnisse vor, doch die Datenbasis ist schmal.',
      rule: 'Signale wie „zunächst“, „jedoch“ und „daraus folgt“ führen Leser durch Beobachtung, Einschränkung und Konsequenz. Die Reihenfolge muss die Logik spiegeln.',
      exercises: [
        choice('Welche Folge passt zu einem vielversprechenden Einzelversuch?', 'Der Befund rechtfertigt eine breitere Prüfung vor der Ausweitung.', ['Die Maßnahme muss unverzüglich überall eingeführt werden.', 'Der Versuch liefert keinerlei Anhaltspunkt.'], 'Der Befund ist ein Grund für weitere Prüfung, reicht aber noch nicht für eine allgemeine Einführung.'),
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
        practice('write', 'Schreibe eine gutachterliche Kurzbewertung mit Beobachtung, Einschränkung und begründeter Konsequenz.', 'Im Pilotprojekt sank die Bearbeitungsdauer. Da nur ein Team beteiligt war, bleibt offen, ob der Effekt auf andere Abteilungen übertragbar ist. Vor einer Ausweitung sollte die Maßnahme unter unterschiedlichen Arbeitsbedingungen erprobt werden.', ['Keine überzogene Generalisierung', 'Organisationssignale passend', 'Konsequenz nachvollziehbar'], 'Eine kohärente Folgerung beantwortet die benannte Einschränkung.'),
      ],
    },
    {
      id: 'c1-verhandlung', chapter: 'Strategie und Transfer', title: 'In einer Verhandlung präzise reagieren',
      scene: 'Zwei Organisationen wollen Daten gemeinsam auswerten, setzen aber unterschiedliche Bedingungen.',
      rule: 'Spiegle den Kern eines Einwands, bevor du den Handlungsspielraum beschreibst. „Unter der Maßgabe, dass …“ kennzeichnet eine verbindliche Bedingung.',
      exercises: [
        listen('Worauf besteht die zweite Organisation?', 'Mara: Wir würden die Ergebnisse gern zusammen veröffentlichen. Deniz: Eine gemeinsame Veröffentlichung ist möglich. Die zugrunde liegenden Einzeldaten müssen jedoch bei uns verbleiben; ausgewertete Kennzahlen können wir zur Verfügung stellen.', 'Die Einzeldaten bleiben bei ihr; Kennzahlen dürfen geteilt werden.', ['Die Veröffentlichung ist grundsätzlich ausgeschlossen.', 'Die Einzeldaten müssen vor der Veröffentlichung übergeben werden.'], 'Die Grenze betrifft die Einzeldaten, nicht die gemeinsame Veröffentlichung.'),
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
        practice('speak', 'Antworte als Moderatorin. Fasse die Vereinbarung zusammen und benenne einen nächsten Schritt, ohne zusätzliche Zusagen zu erfinden.', 'Eine gemeinsame Veröffentlichung ist möglich, wenn wir nur ausgewertete Kennzahlen verwenden. Die Einzeldaten verbleiben bei der zuständigen Organisation. Als Nächstes sollten wir gemeinsam festlegen, welche Kennzahlen wir benötigen.', ['Zusage und Grenze korrekt', 'Keine neuen Verpflichtungen', 'Nächster Schritt umsetzbar'], 'Eine klare Zusammenfassung schützt vor unterschiedlichen Erwartungen.'),
      ],
    },
    {
      id: 'c1-abschluss', chapter: 'Strategie und Transfer', title: 'Abschluss · Eine Entscheidungsvorlage verfassen',
      scene: 'Du berätst eine Stadt zum Ausbau von Hitzeschutzmaßnahmen. Zwei Quellen betonen unterschiedliche Ziele.',
      rule: 'Eine Entscheidungsvorlage braucht eine begründete Priorität, einen Umgang mit Unsicherheit und eine nachvollziehbare nächste Entscheidung.',
      exercises: [
        choice('Welche Folgerung berücksichtigt beide Quellen und die zeitliche Dringlichkeit?', 'Akute Schutzräume öffnen und auf längere Sicht in Bäume investieren.', ['Nur Bäume pflanzen, weil Schutzräume langfristig nichts ändern.', 'Auf beide Maßnahmen verzichten, bis beide Wirkungen identisch sind.'], 'Die Maßnahmen erfüllen verschiedene Zwecke und ergänzen sich zeitlich.', 'Auswertung des Gesundheitsamts: Während mehrerer heißer Nächte häuften sich die Notfälle besonders in dicht bebauten Vierteln mit älteren Bewohnerinnen und Bewohnern. Für den nächsten Sommer empfiehlt das Amt kühle Räume an gut erreichbaren Standorten. Tagsüber geöffnete Angebote allein könnten an den nächtlichen Belastungsspitzen vorbeigehen. Welche Standorte tatsächlich genutzt würden, lässt sich aus den Notfalldaten nicht ableiten.\n\nStädtischer Umweltbericht: Straßenbäume senken langfristig die Hitzebelastung durch Schatten und Verdunstung. Jungbäume geben jedoch deutlich weniger Schatten als ausgewachsene Bäume. Die Autorinnen empfehlen, geeignete Standorte früh zu sichern und die nötige Bewässerung einzuplanen. Ihre Modellrechnung macht keine Aussage darüber, wie viele akute Notfälle durch einzelne Pflanzungen verhindert werden.'),
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
        practice('write', 'Schreib eine Entscheidungsvorlage von etwa acht Sätzen. Fasse beide Quellen zusammen und benenne Priorität, offene Frage und Prüfkriterium.', 'Das Gesundheitsamt verzeichnet zusätzliche Notfälle während heißer Nächte. Es empfiehlt zugängliche kühle Räume. Der Umweltbericht sieht in Straßenbäumen eine dauerhafte Entlastung. Ihre Wirkung wächst erst mit dem Kronenvolumen. Kurzfristig sollten deshalb klimatisierte Räume in besonders belasteten Vierteln geöffnet werden. Parallel kann die Stadt Standorte für Bäume sichern. Offen bleibt, welche Öffnungszeiten die Zielgruppen tatsächlich erreichen. Die Nutzung der Standorte sollte im ersten Sommer nach Uhrzeit erfasst werden.', ['Beide Quellen korrekt zugeordnet', 'Kurz- und Langfristmaßnahme begründet', 'Offene Frage und passendes Prüfkriterium benannt', 'Vorlage klar gegliedert'], 'Binde die spätere Überprüfung an eine konkrete Entscheidungsfrage.'),
      ],
    },
  ],
};
