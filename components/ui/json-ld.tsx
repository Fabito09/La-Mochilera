interface JsonLdProps {
  data: Record<string, unknown>;
}

// Datos estructurados schema.org para buscadores.
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Se escapa "<" para que ningún texto pueda cerrar la etiqueta <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
