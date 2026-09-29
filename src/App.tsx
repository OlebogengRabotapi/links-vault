import { useMemo, useState } from 'react';
import type { LinkDraft, LinkEntry } from './types';
import { useLinks } from './hooks/useLinks';
import { useToasts } from './hooks/useToasts';
import { LinkForm } from './components/LinkForm';
import { LinkList } from './components/LinkList';
import { SearchBar } from './components/SearchBar';
import { ToastStack } from './components/ToastStack';
import { Modal } from './components/Modal';
import './App.css';

function matches(entry: LinkEntry, term: string): boolean {
  const haystack = [entry.title, entry.url, entry.description, ...entry.tags]
    .join(' ')
    .toLowerCase();
  return haystack.includes(term.toLowerCase());
}

export default function App() {
  const { links, addLink, updateLink, deleteLink } = useLinks();
  const { toasts, notify, dismiss } = useToasts();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEntry, setEditingEntry] = useState<LinkEntry | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openAdd = () => {
    setEditingEntry(null);
    setIsFormOpen(true);
  };
  const openEdit = (entry: LinkEntry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingEntry(null);
  };

  const filtered = useMemo(
    () => (searchTerm.trim() === '' ? links : links.filter((l) => matches(l, searchTerm))),
    [links, searchTerm]
  );

  const handleSubmit = (draft: LinkDraft) => {
    if (editingEntry) {
      updateLink(editingEntry.id, draft);
      notify('Entry updated.');
    } else {
      addLink(draft);
      notify('Link filed to the vault.');
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    deleteLink(id);
    if (editingEntry?.id === id) closeForm();
    notify('Entry deleted.', 'error');
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <img className="app__logo" src="public/logo.jfif" alt="The Vault logo" width={44} height={44} />
          <div>
            <h1>The Vault</h1>
            <p>Your links accessible anywhere.</p>
          </div>
        </div>
        <div className="app__tools">
          <SearchBar value={searchTerm} onChange={setSearchTerm} resultCount={filtered.length} />
          <button type="button" className="btn btn--accent" onClick={openAdd}>
            + Add link
          </button>
        </div>
      </header>

      <main className="app__body">
        <section className="app__list-column" aria-label="Saved links">
          <LinkList
            entries={filtered}
            hasAnyLinks={links.length > 0}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>

      {isFormOpen && (
        <Modal onClose={closeForm}>
          <LinkForm
            editingEntry={editingEntry}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </Modal>
      )}

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
