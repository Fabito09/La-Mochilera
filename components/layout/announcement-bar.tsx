interface AnnouncementBarProps {
  message: string;
}

export function AnnouncementBar({ message }: AnnouncementBarProps) {
  return (
    <aside
      aria-label="Anuncio"
      className="flex h-(--announcement-height) items-center justify-center bg-announcement px-4 text-center text-xs font-medium tracking-wide text-announcement-foreground sm:text-sm">
      <p>{message}</p>
    </aside>
  );
}
