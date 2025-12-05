import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Web Development",
    description: "Clean, modern websites from portfolios to full-stack applications.",
    link: "/services#web",
  },
  {
    number: "02",
    title: "Automation",
    description: "Workflow systems that eliminate repetitive tasks and save hours.",
    link: "/services#automation",
  },
  {
    number: "03",
    title: "Data Scraping",
    description: "City or niche-based data extraction for lead generation.",
    link: "/services#scraping",
  },
  {
    number: "04",
    title: "Video Editing",
    description: "Premium editing for reels, podcasts, and promotional content.",
    link: "/services#video",
  },
  {
    number: "05",
    title: "Graphic Design",
    description: "Modern posters, thumbnails, logos, and brand assets.",
    link: "/services#design",
  },
];

const ServicesOverview = () => {
  return (
    <section className="section-padding border-t border-border/40">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Services</span>
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold mt-4">
            What we do
          </h2>
        </motion.div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                to={service.link}
                className="group flex items-start justify-between py-8 border-t border-border/40 hover:bg-muted/30 -mx-2 px-2 sm:-mx-6 sm:px-6 transition-colors"
              >
                <div className="flex items-start gap-8">
                  <span className="text-xs text-muted-foreground font-mono pt-1">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-medium mb-2 group-hover:text-foreground transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
