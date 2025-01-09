import React from 'react';
import { motion } from 'framer-motion';
import '../Estilos/CardDetails.css';

const CardDetails = ({ title, details, icon }) => {
  return (
    <motion.div 
      className="card-details"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">
        <div className="header-left">
          {icon}
          <h2>{title}</h2>
        </div>
      </div>

      <div className="details-grid">
        {details.map((detail, index) => (
          <div key={index} className="detail-item">
            <div className="detail-label">
              {detail.icon && <span className="detail-icon">{detail.icon}</span>}
              {detail.label}
            </div>
            <div className="detail-value">{detail.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CardDetails;
