import React from "react";
import { FormData } from "@/types";

interface SignaturesSectionProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

const SignaturesSection: React.FC<SignaturesSectionProps> = ({
  formData,
  updateField,
}) => {
  // Fungsi untuk handle upload file dan convert ke DataURL
  const handleFileUpload = (field: keyof FormData, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateField(field, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <span className="section-icon">✍️</span>
        Signatures
      </div>

      {/* Supplier */}
      <div className="form-group">
        <label>Supplier Name</label>
        <input
          value={formData.supplier}
          onChange={(e) => updateField("supplier", e.target.value)}
          placeholder="Nama supplier"
        />
      </div>
      <div className="form-group">
        <label>Upload Tanda Tangan Supplier</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleFileUpload(
              "supplierSignature",
              e.target.files ? e.target.files[0] : null
            )
          }
        />
        {formData.supplierSignature && (
          <img
            src={formData.supplierSignature}
            alt="Supplier Signature"
            style={{ width: "200px", marginTop: "10px" }}
          />
        )}
      </div>

      {/* Customer */}
      <div className="form-group">
        <label>Customer Name</label>
        <input
          value={formData.customer}
          onChange={(e) => updateField("customer", e.target.value)}
          placeholder="Nama customer"
        />
      </div>
      <div className="form-group">
        <label>Upload Tanda Tangan Customer</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleFileUpload(
              "customerSignature",
              e.target.files ? e.target.files[0] : null
            )
          }
        />
        {formData.customerSignature && (
          <img
            src={formData.customerSignature}
            alt="Customer Signature"
            style={{ width: "200px", marginTop: "10px" }}
          />
        )}
      </div>
    </div>
  );
};

export default SignaturesSection;
