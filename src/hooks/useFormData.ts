import { getTodayDate } from "../utils/dateFormatter";
import { useState, useCallback } from "react";
import { FormData } from "../types";

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    to: "",
    address: "",
    phone: "",
    date: getTodayDate(),
    part: "",
    qty: "",
    problem: "",
    components: "",
    trial: "",
    supplier: "",
    customer: "",
    supplierSignature: "",
    customerSignature: "",
  });

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      to: "",
      address: "",
      phone: "",
      date: getTodayDate(),
      part: "",
      qty: "",
      problem: "",
      components: "",
      trial: "",
      supplier: "",
      customer: "",
      supplierSignature: "",
      customerSignature: "",
    });
  }, []);

  return {
    formData,
    updateField,
    resetForm,
  };
};
