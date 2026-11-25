import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { CardInstance, GermanCase, Person, VerbForm } from '../game';
import {
  CASE_ORDER, PERSON_LABELS, PERSON_ORDER, VERB_FORMS, getCard, nounForm, pronounForm, verbWord,
} from '../game';
import { TYPE_COLORS, TYPE_LABELS, displayWord, iconUrl } from '../lib/ui';

interface InspectOverlayProps {
  instance: CardInstance;
  source: 'hand' | 'played' | 'collection';
  playedFull?: boolean;
  onPlay?: (instance: CardInstance) => void;
  onReturn?: (instance: CardInstance) => void;
  onChange?: (instance: CardInstance) => void;
  onClose: () => void;
}

function FormOption({ label, word, active, select }: {
  label: string;
  word: string;
  active: boolean;
  select?: () => void;
}) {
  const content = <>
    <span className="chip-btn-label">{label}</span>
    <span className="chip-btn-sub">{word}</span>
  </>;
  return select
    ? <button className={`chip-btn ${active ? 'chip-active' : ''}`} aria-pressed={active} onClick={select}>{content}</button>
    : <div className="chip-btn">{content}</div>;
}

export function InspectOverlay({ instance, source, playedFull, onPlay, onReturn, onChange, onClose }: InspectOverlayProps) {
  const [draft, setDraft] = useState(instance);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  const def = getCard(instance.defId);
  if (!def) return null;
  const { conjugation } = def;
  const isReference = source === 'collection';
  const update = (selection: Partial<CardInstance>) => {
    const updated = { ...draft, ...selection };
    setDraft(updated);
    if (source === 'played') onChange?.(updated);
  };
  const choosePerson = (person: Person) => update({
    chosenPerson: draft.chosenPerson === person ? undefined : person,
    chosenVerbForm: undefined,
  });
  const chooseVerbForm = (form: VerbForm) => update({
    chosenVerbForm: draft.chosenVerbForm === form ? undefined : form,
    chosenPerson: undefined,
  });
  const chooseCase = (germanCase: GermanCase, variant?: string) => {
    const selected = draft.chosenCase === germanCase && draft.chosenPronoun === variant;
    update({ chosenCase: selected ? undefined : germanCase, chosenPronoun: selected ? undefined : variant });
  };
  const showForm = (label: string, word: string, active: boolean, select: () => void) => (
    <FormOption key={label} label={label} word={word} active={active} select={isReference ? undefined : select} />
  );
  let details: ReactNode;

  if (def.type === 'noun') {
    const plural = !!draft.isPlural;
    details = <>
      <h3>{isReference ? 'Deklination' : 'Kasus-Steinchen'} · {plural ? 'Plural' : 'Singular'}</h3>
      <div className="chip-grid chip-grid-cases">
        {CASE_ORDER.map((germanCase) => showForm(germanCase, nounForm(def, germanCase, plural),
          draft.chosenCase === germanCase, () => chooseCase(germanCase)))}
      </div>
      {def.plural && (
        <details className="form-reference">
          <summary>{plural ? 'Singular' : 'Plural'} ansehen</summary>
          <dl>{CASE_ORDER.map((germanCase) => (
            <div key={germanCase}><dt>{germanCase}</dt><dd>{nounForm(def, germanCase, !plural)}</dd></div>
          ))}</dl>
        </details>
      )}
    </>;
  } else if (def.pronouns) {
    details = Object.entries(def.pronouns).map(([variant, forms]) => (
      <section key={variant}>
        <h3>{variant} · {isReference ? 'Deklination' : 'Kasus-Steinchen'}</h3>
        <div className="chip-grid">
          {CASE_ORDER.filter((germanCase) => forms[germanCase]).map((germanCase) =>
            showForm(germanCase, pronounForm(def, germanCase, variant),
              draft.chosenCase === germanCase && draft.chosenPronoun === variant,
              () => chooseCase(germanCase, variant)))}
        </div>
      </section>
    ));
  } else if (conjugation) {
    details = <>
      <h3>Präsens{!isReference && ' · Person-Steinchen'}</h3>
      <div className="chip-grid">
        {PERSON_ORDER.map((person) => showForm(PERSON_LABELS[person], conjugation.praesens[person],
          draft.chosenPerson === person, () => choosePerson(person)))}
      </div>
      <h3>{isReference ? 'Infinite Formen' : 'Steinchen für Infinitiv und Partizipien'}</h3>
      <div className="chip-grid">
        {(Object.keys(VERB_FORMS) as VerbForm[]).map((form) =>
          showForm(VERB_FORMS[form], verbWord(def, form),
            draft.chosenVerbForm === form, () => chooseVerbForm(form)))}
      </div>
      {conjugation.aux && <p className="form-note">Perfekt mit <strong>{conjugation.aux}</strong></p>}
      {conjugation.prefix && <p className="form-note">Verbzusatz im Präsens: <strong>{conjugation.prefix}</strong></p>}
    </>;
  } else if (def.type === 'preposition') {
    details = <section>
      <h3>{def.case}</h3>
      <p className="form-note">{def.case === 'Wechselpräposition'
        ? 'Wo? → Dativ. Wohin? → Akkusativ.'
        : `Das folgende Nomen oder Pronomen steht im ${def.case}.`}</p>
    </section>;
  } else if (def.comparison) {
    details = <>
      <h3>Steigerung</h3>
      <div className="chip-grid">
        <FormOption label="Grundform" word={def.word} active={false} />
        <FormOption label="Komparativ" word={def.comparison[0]} active={false} />
        <FormOption label="Superlativ" word={def.comparison[1]} active={false} />
      </div>
    </>;
  } else {
    details = <p className="form-note">{def.explanation}</p>;
  }

  return (
    <dialog ref={dialog} className="inspect-card" aria-labelledby="inspect-word"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="inspect-inner">
        <header className="inspect-heading" style={{ borderColor: TYPE_COLORS[def.type] }}>
          <div>
            <p className="inspect-type">{TYPE_LABELS[def.type]}{instance.isPlural && ' · Plural'}</p>
            <h2 id="inspect-word">{displayWord(draft)}</h2>
            {def.translation && <p className="form-note" lang="en">{def.translation}</p>}
          </div>
          <img src={iconUrl(def.icon)} alt="" />
        </header>
        <div className="inspect-forms">{details}</div>
        <footer className="inspect-actions">
          <button className="btn btn-secondary" onClick={onClose}>{source === 'played' ? 'Fertig' : 'Schließen'}</button>
          {source === 'hand' && <button className="btn" disabled={playedFull} onClick={() => onPlay?.(draft)}>Karte legen</button>}
          {source === 'played' && <button className="btn btn-secondary" onClick={() => onReturn?.(draft)}>Auf die Hand</button>}
        </footer>
      </div>
    </dialog>
  );
}
