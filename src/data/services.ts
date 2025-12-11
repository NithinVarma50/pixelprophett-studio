
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

// Helper to apply 6% reduction and round to nearest 10 or 100 for cleanliness if needed
// For now, simple Math.floor(price * 0.94)
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
            { id: "fullstack", label: "Fullstack App", basePrice: calcPrice(12000) },
        ]
    },
    {
        id: "automation",
        label: "Automation",
        description: "Streamline your workflows",
        services: [
            { id: "workflow", label: "Workflow Automation", basePrice: calcPrice(3000) },
            { id: "scraping", label: "Data Scraping", basePrice: calcPrice(1500) },
        ]
    },
    {
        id: "video",
        label: "Video Editing",
        description: "Professional cuts and edits",
        services: [
            { id: "reel", label: "Short Reel", basePrice: calcPrice(800) },
            { id: "long-video", label: "Long-Form Video", basePrice: calcPrice(3000) },
            { id: "montage", label: "Montage", basePrice: calcPrice(1500) },
            { id: "content", label: "Content Creation", basePrice: calcPrice(2000) },
            { id: "ad", label: "Ad (Shoot + Edit)", basePrice: calcPrice(15000) },
            { id: "trailer", label: "Trailer Cut", basePrice: calcPrice(4000) },
            { id: "doc", label: "Documentary", basePrice: calcPrice(2000) },
        ]
    },
    {
        id: "design",
        label: "Design",
        description: "Visual identity and graphics",
        services: [
            { id: "graphic", label: "Graphic Design", basePrice: calcPrice(500) },
            { id: "logo", label: "Logo Design", basePrice: calcPrice(2000) },
        ]
    },
];
