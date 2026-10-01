import { BrandPillars } from "@/components/home/brand-pillars";
import { BrandStory } from "@/components/home/brand-story";
import { CommunityInstagram } from "@/components/home/community-instagram";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { JournalPreview } from "@/components/home/journal-preview";
import { LifestyleGallery } from "@/components/home/lifestyle-gallery";
import { MaterialsCarousel } from "@/components/home/materials-carousel";
import { NewsletterSignup } from "@/components/home/newsletter-signup";
import { ProductHotspots } from "@/components/home/product-hotspots";
import { TrustBar } from "@/components/home/trust-bar";
import { AnimatedHero } from "@/components/ui/animated-hero-section-1";
import { heroContent } from "@/content/inicio";

const PILLARS_SECTION_ID = "pilares";

// Orden de secciones definido en el brief (sección 6). La barra de anuncio,
// el header y el footer vienen del layout raíz.
export default function HomePage() {
  const { video } = heroContent;

  return (
    <main>
      <AnimatedHero
        backgroundVideoSrc={{ mp4: video.mp4 || undefined, webm: video.webm || undefined }}
        posterImageUrl={heroContent.posterImageUrl}
        title={heroContent.title}
        description={heroContent.description}
        ctaButton={heroContent.primaryCta}
        secondaryCta={heroContent.secondaryCta}
        scrollTargetId={PILLARS_SECTION_ID}
      />
      <BrandPillars id={PILLARS_SECTION_ID} />
      <FeaturedCategories />
      <FeaturedProducts />
      <MaterialsCarousel />
      <ProductHotspots />
      <LifestyleGallery />
      <BrandStory />
      <TrustBar />
      <JournalPreview />
      <CommunityInstagram />
      <NewsletterSignup />
    </main>
  );
}
