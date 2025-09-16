import React from 'react';
import { FormData } from '../types';

interface ProductDetailsSectionProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  formData,
  updateField
}) => {
  return (
    <div className="form-section">
      <div className="section-header">
        <span className="section-icon">📦</span>
        Product Details
      </div>

      <div className="form-group">
        <label>Part/Driver Name</label>
        <input
          value={formData.part}
          onChange={(e) => updateField('part', e.target.value)}
          placeholder="Nama part atau driver"
        />
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          value={formData.qty}
          onChange={(e) => updateField('qty', e.target.value)}
          placeholder="Jumlah"
        />
      </div>
    </div>
  );
};

export default ProductDetailsSection;