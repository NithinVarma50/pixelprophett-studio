import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                <img src="/pxplabs-logo.jpg" alt="PXPLabs Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-heading font-medium text-sm">PXPLabs</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ideas → Systems → Screens
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium text-sm mb-4">Navigate</h4>
            <ul className="space-y-3">
              {["Home", "About", "Services"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-sm mb-4">Services</h4>
            <ul className="space-y-3">
              {["Web Dev", "Automation", "Data", "Video", "Design"].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-sm mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/919381904726"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  WhatsApp
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PXPLabs
          </p>
          <p className="text-xs text-muted-foreground">
            Nithin & Koushik
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
