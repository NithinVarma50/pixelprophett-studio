import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const webServices = [
  { service: "Single Page Portfolio", price: "₹4,000+" },
  { service: "Multi-Page Portfolio", price: "₹5,000+" },
  { service: "Frontend Website", price: "₹6,000+" },
  { service: "Fullstack Website", price: "₹12,000+" },
  { service: "New Page Addition", price: "₹1,500+" },
  { service: "UI / Content Changes", price: "₹500 – ₹1,500" },
];

const automationServices = [
  { service: "Single Automation Workflow", price: "₹3,000+" },
  { service: "Email Automation Setup", price: "₹4,000+" },
];

const scrapingServices = [
  { service: "Data Scraping (per city)", price: "₹1,500+" },
  { service: "Restaurant data extraction", price: "₹1,500+" },
];

const videoServices = [
  { service: "Short Reels (15–30 sec)", price: "₹800+" },
  { service: "Long-Form Video", price: "₹3,000+" },
  { service: "Podcast / Interview", price: "₹4,500+" },
  { service: "Promo Video", price: "₹3,000 – ₹6,000" },
  { service: "Portfolio Intro", price: "₹3,500+" },
  { service: "Montage", price: "₹1,500+" },
  { service: "Content Creation", price: "₹2,000+" },
];

const commercialServices = [
  { service: "Advertisements (Shoot + Edit)", price: "₹15,000+" },
  { service: "Trailer Cuts", price: "₹4,000+" },
  { service: "Documentary", price: "₹2,000+" },
  { service: "Advanced After Effects", price: "₹3,000+" },
];

const designServices = [
  { service: "Poster Design", price: "₹500 – ₹1,200" },
  { service: "Social Media Templates", price: "₹500+" },
  { service: "Logo Design", price: "₹2,000+" },
  { service: "Business Card", price: "₹800+" },
  { service: "YouTube Thumbnail", price: "₹300+" },
  { service: "Brochure", price: "₹1,500+" },
];

interface ServiceSectionProps {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  services: { service: string; price: string }[];
  note?: string;
}

const ServiceSection = ({ id, number, title, subtitle, services, note }: ServiceSectionProps) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="py-16 border-t border-border/40"
  >
    <div className="flex items-start gap-8 mb-8">
      <span className="text-xs text-muted-foreground font-mono">{number}</span>
      <div>
        <h2 className="font-heading text-2xl font-medium">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
    </div>

    <div className="ml-12 lg:ml-16">
      <div className="space-y-0">
        {services.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b border-border/30"
          >
            <span className="text-muted-foreground">{item.service}</span>
            <span className="font-medium">{item.price}</span>
          </div>
        ))}
      </div>
      {note && (
        <p className="mt-6 text-sm text-muted-foreground">{note}</p>
      )}
    </div>
  </motion.section>
);

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Services</span>
            <h1 className="font-heading text-4xl lg:text-5xl font-semibold mt-4 mb-6">
              Transparent pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              All prices are starting points — final cost depends on project scope and complexity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <div className="container mx-auto pb-24">
        <ServiceSection
          id="web"
          number="01"
          title="Web Development"
          services={webServices}
        />
        <ServiceSection
          id="automation"
          number="02"
          title="Automation & Workflows"
          services={automationServices}
          note="Tools: n8n, Make.com, OpenAI, Notion, Google Sheets, APIs"
        />
        <ServiceSection
          id="scraping"
          number="03"
          title="Data Scraping"
          services={scrapingServices}
          note="Includes: Business name, email, phone, location, website, social links, ratings. Export: CSV/Excel"
        />
        <ServiceSection
          id="video"
          number="04"
          title="Video Editing"

          services={videoServices}
        />
        <ServiceSection
          id="commercial"
          number="05"
          title="Commercial & Documentary"
          services={commercialServices}
        />
        <ServiceSection
          id="design"
          number="06"
          title="Graphic Design"

          services={designServices}
        />
      </div>

      {/* CTA */}
      <section className="section-padding border-t border-border/40">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="font-heading text-3xl font-semibold mb-4">
              Ready to start?
            </h2>
            <p className="text-muted-foreground mb-8">
              Get a custom quote for your project.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
