import { useEffect, useState, type FormEvent } from 'react';
import type { LinkDraft, LinkEntry } from '../types';
import { TagInput } from './TagInput';

const EMPTY_DRAFT: LinkDraft = { title: '', url: '', description: '', tags: [] };

interface LinkFormProps {
  editingEntry: LinkEntry | null;
  onSubmit: (draft: LinkDraft) => void;
  onCancel: () => void;
}

function normaliseUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * A single controlled form used for both adding a new entry and editing
 * an existing one. Which mode it's in is decided entirely by whether
 * `editingEntry` is set — the parent owns that decision.
 */
export function LinkForm({ editingEntry, onSubmit, onCancel }: LinkFormProps) {
  const [draft, setDraft] = useState<LinkDraft>(EMPTY_DRAFT);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDraft(
      editingEntry
        ? {
            title: editingEntry.title,
            url: editingEntry.url,
            description: editingEntry.description,
            tags: editingEntry.tags,
          }
        : EMPTY_DRAFT
    );
    setError(null);
  }, [editingEntry]);

  const isValid = draft.title.trim() !== '' && draft.url.trim() !== '';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) {
      setError('A title and a link are both required.');
      return;
    }
    onSubmit({ ...draft, url: normaliseUrl(draft.url) });
    setDraft(EMPTY_DRAFT);
    setError(null);
  };

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <h2 className="link-form__heading">
        {editingEntry ? 'Edit entry' : 'File a new link'}
      </h2>

      <label className="field">
        <span>Title</span>
        <input
          type="text"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          placeholder="Design systems that actually scale"
        />
      </label>

      <label className="field">
        <span>Link</span>
        <input
          type="text"
          value={draft.url}
          onChange={(e) => setDraft({ ...draft, url: e.target.value })}
          placeholder="example.com/article"
        />
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          placeholder="Why this is worth coming back to"
          rows={3}
        />
      </label>

      <label className="field">
        <span>Tags (optional)</span>
        <TagInput tags={draft.tags} onChange={(tags) => setDraft({ ...draft, tags })} />
      </label>

      {error && <p className="field-error">{error}</p>}

      <div className="link-form__actions">
        <button type="submit" className="btn btn--primary" disabled={!isValid}>
          {editingEntry ? 'Save changes' : 'Add to vault'}
        </button>
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
