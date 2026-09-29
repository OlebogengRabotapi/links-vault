import { useState } from 'react';
import type { LinkEntry } from '../types';

interface LinkCardProps {
  entry: LinkEntry;
  onEdit: (entry: LinkEntry) => void;
  onDelete: (id: string) => void;
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function LinkCard({ entry, onEdit, onDelete }: LinkCardProps) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <article className="link-card">
      <div className="link-card__tab">{entry.tags[0] ?? 'untagged'}</div>

      <div className="link-card__head">
        <img
          className="link-card__icon"
          src={`https://www.google.com/s2/favicons?domain=${hostname(entry.url)}&sz=64`}
          alt=""
          width={28}
          height={28}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div>
          <a
            className="link-card__title"
            href={entry.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {entry.title}
          </a>
          <span className="link-card__host">{hostname(entry.url)}</span>
        </div>
      </div>

      {entry.description && (
        <p className="link-card__description">{entry.description}</p>
      )}

      {entry.tags.length > 0 && (
        <ul className="link-card__tags">
          {entry.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      <div className="link-card__actions">
        <button type="button" className="btn btn--ghost" onClick={() => onEdit(entry)}>
          Edit
        </button>

        {confirmingDelete ? (
          <span className="link-card__confirm">
            <span>Delete?</span>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onDelete(entry.id)}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setConfirmingDelete(false)}
            >
              No
            </button>
          </span>
        ) : (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setConfirmingDelete(true)}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
