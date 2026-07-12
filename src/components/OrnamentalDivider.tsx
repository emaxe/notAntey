import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  variant?: "default" | "wide" | "compact";
}

export default function OrnamentalDivider({ className, variant = "default" }: Props) {
  const width = variant === "wide" ? 320 : variant === "compact" ? 120 : 200;
  const height = 24;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 text-[var(--color-hairline)]",
        className
      )}
      aria-hidden="true"
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left ornament */}
        <path
          d="M4 12 Q12 4 20 12 Q12 20 4 12 Z"
          fill="currentColor"
          opacity="0.5"
        />
        <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.7" />
        
        {/* Central line */}
        <line
          x1="28"
          y1="12"
          x2={width - 28}
          y2="12"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        
        {/* Center diamond */}
        <path
          d={`M${width / 2} 8 L${width / 2 + 4} 12 L${width / 2} 16 L${width / 2 - 4} 12 Z`}
          fill="currentColor"
          opacity="0.6"
        />
        
        {/* Right ornament */}
        <circle cx={width - 20} cy="12" r="2" fill="currentColor" opacity="0.7" />
        <path
          d={`M${width - 20} 12 Q${width - 12} 4 ${width - 4} 12 Q${width - 12} 20 ${width - 20} 12 Z`}
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
