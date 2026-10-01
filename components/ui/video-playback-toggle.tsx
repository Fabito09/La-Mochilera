import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoPlaybackToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
}

export function VideoPlaybackToggle({
  isPlaying,
  onToggle,
  className,
}: VideoPlaybackToggleProps) {
  const Icon = isPlaying ? Pause : Play;

  return (
    <Button
      type="button"
      variant="glass"
      size="icon"
      onClick={onToggle}
      aria-label={isPlaying ? "Pausar video de fondo" : "Reproducir video de fondo"}
      className={cn("rounded-full", className)}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
}
