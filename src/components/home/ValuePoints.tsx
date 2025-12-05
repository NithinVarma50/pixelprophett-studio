import { motion } from "framer-motion";

const valuePoints = [
  { title: "Fast Delivery", description: "Quick turnarounds without compromising quality" },
  { title: "Clean Design", description: "Modern interfaces with intentional animations" },
  { title: "Automation", description: "Systems that reduce manual work" },
  { title: "Affordable", description: "Pay for what you need, scale as you grow" },
];

const ValuePoints = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {valuePoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h3 className="font-heading font-medium mb-2">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePoints;
