import React from "react";
import { CheckCircle } from '@mui/icons-material';

const ProgressBar = ({ currentStep }) => {
  const steps = [1, 2, 3];

  return (
    <div className="progress-bar-container d-flex justify-content-center align-items-center" style={{ gap: '5px' }}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="text-center">
            <div
              className={`step-circle ${currentStep >= step ? "completed" : ""} ${currentStep === step ? "active" : ""}`}
              style={{ 
                margin: '0 5px', 
                width: '35px', 
                height: '35px', 
                lineHeight: '35px',
                borderRadius: '50%',
                backgroundColor: currentStep >= step ? 'green' : 'lightgray', 
                boxShadow: currentStep >= step ? '0px 0px 10px rgba(0, 128, 0, 0.5)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: currentStep > step ? 'white' : 'white', 
                fontSize: '1rem',
                fontWeight: 'bold',
              }} 
            >
              {currentStep > step ? <CheckCircle fontSize="small" style={{ color: 'white' }} /> : step}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div 
              className={`step-line ${currentStep > step ? "completed" : ""}`} 
              style={{ 
                height: '4px', 
                backgroundColor: currentStep > step ? 'green' : 'lightgray', 
                flex: 1,
                margin: '0 -5px', 
                alignSelf: 'center',
              }} 
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;