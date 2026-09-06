export default function Icon({
  name,
  className = 'h-5 w-5',
}: {
  name:
    | 'download'
    | 'lock'
    | 'unlock'
    | 'arrow-right'
    | 'arrow-up-right'
    | 'check'
    | 'x'
    | 'menu'
    | 'sun'
    | 'moon'
    | 'whatsapp'
    | 'chat'
    | 'user'
    | 'users'
    | 'file'
    | 'file-text'
    | 'bell'
    | 'trash'
    | 'plus'
    | 'search'
    | 'logout'
    | 'shield'
    | 'sparkle'
    | 'target'
    | 'brain'
    | 'rocket'
    | 'book'
    | 'layers'
    | 'eye'
    | 'phone'
    | 'mail'
    | 'map-pin'
    | 'chevron-down'
    | 'star'
    | 'award'
    | 'zap'
    | 'heart'
    | 'handshake'
    | 'eye-off';
  className?: string;
}) {
  const stroke = {
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const paths: Record<string, React.ReactNode> = {
    download: (
      <g {...stroke}>
        <path d="M12 3v12" />
        <path d="m7 11 5 5 5-5" />
        <path d="M5 21h14" />
      </g>
    ),
    lock: (
      <g {...stroke}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </g>
    ),
    unlock: (
      <g {...stroke}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 7.6-1.7" />
      </g>
    ),
    'arrow-right': (
      <g {...stroke}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </g>
    ),
    'arrow-up-right': (
      <g {...stroke}>
        <path d="M7 17 17 7" />
        <path d="M9 7h8v8" />
      </g>
    ),
    check: (
      <g {...stroke}>
        <path d="m5 12.5 4.5 4.5L19 7" />
      </g>
    ),
    x: (
      <g {...stroke}>
        <path d="M6 6l12 12" />
        <path d="M18 6 6 18" />
      </g>
    ),
    menu: (
      <g {...stroke}>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </g>
    ),
    sun: (
      <g {...stroke}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </g>
    ),
    moon: (
      <g {...stroke}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </g>
    ),
    whatsapp: (
      <g fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </g>
    ),
    chat: (
      <g {...stroke}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </g>
    ),
    user: (
      <g {...stroke}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
      </g>
    ),
    users: (
      <g {...stroke}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5" />
        <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" />
        <path d="M18.5 14.9c1.8.8 3 2.3 3 4.1" />
      </g>
    ),
    file: (
      <g {...stroke}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
      </g>
    ),
    'file-text': (
      <g {...stroke}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6" />
      </g>
    ),
    bell: (
      <g {...stroke}>
        <path d="M18 9a6 6 0 1 0-12 0c0 6-2.5 7-2.5 7h17S18 15 18 9" />
        <path d="M10 19.5a2.2 2.2 0 0 0 4 0" />
      </g>
    ),
    trash: (
      <g {...stroke}>
        <path d="M4 7h16" />
        <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        <path d="M6 7l1 13a1 1 0 0 0 1 .9h8a1 1 0 0 0 1-.9L18 7" />
        <path d="M10 11v6M14 11v6" />
      </g>
    ),
    plus: (
      <g {...stroke}>
        <path d="M12 5v14M5 12h14" />
      </g>
    ),
    search: (
      <g {...stroke}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </g>
    ),
    logout: (
      <g {...stroke}>
        <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
        <path d="m15 8 4 4-4 4" />
        <path d="M19 12H9" />
      </g>
    ),
    shield: (
      <g {...stroke}>
        <path d="M12 3 4.5 6v5c0 5 3.2 8.4 7.5 10 4.3-1.6 7.5-5 7.5-10V6z" />
        <path d="m9 12 2.2 2.2L15.5 10" />
      </g>
    ),
    sparkle: (
      <g {...stroke}>
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
        <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
      </g>
    ),
    target: (
      <g {...stroke}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      </g>
    ),
    brain: (
      <g {...stroke}>
        <path d="M9.5 3A2.5 2.5 0 0 0 7 5.5v.6A3.5 3.5 0 0 0 4.5 9.4c0 .9.3 1.7.9 2.4a3.5 3.5 0 0 0-.4 1.7 3.5 3.5 0 0 0 3 3.5 3.5 3.5 0 0 0 5 3.2V5.5A2.5 2.5 0 0 0 9.5 3z" />
        <path d="M14.5 3A2.5 2.5 0 0 1 17 5.5v.6a3.5 3.5 0 0 1 2.5 3.3c0 .9-.3 1.7-.9 2.4.3.5.4 1.1.4 1.7a3.5 3.5 0 0 1-3 3.5 3.5 3.5 0 0 1-5 3.2" />
      </g>
    ),
    rocket: (
      <g {...stroke}>
        <path d="M12 15c-2-1-3-2-4-4 1.5-4.5 4.5-7.5 10-8-.5 5.5-3.5 8.5-8 10z" transform="rotate(45 12 12)" />
        <path d="M7 14.5 4.5 17a3.5 3.5 0 0 0 2.5 2.5L9.5 17" />
        <path d="M9.5 17c-1 1-1.5 2.5-1.5 4.5C10 21.5 11.5 21 12.5 20" />
      </g>
    ),
    book: (
      <g {...stroke}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
        <path d="M4 20.5V5.5" />
        <path d="M20 18v3H6.5" />
        <path d="M9 8h7M9 11.5h7" />
      </g>
    ),
    layers: (
      <g {...stroke}>
        <path d="m12 3 9 5-9 5-9-5z" />
        <path d="m3 13 9 5 9-5" />
        <path d="m3 17.5 9 5 9-5" />
      </g>
    ),
    eye: (
      <g {...stroke}>
        <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
        <circle cx="12" cy="12" r="2.8" />
      </g>
    ),
    'eye-off': (
      <g {...stroke}>
        <path d="M4 4l16 16" />
        <path d="M9.9 5.1A9.8 9.8 0 0 1 12 4.9c6.5 0 10 7.1 10 7.1a17.6 17.6 0 0 1-2.7 3.7" />
        <path d="M6.3 6.6A17 17 0 0 0 2 12s3.5 6.5 10 6.5a9.7 9.7 0 0 0 3.7-.7" />
        <path d="M10 10.2a2.8 2.8 0 0 0 3.9 3.9" />
      </g>
    ),
    phone: (
      <g {...stroke}>
        <path d="M5 4h4l1.5 4.5-2.2 1.6a12.5 12.5 0 0 0 5.6 5.6l1.6-2.2L20 15v4a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4z" />
      </g>
    ),
    mail: (
      <g {...stroke}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </g>
    ),
    'map-pin': (
      <g {...stroke}>
        <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </g>
    ),
    'chevron-down': (
      <g {...stroke}>
        <path d="m6 9 6 6 6-6" />
      </g>
    ),
    star: (
      <g {...stroke}>
        <path d="m12 3 2.7 5.8 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.3-.8z" />
      </g>
    ),
    award: (
      <g {...stroke}>
        <circle cx="12" cy="9" r="5.5" />
        <path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" />
        <path d="m10 8.5 1.5 1.5L14.5 7" />
      </g>
    ),
    zap: (
      <g {...stroke}>
        <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5z" />
      </g>
    ),
    heart: (
      <g {...stroke}>
        <path d="M12 20.5s-8-4.7-8-10.5a4.7 4.7 0 0 1 8-3.3 4.7 4.7 0 0 1 8 3.3c0 5.8-8 10.5-8 10.5z" />
      </g>
    ),
    handshake: (
      <g {...stroke}>
        <path d="m11 17 2 2a1.5 1.5 0 0 0 2.1-2.1" />
        <path d="m14.5 16.9 1.6 1.6a1.5 1.5 0 0 0 2.1-2.1" />
        <path d="M4 8 9 5l3 1 4-2 4 4-2 4-4 4" />
        <path d="M4 8l4 4 3-1" />
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
