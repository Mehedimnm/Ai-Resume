"use client";

/**
 * Client-side PDF export.
 *
 * Captures a DOM element exactly as it appears (the live resume/cover-letter
 * preview) and writes it to a multi-page A4 PDF, so the downloaded file matches
 * the on-screen preview pixel-for-pixel.
 */

export async function downloadElementAsPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  // Dynamically import to keep these heavy libs out of the initial bundle and
  // avoid any SSR issues (they rely on the browser DOM).
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(element, {
    scale: 2, // crisp, high-resolution output
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    windowWidth: element.scrollWidth,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
  const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

  // Scale the captured image to the full A4 width, preserving aspect ratio.
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Add additional pages if the content is taller than one A4 page.
  while (heightLeft > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}
