import { NotFoundNotice } from "@/components/page/not-found-notice";

// Se muestra cuando una página del sitio llama a notFound() (p. ej. un
// producto que ya no existe).
export default function NotFound() {
  return <NotFoundNotice />;
}
