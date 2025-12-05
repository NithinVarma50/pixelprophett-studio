import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StackedImageHover } from "@/components/ui/hover-deck-fx";
import { ScrollingHeroMarquee } from "@/components/ui/scrolling-hero-marquee";

const Hero = () => {
  return (
    <section className="min-h-[85vh] flex items-center relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                <span className="w-8 h-px bg-muted-foreground/50" />
                Digital Studio
              </span>
            </motion.div>

            {/* Headline */}
            {/* Headline */}
            <div className="mb-6 lg:-ml-4">
              <ScrollingHeroMarquee
                text="We build websites, automations, and content that actually work."
                fontSize="clamp(1.5rem, 4vw, 3.75rem)"
                rowHeight={100}
                durationSec={20}
                bottomRotateXDeg={-10}
                bottomSkewXDeg={10}
              />
            </div>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
            >
              A two-person studio by Nithin & Koushik — delivering clean interfaces,
              time-saving workflows, and modern content for creators, startups, and agencies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

            </motion.div>

            {/* Services tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 flex flex-wrap gap-3"
            >
              {["Web Development", "Automation", "Data Scraping", "Video Editing", "Design"].map((service) => (
                <span
                  key={service}
                  className="px-3 py-1.5 text-xs text-muted-foreground border border-border/50 rounded-full"
                >
                  {service}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Hero Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mt-20 lg:mt-0 w-full flex justify-center lg:block origin-center lg:origin-left"
          >
            <StackedImageHover
              className="!w-[280px] !h-[115px] sm:!w-[500px] sm:!h-[220px] lg:!w-[640px] lg:!h-[260px]"
              images={[
                "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg"
              ]}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
