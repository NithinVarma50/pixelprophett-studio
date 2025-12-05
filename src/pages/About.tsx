import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider">About</span>
            <h1 className="font-heading text-4xl lg:text-5xl font-semibold mt-4 mb-6">
              A compact digital studio
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              PXPLabs provides end-to-end digital presence — your identity,
              systems, and content. We turn ideas into systems and systems into screens.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding border-t border-border/40">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Team</span>
            <h2 className="font-heading text-3xl font-semibold mt-4">
              Meet us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Nithin */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl border border-border/40 bg-card/30"
            >
              <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-heading font-bold mb-6">
                N
              </div>
              <h3 className="font-heading text-xl font-medium mb-2">Nithin</h3>
              <p className="text-sm text-muted-foreground mb-6">Web Development & Automation</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Builds websites and workflow systems that save hours of manual work.
                Specializes in clean, modern interfaces and automation setups.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "n8n", "Make.com", "APIs"].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Koushik */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-2xl border border-border/40 bg-card/30"
            >
              <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-heading font-bold mb-6">
                K
              </div>
              <h3 className="font-heading text-xl font-medium mb-2">Koushik</h3>
              <p className="text-sm text-muted-foreground mb-6">Video Editing & Graphic Design</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Creates modern and aesthetic content that enhances your brand presence.
                From reels to posters, delivers premium quality.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Premiere Pro", "After Effects", "Photoshop", "Figma"].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding border-t border-border/40">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Values</span>
            <h2 className="font-heading text-3xl font-semibold mt-4">
              What sets us apart
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Personal Touch", desc: "Direct communication with the people doing the work." },
              { title: "No Middlemen", desc: "Efficient pricing without agency overheads." },
              { title: "Full-Stack Team", desc: "Code, design, video, automation — all in one place." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="font-heading font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
