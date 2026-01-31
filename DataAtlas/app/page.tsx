import { LandingHeader } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { ProblemSection } from '@/components/landing/problem-section';
import { SolutionSection } from '@/components/landing/solution-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { TechStackSection } from '@/components/landing/tech-stack-section';
import { ArchitectureSection } from '@/components/landing/architecture-section';
import { Footer } from '@/components/landing/footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <TechStackSection />
        <ArchitectureSection />
      </main>
      <Footer />
    </div>
  );
}
