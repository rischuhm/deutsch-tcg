import { ResultDialog } from './ResultDialog';

interface OnboardingProps {
  onClose: () => void;
}

export function Onboarding({ onClose }: OnboardingProps) {
  return (
    <ResultDialog title="Spielregeln" onDismiss={onClose}>
      <ul className="game-rules">
        <li>Wähle eine Handkarte, um ihre Formen zu sehen, und lege sie auf die Satzleiste.</li>
        <li>Setze ein Steinchen auf die passende Form. Wähle zum Beispiel <strong>komme</strong> für <strong>ich</strong> oder <strong>den Tisch</strong> für den Akkusativ.</li>
        <li>Ziehe Karten auf der Satzleiste mit der Maus oder dem Finger an ihre neue Position.</li>
        <li>Prüfe deinen Satz. In Storylektionen bekommst du Grammatikerklärungen und sammelst nach dem Abschluss das Lektionsdeck.</li>
      </ul>
      <button type="button" className="btn result-close" onClick={onClose} autoFocus>Schließen</button>
    </ResultDialog>
  );
}
