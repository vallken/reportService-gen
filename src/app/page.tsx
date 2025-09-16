// src/app/page.tsx - PDF PREVIEW ONLY VERSION
"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useFormData } from "@/hooks/useFormData";

// Components
import AppHeader from "@/components/AppHeader";
import CustomerInfoSection from "@/components/CustomerInfoSection";
import ProductDetailsSection from "@/components/ProductDetailsSection";
import ServiceDetailsSection from "@/components/ServiceDetailsSection";
import SignaturesSection from "@/components/SignatureUpload";
import PDFPreview from "@/components/PDFPreview";

export default function Home() {
  const { formData, updateField } = useFormData();

  return (
    <main>
      <AppHeader />

      <div className="container">
        <CustomerInfoSection formData={formData} updateField={updateField} />

        <ProductDetailsSection formData={formData} updateField={updateField} />

        <ServiceDetailsSection formData={formData} updateField={updateField} />

        {/* Enhanced Signatures Section */}
        <SignaturesSection formData={formData} updateField={updateField} />
        <div>
          <PDFPreview formData={formData} isVisible={true} />
        </div>
      </div>
    </main>
  );
}
