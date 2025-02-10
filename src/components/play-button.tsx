import { Play } from "lucide-react"
import { cn } from "~/lib/utils"

interface PlayButtonProps {
  onClick: () => void
  label?: string
  className?: string
}

export function PlayButton({ onClick, label, className }: PlayButtonProps) {
  return (
    <div className={cn("min-w-[120px]", className)}>
      <button
        onClick={onClick}
        className="w-full h-full flex flex-col items-center justify-center gap-1 hover:bg-accent/50 transition-colors"
      >
        <Play className="w-4 h-4" />
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </button>
    </div>
  )
}

