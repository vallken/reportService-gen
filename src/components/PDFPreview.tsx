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

const PDFDownloadLink = dynamic(
  async () => {
    const mod = await import("@react-pdf/renderer");
    return mod.PDFDownloadLink;
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

    // Deteksi layar <= 768px dianggap mobile
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [formData]);

  return (
    <div className="pdf-preview-container">
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

      <div className="preview-info">
        <p>
          ✅ This PDF{" "}
          {isMobile
            ? "can be downloaded"
            : "preview shows exactly how your downloaded file will look"}
        </p>
      </div>

      <div className="preview-actions" style={{ marginTop: "16px" }}>
        <PDFDownloadLink
          document={
            <ServiceReportDocument
              data={formData}
              supplierSignature={supplierSignature}
              customerSignature={customerSignature}
            />
          }
          key={count.current}
          fileName={`ServiceReport_${formData.date || "Customer"}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <button disabled style={{ padding: "10px 16px" }}>
                ⏳ Preparing PDF...
              </button>
            ) : (
              <button
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                ⬇️ Download PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PDFPreview;
