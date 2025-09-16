import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generatePDF(elementId: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error("Element not found");

  // simpan style asli
  const originalDisplay = element.style.display;
  const originalClasses = [...element.classList];

  // pastikan terlihat + mode pdf aktif
  element.style.display = "block";
  element.classList.add("show", "pdf-mode");

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // kualitas tinggi
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff", // paksa putih solid
      logging: false,
    });

    // pakai PNG biar transparansi hilang total
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    const x = (pdfWidth - finalWidth) / 2;
    const y = 0; // mulai dari atas biar rapi

    pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);

    const filename = `report-service-${new Date()
      .toISOString()
      .split("T")[0]}.pdf`;
    pdf.save(filename);

    console.log("✅ PDF generated successfully");
  } catch (error) {
    console.error("❌ PDF generation failed:", error);
    throw error;
  } finally {
    // restore style asli
    element.style.display = originalDisplay;
    element.className = originalClasses.join(" ");
  }
}
