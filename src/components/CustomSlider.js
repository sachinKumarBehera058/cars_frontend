import React from 'react';
import Slider from '@mui/material/Slider';
import './CustomSlider.css';

const CustomSlider = ({ value, onChange, label, min, max, valueLabelFormat }) => {
  return (
    <div className="range-slider">
      <div className="slider-label">
        {label}: {valueLabelFormat ? valueLabelFormat(value[0]) : value[0]}
      </div>
      <Slider
        value={value}
        onChange={(_, value) => onChange(value)}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => (valueLabelFormat ? valueLabelFormat(value) : value)}
        min={min}
        max={max}
      />
      <div className="slider-label">
        {label}: {valueLabelFormat ? valueLabelFormat(value[1]) : value[1]}
      </div>
    </div>
  );
};

export default CustomSlider;
