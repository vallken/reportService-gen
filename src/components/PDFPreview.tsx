"use client";
import React, { useEffect, useRef, useState } from "react";
import { FormData } from "@/types";
import ServiceReportDocument from "@/components/report";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  async () => {
    const mod = await import("@react-pdf/renderer");
    return mod.PDFViewer;
  },
  { ssr: false }
);

interface PDFPreviewProps {
  formData: FormData;
  supplierSignature?: string;
  customerSignature?: string;
  isVisible: boolean;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({
  formData,
  supplierSignature,
  customerSignature,
  isVisible,
}) => {
  if (!isVisible) return null;

  const count = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    count.current++;

    const checkMobile = () => {
      const isMobileWidth = window.innerWidth <= 768;
      const isMobileUserAgent =
        /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileWidth || isMobileUserAgent);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [formData]);

  // Cleanup URL saat component unmount

  return (
    <div className="pdf-preview-container">
      {/* Desktop PDF Viewer */}
      {!isMobile && (
        <div>
          <div className="preview-header">
            <h3>📄 PDF Preview (Exact Output)</h3>
          </div>

          <div className="pdf-viewer">
            <PDFViewer
              style={{
                width: "100%",
                height: "800px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
              key={count.current}
            >
              <ServiceReportDocument
                data={formData}
                supplierSignature={supplierSignature}
                customerSignature={customerSignature}
              />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFPreview;
