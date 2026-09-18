import { Hero } from "@/components/home/hero";
import { HeroFeatures } from "@/components/home/hero-features";
import { FeaturedProject } from "@/components/home/featured-project";
import { AboutSection } from "@/components/home/about-section";
import { ServicesSection } from "@/components/home/services-section";
import { ProjectsPreview } from "@/components/home/projects-preview";
import { WhyUsSection } from "@/components/home/why-us-section";
import { GallerySection } from "@/components/home/gallery-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { ContactSection } from "@/components/home/contact-section";
import {
  getFeaturedProject,
  getGalleryImages,
  getPublishedProjects,
  getPublishedReviews,
  getSettings,
} from "@/lib/data/public";
import { getLocale } from "@/i18n/get-locale";

export default async function HomePage() {
  const [settings, featuredProject, projects, reviews, gallery, locale] =
    await Promise.all([
      getSettings(),
      getFeaturedProject(),
      getPublishedProjects(),
      getPublishedReviews(),
      getGalleryImages(),
      getLocale(),
    ]);

  const stats = {
    projects: projects.length,
    apartments: projects.reduce((sum, p) => sum + (p.apartments_count ?? 0), 0),
    villas: projects.reduce((sum, p) => sum + (p.villas_count ?? 0), 0),
  };

  const heroImage =
    gallery.find((img) => img.url.includes("c8b24e81"))?.url ??
    featuredProject?.cover_image_url ??
    null;

  return (
    <>
      <Hero
        stats={stats}
        heroImageUrl={heroImage}
        location={featuredProject?.location}
        locale={locale}
      />
      <HeroFeatures />
      <FeaturedProject project={featuredProject} />
      <AboutSection settings={settings} />
      <ServicesSection />
      <ProjectsPreview projects={projects} />
      <WhyUsSection />
      <GallerySection images={gallery} />
      <ReviewsSection reviews={reviews} />
      <ContactSection settings={settings} projects={projects} />
    </>
  );
}
