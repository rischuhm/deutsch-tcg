import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export function ResultDialog({ title, children, onDismiss }: {
  title: string;
  children: ReactNode;
  onDismiss?: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  return (
    <dialog ref={dialog} className="result-card" aria-labelledby="result-title"
      onCancel={(event) => { event.preventDefault(); onDismiss?.(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onDismiss?.(); }}>
      <div className="result-content">
        <h2 id="result-title">{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
