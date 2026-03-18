interface Props {
  label: string
  className?: string
}

export function ImagePlaceholder({ label, className = '' }: Props) {
  return (
    <div className={`bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 border border-white/10 flex flex-col items-center justify-center gap-2 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="m21 15-5-5L5 21"/>
      </svg>
      <span className="text-gray-500 text-xs font-medium text-center px-4">{label}</span>
    </div>
  )
}
