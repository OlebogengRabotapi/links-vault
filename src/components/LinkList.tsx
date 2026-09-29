import type { LinkEntry } from '../types';
import { LinkCard } from './LinkCard';

interface LinkListProps {
  entries: LinkEntry[];
  hasAnyLinks: boolean;
  onEdit: (entry: LinkEntry) => void;
  onDelete: (id: string) => void;
}

export function LinkList({ entries, hasAnyLinks, onEdit, onDelete }: LinkListProps) {
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        {hasAnyLinks ? (
          <>
            <p className="empty-state__title">No entries match that search.</p>
            <p>Try a different word, or clear the search field.</p>
          </>
        ) : (
          <>
            <p className="empty-state__title">The vault is empty.</p>
            <p>Use the Add link button to file your first one.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="link-grid">
      {entries.map((entry) => (
        <LinkCard key={entry.id} entry={entry} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
