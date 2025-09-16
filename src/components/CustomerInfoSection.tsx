import React from "react";
import { FormData } from "../types";

interface CustomerInfoSectionProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

const CustomerInfoSection: React.FC<CustomerInfoSectionProps> = ({
  formData,
  updateField,
}) => {
  return (
    <div className="form-section">
      <div className="section-header">
        <span className="section-icon">👥</span>
        Customer Information
      </div>

      <div className="form-group">
        <label>Kepada</label>
        <input
          value={formData.to}
          onChange={(e) => updateField("to", e.target.value)}
          placeholder="Nama perusahaan atau individu"
        />
      </div>

      <div className="form-group">
        <label>Alamat</label>
        <input
          value={formData.address}
          onChange={(e) => updateField("address", e.target.value)}
          placeholder="Alamat lengkap"
        />
      </div>

      <div className="form-group">
        <label>Telepon</label>
        <input
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="Nomor telepon"
        />
      </div>

      <div className="form-group">
        <label>Tanggal</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => updateField("date", e.target.value)}
        />
      </div>
    </div>
  );
};

export default CustomerInfoSection;
