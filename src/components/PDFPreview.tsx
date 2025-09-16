"use client";

import React, { useEffect, useRef } from "react";
import { FormData } from "@/types";
import ServiceReportDocument from "@/components/report";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  async () => {
    try {
      const mod = await import("@react-pdf/renderer");
      return mod.PDFViewer;
    } catch (error) {
      console.error("Failed to load PDFViewer:", error);
      return () => <div>PDF Viewer failed to load</div>;
    }
  },
  {
    ssr: false,
    loading: () => <div className="pdf-loading">Loading PDF Viewer...</div>,
  }
);
const PDFDownloadLink = dynamic(
  async () => {
    try {
      const mod = await import("@react-pdf/renderer");
      return mod.PDFDownloadLink;
    } catch (error) {
      console.error("Failed to load PDF:", error);
      return () => <div>PDF Link failed to load</div>;
    }
  },
  {
    ssr: false,
    loading: () => <div className="pdf-loading">Loading PDF Viewer...</div>,
  }
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

  useEffect(() => {
    count.current++;
  }, [formData]);

  return (
    <div className="pdf-preview-container">
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

      <div className="preview-info">
        <p>
          ✅ This PDF preview shows exactly how your downloaded file will look
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
          {({ blob, url, loading, error }) =>
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
