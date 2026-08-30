type IconProps = { size?: number; stroke?: number };

export function Arrow({ size = 17, stroke = 1.8 }: IconProps) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

export function Download({ size = 16 }: IconProps) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></svg>;
}

export function Menu({ open }: { open: boolean }) {
  return <span aria-hidden="true" className={`menu-lines ${open ? "is-open" : ""}`}><i /><i /></span>;
}
