import { BrandPillars } from "@/components/home/brand-pillars";
import { BrandStory } from "@/components/home/brand-story";
import { WhatsAppCta } from "@/components/page/whatsapp-cta";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { heroContent, homeContact } from "@/content/inicio";

const STORY_SECTION_ID = "historia";

// Inicio corto, como "lobby": portada, cómo nació la marca, lo que usamos en
// cada par y contacto. El resto vive en su propia página (menú del header).
export default function HomePage() {
  const { video } = heroContent;

  return (
    <main>
      <AnimatedHero
        backgroundVideoSrc={{
          landscape: video.landscape || undefined,
          portrait: video.portrait || undefined,
        }}
        posterImageUrl={heroContent.posterImageUrl}
        title={heroContent.title}
        description={heroContent.description}
        ctaButton={heroContent.primaryCta}
        secondaryCta={heroContent.secondaryCta}
        scrollTargetId={STORY_SECTION_ID}
      />
      <BrandStory id={STORY_SECTION_ID} />
      <BrandPillars
        id="materiales"
        callToAction={{ label: "Conocer nuestros materiales", href: "/artesania" }}
      />
      <WhatsAppCta
        title={homeContact.title}
        description={homeContact.description}
        message={homeContact.whatsappMessage}
      />
    </main>
  );
}
