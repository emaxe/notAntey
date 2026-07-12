interface FanLogoProps {
  size?: number;
  className?: string;
}

export default function FanLogo({ size = 40, className }: FanLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Монограмма Компьютерщикъ"
    >
      {/* Background fill to blend with parchment */}
      <rect x="0" y="0" width="100" height="100" fill="#f5f0e6" rx="2" />

      {/* Outer frame */}
      <rect
        x="4"
        y="4"
        width="92"
        height="92"
        rx="3"
        fill="none"
        stroke="#1c120b"
        strokeWidth="2.2"
      />

      {/* Inner frame */}
      <rect
        x="11"
        y="11"
        width="78"
        height="78"
        rx="1.5"
        fill="none"
        stroke="#1c120b"
        strokeWidth="0.8"
      />

      {/* Corner ornaments — small filled quarter-circles */}
      <path d="M4 4 L18 4 A14 14 0 0 0 4 18 Z" fill="#5e2d79" />
      <path d="M96 4 L82 4 A14 14 0 0 1 96 18 Z" fill="#5e2d79" />
      <path d="M4 96 L18 96 A14 14 0 0 1 4 82 Z" fill="#5e2d79" />
      <path d="M96 96 L82 96 A14 14 0 0 0 96 82 Z" fill="#5e2d79" />

      {/* Corner rosette details */}
      <circle cx="4" cy="4" r="2.5" fill="#1c120b" />
      <circle cx="96" cy="4" r="2.5" fill="#1c120b" />
      <circle cx="4" cy="96" r="2.5" fill="#1c120b" />
      <circle cx="96" cy="96" r="2.5" fill="#1c120b" />

      {/* Monogram КЪ */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="Ruslan Display, serif"
        fontSize="40"
        fill="#1c120b"
      >
        КЪ
      </text>

      {/* Decorative divider line under monogram */}
      <line
        x1="28"
        y1="68"
        x2="72"
        y2="68"
        stroke="#5e2d79"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="68" r="2.5" fill="#5e2d79" />

      {/* Tiny bottom text */}
      <text
        x="50"
        y="82"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="7"
        letterSpacing="1.5"
        fill="#1c120b"
      >
        СЕРВИС
      </text>
    </svg>
  );
}
