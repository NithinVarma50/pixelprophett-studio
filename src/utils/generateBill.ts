import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Service } from "@/data/services";

interface BillDetails {
    customerName: string;
    selectedServices: Service[];
    totalBasePrice: number;
    discountAmount: number;
    finalPrice: number;
    discountLabel: string; // e.g., "6% Discount"
}

export const generateBillPDF = (details: BillDetails) => {
    const doc = new jsPDF();

    // Add Branding (Simple Text for now, can be replaced with Image)
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("PXPLabs Studio", 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("Bill / Quotation", 14, 28);

    // Date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Date: ${date}`, 160, 20);

    // Customer Info
    doc.text(`Customer: ${details.customerName || "Guest"}`, 14, 40);

    // Table Data
    const tableBody = details.selectedServices.map(service => [
        service.label,
        `Rs. ${service.basePrice.toLocaleString()}`
    ]);

    // Add Summary Rows
    tableBody.push(["", ""]); // Spacer
    tableBody.push(["Subtotal", `Rs. ${details.totalBasePrice.toLocaleString()}`]);
    if (details.discountAmount > 0) {
        tableBody.push([`${details.discountLabel} Applied`, `- Rs. ${details.discountAmount.toLocaleString()}`]);
    }
    tableBody.push(["Total Estimate", `Rs. ${details.finalPrice.toLocaleString()}`]);

    // Generate Table
    autoTable(doc, {
        startY: 50,
        head: [["Service", "Price"]],
        body: tableBody,
        theme: "grid",
        headStyles: { fillColor: [20, 20, 20], textColor: 255 },
        columnStyles: {
            0: { cellWidth: 120 },
            1: { cellWidth: 50, halign: "right" },
        },
        styles: { font: "helvetica", fontSize: 10 },
        footStyles: { fillColor: [240, 240, 240], textColor: 0, fontStyle: "bold" },
    });

    // Footer notes
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("* This is an estimated quote based on your selection.", 14, finalY + 10);
    doc.text("* Final pricing may vary based on specific project requirements.", 14, finalY + 15);

    // Save
    doc.save("PXPLabs-Quote.pdf");
};
