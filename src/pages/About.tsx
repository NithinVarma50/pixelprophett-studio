import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Linkedin, Globe } from "lucide-react";

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

      {/* Philosophy Section */}
      <section className="section-padding border-t border-border/40">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-medium leading-relaxed">
              "We believe that great digital experiences shouldn't be complicated. They should be intuitive, efficient, and beautiful. We strip away the unnecessary to focus on what matters most: your message and your goals."
            </h2>
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

          <div className="grid md:grid-cols-3 gap-8 lg:gap-8">
            {/* Nithin */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl border border-border/40 bg-card/30"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-6 border border-border/50">
                <img src="/nithin.webp" alt="Nithin" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-xl font-medium mb-2">Nithin</h3>
              <p className="text-sm text-muted-foreground mb-6">Web Development & Automation</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Builds websites and workflow systems that save hours of manual work.
                Specializes in clean, modern interfaces and automation setups.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/nithin-varma-801227318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://pixelprophett-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
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
              <div className="w-16 h-16 rounded-full overflow-hidden mb-6 border border-border/50">
                <img src="/koushik.jpg" alt="Koushik" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-xl font-medium mb-2">Koushik</h3>
              <p className="text-sm text-muted-foreground mb-6">Video Editing & Graphic Design</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Creates modern and aesthetic content that enhances your brand presence.
                From reels to posters, delivers premium quality.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/koushik-aila-32a621385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            {/* Saiteja */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 rounded-2xl border border-border/40 bg-card/30"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-6 border border-border/50">
                <img src="/saiteja.jpg" alt="Saiteja" className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="font-heading text-xl font-medium mb-2">Saiteja</h3>
              <p className="text-sm text-muted-foreground mb-6">Mobile Editor & Short Form Editor</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Specializes in personal branding content, B-rolls, and engaging short-form edits for Instagram.
              </p>
            </motion.div>

            {/* Rajdeep */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 rounded-2xl border border-border/40 bg-card/30"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mb-6 border border-border/50">
                <img src="/rajdeep.jpg" alt="Rajdeep" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-xl font-medium mb-2">Rajdeep</h3>
              <p className="text-sm text-muted-foreground mb-6">Video Editing & Marketing Video Shoots (Bangalore & Hyderabad)</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Expert video editor with a portfolio of great projects. Handles marketing video shoots in Bangalore and Hyderabad.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/rajdeep-kanchana-4401a5321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://rawkut.carrd.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding border-t border-border/40">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Process</span>
            <h2 className="font-heading text-3xl font-semibold mt-4">
              How we work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Listen & Plan",
                desc: "We start by understanding your vision and requirements. No jargon, just clear goals."
              },
              {
                step: "02",
                title: "Build & Refine",
                desc: "We create with precision, keeping you in the loop. Iterative feedback ensures we hit the mark."
              },
              {
                step: "03",
                title: "Launch & Scale",
                desc: "We deliver a polished product ready for the world, and help you understand how to use it."
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                <span className="text-6xl font-heading font-bold text-muted/20 absolute -top-8 -left-4 -z-10">
                  {item.step}
                </span>
                <h3 className="font-heading text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
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
    </Layout >
  );
};

export default About;
