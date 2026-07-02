const PENDING_SECTION_SCROLL_KEY = "pending-section-scroll";

export function setPendingSectionScroll(hash: string) {
  sessionStorage.setItem(PENDING_SECTION_SCROLL_KEY, hash);
}

export function getPendingSectionScroll(): string | null {
  return sessionStorage.getItem(PENDING_SECTION_SCROLL_KEY);
}

export function clearPendingSectionScroll() {
  sessionStorage.removeItem(PENDING_SECTION_SCROLL_KEY);
}

export function resolveSectionHash(): string | null {
  const pending = getPendingSectionScroll();
  if (pending) return pending;

  const hash = window.location.hash;
  return hash || null;
}
