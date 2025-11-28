"use client";

import { Button } from "@/components/ui/button";
import { IconDownload, IconPrinter } from "@tabler/icons-react";
import { useState } from "react";

export function CVDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      // Dynamically import the libraries to reduce initial bundle size
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      // Get the main content element
      const element = document.querySelector("main");
      if (!element) {
        console.error("Main element not found");
        return;
      }

      // Add temporary class for PDF generation styling
      element.classList.add("pdf-export");
      document.body.classList.add("pdf-export-body");

      // Wait for any layout changes
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Create canvas from HTML with optimized settings
      const canvas = await html2canvas(element, {
        scale: 2.5, // Higher quality for crisp text
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 1200, // Fixed width for consistent layout
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector("main");
          if (clonedElement) {
            // Apply PDF-specific styles to cloned element
            clonedElement.style.maxWidth = "1200px";
            clonedElement.style.margin = "0 auto";
            clonedElement.style.padding = "60px 80px";
          }
        },
      });

      // Remove temporary class
      element.classList.remove("pdf-export");
      document.body.classList.remove("pdf-export-body");

      const imgData = canvas.toDataURL("image/png", 1.0);

      // Calculate PDF dimensions (A4)
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const imgWidth = pdfWidth - 20; // Leave margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      let heightLeft = imgHeight;
      let position = 10; // Top margin

      // Add first page
      pdf.addImage(
        imgData,
        "PNG",
        10,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pdfHeight - 20; // Account for margins

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          10,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pdfHeight - 20;
      }

      // Save the PDF
      pdf.save("Federico_Fanini_CV.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex gap-3 print:hidden pdf-export:hidden">
      <Button
        onClick={handlePrint}
        size="lg"
        variant="outline"
        className="shadow-lg hover:shadow-xl transition-all gap-2"
      >
        <IconPrinter className="size-5" />
        Print
      </Button>
      <Button
        onClick={handleDownloadPDF}
        size="lg"
        className="shadow-lg hover:shadow-xl transition-all gap-2"
        disabled={isGenerating}
      >
        <IconDownload className="size-5" />
        {isGenerating ? "Generating..." : "Download PDF"}
      </Button>
    </div>
  );
}
