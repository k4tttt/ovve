import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const TimelineSlider = styled(Slider)({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 30,
    width: '7px',
    backgroundColor: '#000',
    border: 'none',
    borderRadius: 2,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-rail': {
    color: '#ddd',
    opacity: 1,
    height: '24px',
    borderRadius: 0,
  },
  '& .MuiSlider-mark': {
    height: '28px',
    width: '2px',
    backgroundColor: '#888',
  },
  '& .MuiSlider-markLabel': {
    marginTop: '6px',
  },
});

export default TimelineSlider;