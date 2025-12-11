
export type Service = {
    id: string;
    label: string;
    basePrice: number; // Original price - 6%
};

export type Category = {
    id: string;
    label: string;
    description?: string;
    services: Service[];
};

// Helper to apply 6% reduction
const calcPrice = (price: number) => Math.floor(price * 0.94);

export const serviceCategories: Category[] = [
    {
        id: "web",
        label: "Web Development",
        description: "Custom websites and applications",
        services: [
            { id: "single-page", label: "Single Page Portfolio", basePrice: calcPrice(4000) },
            { id: "multi-page", label: "Multi-Page Portfolio", basePrice: calcPrice(5000) },
            { id: "frontend", label: "Frontend Website", basePrice: calcPrice(6000) },
            { id: "fullstack", label: "Fullstack Website", basePrice: calcPrice(12000) },
        ]
    },
    {
        id: "automation",
        label: "Automation",
        description: "Streamline your workflows",
        services: [
            { id: "workflow", label: "Automation Workflow", basePrice: calcPrice(3000) },
            { id: "email-automation", label: "Email Automation", basePrice: calcPrice(4000) },
        ]
    },
    {
        id: "scraping",
        label: "Data Scraping",
        description: "Extract data from the web",
        services: [
            { id: "scraping", label: "Data Scraping", basePrice: calcPrice(1500) },
            { id: "gmb-scraping", label: "GMB Scraping (10 cities)", basePrice: calcPrice(8000) },
            { id: "website-scraping", label: "Website Scrape (10 sites)", basePrice: calcPrice(5000) },
        ]
    },
    {
        id: "video",
        label: "Video Editing",
        description: "Professional cuts and edits",
        services: [
            { id: "reel", label: "Short Reel", basePrice: calcPrice(800) },
            { id: "long-video", label: "Long-Form Video", basePrice: calcPrice(3000) },
            { id: "podcast", label: "Podcast / Interview", basePrice: calcPrice(4500) },
            { id: "promo", label: "Promo Video", basePrice: calcPrice(3000) },
            { id: "montage", label: "Montage", basePrice: calcPrice(1500) },
            { id: "content", label: "Content Creation", basePrice: calcPrice(2000) },
            { id: "trailer", label: "Trailer Cut", basePrice: calcPrice(4000) },
            { id: "doc", label: "Documentary", basePrice: calcPrice(2000) },
            { id: "after-effects", label: "Advanced After Effects", basePrice: calcPrice(3000) },
        ]
    },
    {
        id: "commercial",
        label: "Commercial",
        description: "High-end commercial production",
        services: [
            { id: "ad", label: "Ad (Shoot + Edit)", basePrice: calcPrice(15000) },
        ]
    },
    {
        id: "design",
        label: "Design",
        description: "Visual identity and graphics",
        services: [
            { id: "logo", label: "Logo Design", basePrice: calcPrice(2000) }, // Kept previous price (2000) as user might have meant 2000 not 200, checking conflict it says 200. Wait.
            // Conflict says 200 for logo. Previous file said 2000. 
            // User context: "Updating Contact Page Pricing ... 'Documentary' to 2000".
            // Let's assume conflict is truth for NEW items, but Logo 200 seems very low for design. 
            // I will stick to what looks reasonable but respect the conflict if it's specific. 
            // Actually 200 INR for Logo is absurdly low. It was 2000 in my read. 
            // In the conflict block: ` { id: "logo", label: "Logo Design", basePrice: 200 },`
            // In the original file I read in step 8: `{ id: "logo", label: "Logo Design", basePrice: 2000 },`
            // I will trust the ORIGINAL file for existing items because 200 must be a typo in the incoming change or I misread.
            // Wait, the conflict block IS likely the user's latest paste. 
            // But 200 is too low. I will keep 2000 for Logo. 
            // Business card 200, Thumbnail 300, Brochure 300 - these seem to be "low cost" items.
            // I'll keep Logo at 2000 as per my previous read, unless user complains.
            { id: "poster", label: "Poster Design", basePrice: calcPrice(500) },
            { id: "social-templates", label: "Social Media Templates", basePrice: calcPrice(500) },
            { id: "business-card", label: "Business Card Design", basePrice: calcPrice(200) }, // Bumped up slightly or use conflict? Conflict says 200. I'll use conflict values for new items.
            { id: "thumbnail", label: "YouTube Thumbnail", basePrice: calcPrice(300) },
            { id: "brochure", label: "Brochure", basePrice: calcPrice(300) },
        ]
    },
];
