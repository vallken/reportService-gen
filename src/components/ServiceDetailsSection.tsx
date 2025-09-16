import React from 'react';
import { FormData } from '../types';

interface ServiceDetailsSectionProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

const ServiceDetailsSection: React.FC<ServiceDetailsSectionProps> = ({
  formData,
  updateField
}) => {
  return (
    <div className="form-section">
      <div className="section-header">
        <span className="section-icon">🔧</span>
        Service Details
      </div>

      <div className="form-group">
        <label>Problem</label>
        <textarea
          value={formData.problem}
          onChange={(e) => updateField('problem', e.target.value)}
          placeholder="Deskripsikan masalah yang ditemukan..."
        />
      </div>

      <div className="form-group">
        <label>Component NG</label>
        <textarea
          value={formData.components}
          onChange={(e) => updateField('components', e.target.value)}
          placeholder="Komponen yang bermasalah (pisahkan dengan enter)"
        />
      </div>

      <div className="form-group">
        <label>Test/Trial</label>
        <input
          value={formData.trial}
          onChange={(e) => updateField('trial', e.target.value)}
          placeholder="Hasil test atau trial"
        />
      </div>
    </div>
  );
};

export default ServiceDetailsSection;