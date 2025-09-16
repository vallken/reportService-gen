import dynamic from "next/dynamic";
import { FormData } from "@/types";
import ServiceReportDocument from "./report";
import { useEffect, useRef, useState } from "react";

const PDFDownloadLink = dynamic(
  async () => {
    const mod = await import("@react-pdf/renderer");
    return mod.PDFDownloadLink;
  },
  { ssr: false }
);

interface PDFDownloadProps {
  formData: FormData;
  supplierSignature?: string;
  customerSignature?: string;
}

export const PDFDownload: React.FC<PDFDownloadProps> = ({ formData }) => {
  console.log(formData);
  const count = useRef(0);

  const [isMobile, setIsMobile] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

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

    // ✅ Generate PDF saat formData berubah
    const generatePdfUrl = async () => {
      try {
        const { pdf } = await import("@react-pdf/renderer");
        const blob = await pdf(
          <ServiceReportDocument data={formData} />
        ).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Gagal membuat preview PDF. Silakan coba download langsung.");
      }
    };

    generatePdfUrl();

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [formData]);

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div>
      {isMobile && (
        <div>
          <div className="preview-header">
            <h3>📄PDF Preview</h3>
          </div>

          {pdfUrl && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ position: "relative", marginBottom: "8px" }}></div>

              <button
                onClick={() => window.open(pdfUrl, "_blank")}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#17a2b8",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  width: "100%",
                  marginBottom: "8px",
                }}
              >
                🔗 Open PDF in New Tab
              </button>
            </div>
          )}
        </div>
      )}

      {/* Info Section */}
      <div className="preview-info">
        <p>
          ✅{" "}
          {isMobile
            ? "PDF optimized"
            : "This PDF preview shows exactly how your downloaded file will look"}
        </p>
      </div>
      <div className="preview-actions" style={{ marginTop: "16px" }}>
        <PDFDownloadLink
          document={<ServiceReportDocument data={formData} />}
          key={count.current}
          fileName={`ServiceReport_${formData.date || "Customer"}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <button
                disabled
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                ⏳ Preparing PDF...
              </button>
            ) : (
              <button
                style={{
                  padding: "12px 20px",
                  backgroundColor: "#0070f3",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  width: isMobile ? "100%" : "auto",
                  fontSize: isMobile ? "16px" : "14px",
                }}
              >
                ⬇️ Download PDF
              </button>
            )
          }
        </PDFDownloadLink>
        {isMobile && (
          <p
            style={{
              fontSize: "12px",
              color: "#666",
              marginTop: "8px",
              textAlign: "center",
            }}
          >
            💡 PDF will open in your device's default PDF viewer
          </p>
        )}
      </div>
    </div>
  );
};
