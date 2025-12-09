import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const serviceOptions = [
  { id: "design", label: "Design", basePrice: 300 },
  { id: "video", label: "Video Editing", basePrice: 1000 },
  { id: "scraping", label: "Data Scraping", basePrice: 2000 },
  { id: "portfolio", label: "Portfolio", basePrice: 4000 },
  { id: "automation", label: "Automation", basePrice: 5000 },
  { id: "website", label: "Website", basePrice: 6000 },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [] as string[],
    budget: "",
    details: "",
  });

  const [dynamicBudgetOptions, setDynamicBudgetOptions] = useState<{ value: string; label: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const selectedServices = serviceOptions.filter(s => formData.services.includes(s.id));
    const baseTotal = selectedServices.reduce((sum, service) => sum + service.basePrice, 0);

    if (baseTotal === 0) {
      setDynamicBudgetOptions([
        { value: "300-1000", label: "₹300 – ₹1K" },
        { value: "1000-5000", label: "₹1K – ₹5K" },
        { value: "5000+", label: "₹5K+" },
      ]);
      return;
    }

    const tier1End = baseTotal * 2;
    const tier2End = baseTotal * 5;

    const formatCurrency = (amount: number) => {
      if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}K`;
      }
      return `₹${amount}`;
    };

    setDynamicBudgetOptions([
      {
        value: `${baseTotal}-${tier1End}`,
        label: `${formatCurrency(baseTotal)} – ${formatCurrency(tier1End)}`
      },
      {
        value: `${tier1End}-${tier2End}`,
        label: `${formatCurrency(tier1End)} – ${formatCurrency(tier2End)}`
      },
      {
        value: `${tier2End}+`,
        label: `${formatCurrency(tier2End)}+`
      },
    ]);
  }, [formData.services]);

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => {
      const newServices = prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId];

      return {
        ...prev,
        services: newServices,
        budget: ""
      };
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[+]?[\d\s-]{10,}$/.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return;
    }
    if (formData.services.length === 0) {
      toast({ title: "Please select at least one service", variant: "destructive" });
      return;
    }
    if (!formData.budget) {
      toast({ title: "Please select a budget range", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const servicesLabels = formData.services
        .map((s) => serviceOptions.find((opt) => opt.id === s)?.label)
        .filter(Boolean) as string[];

      const budgetText = dynamicBudgetOptions.find((b) => b.value === formData.budget)?.label || formData.budget;

      // Save to database
      const { data: orderData, error: dbError } = await supabase
        .from('orders')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          services: servicesLabels,
          budget: budgetText,
          details: formData.details.trim() || null,
        })
        .select('id')
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to save order");
      }

      // Send emails via edge function
      const { error: emailError } = await supabase.functions.invoke('send-order-emails', {
        body: {
          orderId: orderData.id,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          services: servicesLabels,
          budget: budgetText,
          details: formData.details.trim(),
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        // Don't throw - order was saved, just log the email error
      }

      // Send to WhatsApp
      const message = `New Project Inquiry
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${servicesLabels.join(", ")}
Budget: ${budgetText}
Details: ${formData.details || "Not provided"}`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://api.whatsapp.com/send?phone=919381904726&text=${encodedMessage}`, "_blank");
      
      toast({ title: "Order placed successfully! Check your email for confirmation." });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        services: [],
        budget: "",
        details: "",
      });

    } catch (error: any) {
      console.error("Submit error:", error);
      toast({ title: error.message || "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Contact</span>
            <h1 className="font-heading text-4xl lg:text-5xl font-semibold mt-4 mb-6">
              Get a quote
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your project. We'll get back within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-3">Name *</label>
                <Input
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-muted/30 border-border/50 h-12 rounded-xl"
                  disabled={isSubmitting}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-3">Email *</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-muted/30 border-border/50 h-12 rounded-xl"
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-3">Phone / WhatsApp *</label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-muted/30 border-border/50 h-12 rounded-xl"
                  disabled={isSubmitting}
                />
              </div>

              {/* Services */}
              <div>
                <label className="block text-sm font-medium mb-3">Services needed *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {serviceOptions.map((service) => (
                    <label
                      key={service.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.services.includes(service.id)
                        ? "border-foreground bg-foreground/5"
                        : "border-border/50 hover:border-border"
                        }`}
                    >
                      <Checkbox
                        checked={formData.services.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                        disabled={isSubmitting}
                      />
                      <span className="text-sm">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium mb-3">Budget range *</label>
                <div className="flex flex-wrap gap-3">
                  {dynamicBudgetOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`px-4 py-2.5 rounded-full border cursor-pointer transition-all text-sm ${formData.budget === option.value
                        ? "border-foreground bg-foreground text-background"
                        : "border-border/50 hover:border-border"
                        }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={option.value}
                        checked={formData.budget === option.value}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="sr-only"
                        disabled={isSubmitting}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 font-light">
                  * Negotiable: We can discuss the price after booking
                </p>
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-medium mb-3">Project details</label>
                <Textarea
                  placeholder="Tell us about your project..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="bg-muted/30 border-border/50 rounded-xl min-h-[120px]"
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit */}
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Placing order...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Send via WhatsApp
                  </>
                )}
              </Button>
            </motion.form>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-heading text-xl font-medium mb-6">Or reach out directly</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+919381904726"
                    className="block p-4 rounded-xl border border-border/40 hover:border-border transition-colors"
                  >
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">+91 93819 04726</p>
                  </a>
                  <a
                    href="https://wa.me/919381904726"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl border border-border/40 hover:border-border transition-colors"
                  >
                    <p className="text-sm text-muted-foreground mb-1">WhatsApp</p>
                    <p className="font-medium">Message us</p>
                  </a>

                </div>
              </div>

              <div className="p-6 rounded-xl bg-muted/30 border border-border/40">
                <p className="text-lg italic text-muted-foreground">
                  "Ideas → Systems → Screens"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
