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

export default async function HomePage() {
  const [settings, featuredProject, projects, reviews, gallery] =
    await Promise.all([
      getSettings(),
      getFeaturedProject(),
      getPublishedProjects(),
      getPublishedReviews(),
      getGalleryImages(),
    ]);

  return (
    <>
      <Hero />
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
