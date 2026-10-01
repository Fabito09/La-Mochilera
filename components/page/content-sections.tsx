import type { ContentSection } from "@/lib/page-content";

interface ContentSectionsProps {
  sections: ContentSection[];
  /** h3 cuando las secciones van dentro de otra sección con su propio título. */
  headingLevel?: "h2" | "h3";
}

// Texto largo con títulos, párrafos y listas, con ancho cómodo de lectura.
export function ContentSections({ sections, headingLevel = "h2" }: ContentSectionsProps) {
  const Heading = headingLevel;

  return (
    <div className="max-w-3xl space-y-12">
      {sections.map((section) => (
        <section key={section.heading}>
          <Heading className="font-display text-3xl md:text-4xl">{section.heading}</Heading>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-8 text-muted-foreground">
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-muted-foreground marker:text-highlight">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
