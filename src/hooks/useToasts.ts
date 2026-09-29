import { useCallback, useRef, useState } from 'react';
import type { ToastMessage } from '../types';

/**
 * Queue of short-lived notifications. Each toast removes itself after
 * a fixed delay, so callers just call notify() and move on.
 */
export function useToasts() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const timers = useRef<Record<string, number>>({});

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    window.clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const notify = useCallback(
    (text: string, kind: ToastMessage['kind'] = 'success') => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, text, kind }]);
      timers.current[id] = window.setTimeout(() => dismiss(id), 2600);
    },
    [dismiss]
  );

  return { toasts, notify, dismiss };
}
