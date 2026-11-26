interface OnboardingProps {
  onClose: () => void;
}

/** Einmaliger Info-Dialog mit den Grundregeln (per localStorage-Flag). */
export function Onboarding({ onClose }: OnboardingProps) {
  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        <h2>Willkommen bei SatzMeister! 🃏</h2>
        <p className="subtitle">Baue deutsche Sätze aus Sammelkarten.</p>
        <ul>
          <li>
            Tippe auf eine Handkarte, wähle bei Bedarf eine Form und lege die Karte.
            Ziehe Karten auf der Satzleiste, um ihre Reihenfolge zu ändern.
          </li>
          <li>Im Aussagesatz steht das finite Verb auf Position zwei („Ich lerne Deutsch.“).</li>
          <li>Fragewörter stehen ganz am Anfang („Woher kommst du?“).</li>
          <li>
            Ein Modalverb (können, müssen, wollen) braucht einen Infinitiv am
            Satzende.
          </li>
          <li>
            Komplexe Sätze geben mehr Punkte: Fragen, Perfekt, Präpositionen
            und Plurale lohnen sich!
          </li>
          <li>Spiele Story-Lektionen mit Grammatikerklärungen und sammle ihre Lektionsdecks.</li>
        </ul>
        <p className="chips-info">
          Lege <strong>Steinchen</strong> auf deine Karten: Am Verb wählst du
          die Form, die zum Subjekt passt (ich → komme). An Nomen und Pronomen wählst du den
          Fall (der Tisch → Nominativ, den Tisch → Akkusativ). Richtige
          Steinchen geben Bonuspunkte!
        </p>
        <button className="btn" onClick={onClose}>
          Los geht&apos;s!
        </button>
      </div>
    </div>
  );
}
