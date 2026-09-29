import { useEffect, useState } from 'react';
import type { LinkDraft, LinkEntry } from '../types';

const STORAGE_KEY = 'vault:links';

function readFromStorage(): LinkEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupt or unavailable storage should never crash the app
    return [];
  }
}

/**
 * Owns the full lifecycle of the link collection: loading it from
 * localStorage on mount, persisting on every change, and exposing
 * create / update / delete operations to the rest of the app.
 */
export function useLinks() {
  const [links, setLinks] = useState<LinkEntry[]>(() => readFromStorage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  const addLink = (draft: LinkDraft) => {
    const entry: LinkEntry = {
      ...draft,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setLinks((prev) => [entry, ...prev]);
    return entry;
  };

  const updateLink = (id: string, draft: LinkDraft) => {
    setLinks((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...draft } : entry))
    );
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((entry) => entry.id !== id));
  };

  return { links, addLink, updateLink, deleteLink };
}
