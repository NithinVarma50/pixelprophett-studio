import Layout from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, Download, ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { serviceCategories, Category } from "@/data/services";
import { generateBillPDF } from "@/utils/generateBill";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    details: "",
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Derived State
  const selectedServices = useMemo(() => {
    const allServices = serviceCategories.flatMap((c) => c.services);
    return allServices.filter((s) => selectedServiceIds.includes(s.id));
  }, [selectedServiceIds]);

  const pricing = useMemo(() => {
    const totalBase = selectedServices.reduce((sum, s) => sum + s.basePrice, 0);
    const count = selectedServices.length;
    let discountPercent = 0;

    if (count > 5) discountPercent = 0.30;
    else if (count > 2) discountPercent = 0.06;

    const discountAmount = totalBase * discountPercent;
    const finalPrice = totalBase - discountAmount;

    return {
      totalBase,
      discountPercent,
      discountAmount,
      finalPrice
    };
  }, [selectedServices]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleDownloadPDF = () => {
    if (selectedServices.length === 0) {
      toast({ title: "Please select services first", variant: "destructive" });
      return;
    }
    generateBillPDF({
      customerName: formData.name,
      selectedServices,
      totalBasePrice: pricing.totalBase,
      discountAmount: pricing.discountAmount,
      finalPrice: pricing.finalPrice,
      discountLabel: `${(pricing.discountPercent * 100).toFixed(0)}% Discount`
    });
    toast({ title: "Bill Downloaded" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.contact.trim() || selectedServiceIds.length === 0) {
      toast({ title: "Please fill required fields & select services", variant: "destructive" });
      return;
    }

    // Group selected services by category
    const servicesByCategory = serviceCategories
      .map((cat) => {
        const catServices = cat.services.filter((s) => selectedServiceIds.includes(s.id));
        return { category: cat.label, services: catServices };
      })
      .filter((group) => group.services.length > 0);

    // Build formatted services text
    const servicesText = servicesByCategory
      .map((group) => {
        const serviceList = group.services.map((s) => `  • ${s.label} — ₹${s.basePrice.toLocaleString()}`).join("\n");
        return `*${group.category}*\n${serviceList}`;
      })
      .join("\n\n");

    const discountText = pricing.discountPercent > 0 
      ? `\nDiscount (${(pricing.discountPercent * 100).toFixed(0)}%): -₹${pricing.discountAmount.toLocaleString()}`
      : "";

    const message = `━━━━━━━━━━━━━━━━━━━━
*🚀 NEW PROJECT INQUIRY*
━━━━━━━━━━━━━━━━━━━━

*📋 Client Details*
Name: ${formData.name}
Contact: ${formData.contact}

*📦 Services Selected*
${servicesText}

━━━━━━━━━━━━━━━━━━━━
*💰 Pricing Summary*
Subtotal: ₹${pricing.totalBase.toLocaleString()}${discountText}
*Total: ₹${pricing.finalPrice.toLocaleString()}*
━━━━━━━━━━━━━━━━━━━━

*📝 Project Details*
${formData.details || "Not provided"}

━━━━━━━━━━━━━━━━━━━━`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=919381904726&text=${encodedMessage}`, "_blank");
    toast({ title: "Redirecting to WhatsApp" });
  };

  return (
    <Layout>
      <section className="section-padding min-h-screen bg-background relative pb-32 lg:pb-0">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mb-12"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Contact</span>
            <h1 className="font-heading text-4xl lg:text-5xl font-semibold mt-4 mb-4">
              Build your package
            </h1>
            <p className="text-lg text-muted-foreground">
              Select services to create a custom plan. Discounts apply for bundlers.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-24 relative">
            {/* Left Column: Form & Selection */}
            <div className="lg:col-span-2 space-y-12">

              {/* Personal Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-muted/30 h-12 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact (Phone/Email) *</label>
                  <Input
                    placeholder="Reach out via..."
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="bg-muted/30 h-12 rounded-xl"
                  />
                </div>
              </div>

              {/* Service Selection Area */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {!selectedCategory ? (
                    <motion.div
                      key="categories"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-lg font-medium mb-4">Select a Category</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {serviceCategories.map((cat) => (
                          <div
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat)}
                            className="p-6 rounded-2xl border border-border/40 hover:border-foreground/50 transition-all cursor-pointer bg-card group"
                          >
                            <h4 className="font-heading text-xl mb-2 group-hover:text-primary transition-colors">
                              {cat.label}
                            </h4>
                            <p className="text-sm text-muted-foreground">{cat.description}</p>
                            <div className="mt-4 flex gap-2 flex-wrap">
                              {cat.services.slice(0, 3).map(s => (
                                <Badge key={s.id} variant="secondary" className="text-[10px] pointer-events-none">
                                  {s.label}
                                </Badge>
                              ))}
                              {cat.services.length > 3 && (
                                <Badge variant="secondary" className="text-[10px] pointer-events-none">+{cat.services.length - 3}</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="services"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCategory(null)}
                          className="-ml-2"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Categories
                        </Button>
                        <h3 className="text-xl font-heading font-medium">{selectedCategory.label}</h3>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {selectedCategory.services.map((service) => (
                          <label
                            key={service.id}
                            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedServiceIds.includes(service.id)
                              ? "border-primary bg-primary/5"
                              : "border-border/40 hover:border-border"
                              }`}
                          >
                            <Checkbox
                              checked={selectedServiceIds.includes(service.id)}
                              onCheckedChange={() => handleServiceToggle(service.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <span className="text-sm font-medium block">{service.label}</span>
                              <span className="text-xs text-muted-foreground">Rs. {service.basePrice.toLocaleString()}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-sm font-medium mb-3">Project Details (Optional)</label>
                <Textarea
                  placeholder="Any specific requirements?"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="bg-muted/30 border-border/50 rounded-xl min-h-[100px]"
                />
              </div>

            </div>

            {/* Right Column: Cart / Summary (Desktop Sticky) */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm">
                  <h3 className="font-heading text-xl mb-6">Your Selection</h3>

                  {selectedServices.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground text-sm">
                      <ShoppingBag className="w-8 h-8 mx-auto mb-3 opacity-20" />
                      No services selected
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {selectedServices.map(s => (
                          <div key={s.id} className="flex justify-between text-sm">
                            <span>{s.label}</span>
                            <span className="text-muted-foreground">₹{s.basePrice.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <div className="h-px bg-border my-4" />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Subtotal</span>
                          <span>₹{pricing.totalBase.toLocaleString()}</span>
                        </div>
                        {pricing.discountAmount > 0 && (
                          <div className="flex justify-between text-green-500">
                            <span>Discount ({(pricing.discountPercent * 100).toFixed(0)}%)</span>
                            <span>- ₹{pricing.discountAmount.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-medium text-lg pt-2">
                          <span>Total</span>
                          <span>₹{pricing.finalPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Discount Badges */}
                      <div className="pt-2">
                        <div className={`text-xs px-2 py-1 rounded bg-muted/50 mb-1 ${pricing.discountPercent >= 0.06 ? 'text-green-500 bg-green-500/10' : 'text-muted-foreground opacity-50'}`}>
                          • Select 3+ services for 6% OFF
                        </div>
                        <div className={`text-xs px-2 py-1 rounded bg-muted/50 ${pricing.discountPercent >= 0.30 ? 'text-green-500 bg-green-500/10' : 'text-muted-foreground opacity-50'}`}>
                          • Select 6+ services for 30% OFF
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-3">
                    <Button onClick={handleSubmit} className="w-full" size="lg">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Book via WhatsApp
                    </Button>
                    <Button onClick={handleDownloadPDF} variant="outline" className="w-full" disabled={selectedServices.length === 0}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Booking PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cart Sheet / Bottom Bar */}
        <div className="lg:hidden fixed bottom-4 right-4 left-4 z-50">
          {selectedServices.length > 0 && (
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button size="lg" className="w-full shadow-xl">
                  View Cart ({selectedServices.length}) • ₹{pricing.finalPrice.toLocaleString()}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle>Your Selection</SheetTitle>
                </SheetHeader>

                <div className="space-y-6">
                  <div className="space-y-3">
                    {selectedServices.map(s => (
                      <div key={s.id} className="flex justify-between text-sm">
                        <span>{s.label}</span>
                        <span>₹{s.basePrice.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-border" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{pricing.totalBase.toLocaleString()}</span>
                    </div>
                    {pricing.discountAmount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Discount ({(pricing.discountPercent * 100).toFixed(0)}%)</span>
                        <span>- ₹{pricing.discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium text-lg pt-2">
                      <span>Total</span>
                      <span>₹{pricing.finalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button onClick={handleSubmit} className="w-full" size="lg">
                      Book via WhatsApp
                    </Button>
                    <Button onClick={handleDownloadPDF} variant="outline" className="w-full">
                      Download Booking PDF
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>

      </section>
    </Layout>
  );
};

export default Contact;
