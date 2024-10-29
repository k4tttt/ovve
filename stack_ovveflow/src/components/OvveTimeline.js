import React from 'react';
import TimelineSlider from './TimelineSlider';

const OvveTimeline = ({ min, max, value, onChange, onChangeCommitted, format_date, color_hex, marks }) => {
  return (
    <div className='ovve_timeline'>
      <TimelineSlider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
        aria-label="Default"
        valueLabelDisplay="on"
        valueLabelFormat={(value) => format_date(value)}
        track={false}
        color={color_hex}
        marks={marks}
      />
    </div>
  );
};

export default OvveTimeline;
