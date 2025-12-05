import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const categories = ["All", "Web", "Automation", "Data", "Video", "Design"];

const projects = [
  { id: 1, category: "Web", title: "Portfolio Website", desc: "Single-page portfolio for a photographer", tools: ["React", "Tailwind"] },
  { id: 2, category: "Web", title: "E-commerce Landing", desc: "High-converting landing page", tools: ["Next.js", "Stripe"] },
  { id: 3, category: "Automation", title: "Lead Nurturing", desc: "Automated email sequences", tools: ["n8n", "Gmail"] },
  { id: 4, category: "Automation", title: "Social Scheduler", desc: "Content scheduling with AI captions", tools: ["Make.com", "OpenAI"] },
  { id: 5, category: "Data", title: "Restaurant Database", desc: "5000+ listings from Bangalore", tools: ["Python", "Excel"] },
  { id: 6, category: "Data", title: "Agency Lead List", desc: "Marketing agencies from top 10 cities", tools: ["Node.js", "CSV"] },
  { id: 7, category: "Video", title: "Product Reel", desc: "30-second promo for tech startup", tools: ["Premiere Pro"] },
  { id: 8, category: "Video", title: "Podcast Edit", desc: "Full episode with transitions", tools: ["DaVinci Resolve"] },
  { id: 9, category: "Design", title: "Event Posters", desc: "Series for music festival", tools: ["Photoshop"] },
  { id: 10, category: "Design", title: "Brand Identity", desc: "Logo and templates", tools: ["Figma"] },
];

const Work = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

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
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Work</span>
            <h1 className="font-heading text-4xl lg:text-5xl font-semibold mt-4 mb-6">
              Selected projects
            </h1>
            <p className="text-lg text-muted-foreground">
              A showcase of work across web, automation, data, video, and design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-40 bg-background/60 backdrop-blur-xl border-y border-border/40">
        <div className="container mx-auto py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  active === cat
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16">
        <div className="container mx-auto">
          <motion.div layout className="grid md:grid-cols-2 gap-6">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group p-6 rounded-2xl border border-border/40 bg-card/30 hover:border-border/80 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {project.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="font-heading text-lg font-medium mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              Want your project here?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's create something together.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Work;
