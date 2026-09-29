export interface LinkEntry {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  createdAt: number;
}

// Shape used by the form before an entry has an id/createdAt assigned
export type LinkDraft = Omit<LinkEntry, 'id' | 'createdAt'>;

export interface ToastMessage {
  id: string;
  text: string;
  kind: 'success' | 'error';
}
