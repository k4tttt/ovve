import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const TimelineSlider = styled(Slider)(({color}) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 36,
    width: '18px',
    backgroundColor: '#fff',
    border: '2px solid #000',
    borderRadius: 4,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-rail': {
    color: `#${color}`,
    opacity: 1,
    height: '18px',
    borderRadius: 0,
    border: '1px solid #000',
  },
  '& .MuiSlider-mark': {
    height: '28px',
    width: '5px',
    backgroundColor: '#fff',
    border: '1px solid #000',
    borderRadius: '4px'
  },
  '& .MuiSlider-markLabel': {
    marginTop: '6px',
    color: '#000',
  },
}));

export default TimelineSlider;