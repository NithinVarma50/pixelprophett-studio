import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import ValuePoints from "@/components/home/ValuePoints";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ServicesOverview />
      <ValuePoints />
      
      {/* CTA Section */}
      <section className="section-padding border-t border-border/40">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-semibold mb-4">
              Ready to start?
            </h2>
            <p className="text-muted-foreground mb-8">
              Tell us about your project and we'll get back to you within 24 hours.
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

export default Index;
