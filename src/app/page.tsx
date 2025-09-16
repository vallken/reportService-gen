"use client";
import React, { useState } from "react";
import { useFormData } from "@/hooks/useFormData";

// Components
import AppHeader from "@/components/AppHeader";
import CustomerInfoSection from "@/components/CustomerInfoSection";
import ProductDetailsSection from "@/components/ProductDetailsSection";
import ServiceDetailsSection from "@/components/ServiceDetailsSection";
import SignaturesSection from "@/components/SignatureUpload";
import PDFPreview from "@/components/PDFPreview";
import { PDFDownload } from "@/components/PDFDownload";

export default function Home() {
  const { formData, updateField } = useFormData();
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [finalForm, setFinalForm] = useState(null);

  const handleSubmit = () => {
    setFinalForm(formData);
    setSubmit(true);
  };

  return (
    <main>
      <AppHeader />

      <div className="container">
        <CustomerInfoSection formData={formData} updateField={updateField} />

        <ProductDetailsSection formData={formData} updateField={updateField} />

        <ServiceDetailsSection formData={formData} updateField={updateField} />

        <SignaturesSection formData={formData} updateField={updateField} />

        <div className="px-4 py-2 my-2 " style={{ marginTop: "16px" }}>
          <button className="btn-base btn-fill" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <div>
          <PDFPreview formData={formData} isVisible={true} />
        </div>

        <div>
          {isSubmit && finalForm && <PDFDownload formData={finalForm} />}
        </div>
      </div>
    </main>
  );
}
