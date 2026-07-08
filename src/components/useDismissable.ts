import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Shared dismiss behavior for the header dropdowns (Progress, Reviews, Settings):
 * close on any outside mousedown — so opening another panel dismisses this one
 * instead of stacking both — and on Escape.
 */
export function useDismissable(
  open: boolean,
  close: () => void,
  rootRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close, rootRef])
}
