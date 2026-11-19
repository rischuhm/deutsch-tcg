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
            Tippe eine Handkarte an, um sie auf die Satzleiste zu legen — ein
            weiterer Tipp nimmt sie zurück.
          </li>
          <li>Das Verb steht an Position 2 („Ich lerne Deutsch.“).</li>
          <li>Fragewörter stehen ganz am Anfang („Woher kommst du?“).</li>
          <li>
            Ein Modalverb (können, müssen, wollen) braucht einen Infinitiv am
            Satzende.
          </li>
          <li>
            Komplexe Sätze geben mehr Punkte: Fragen, Perfekt, Präpositionen
            und Plurale lohnen sich!
          </li>
          <li>Jeden Tag gibt es einen neuen Booster mit 5 Karten.</li>
        </ul>
        <button className="btn" onClick={onClose}>
          Los geht&apos;s!
        </button>
      </div>
    </div>
  );
}
