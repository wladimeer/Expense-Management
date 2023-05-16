import React from 'react';
import { ReactComponent as Dots } from '../images/dots.svg';
import styled from 'styled-components';

const Background = () => {
  return (
    <>
      <UpDots />
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio='none'>
        <path
          fillOpacity="1"
          d="
            M0,160L60,133.3C120,107,240,53,360,53.3C480,53,600,107,720,122.7C840,139,
            960,117,1080,117.3C1200,117,1320,139,1380,149.3L1440,160L1440,320L1380,320C1320,
            320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,
            120,320,60,320L0,320Z
          "
        />
      </Svg>
      <DownDots />
    </>
  );
}

const Svg = styled.svg({
  zIndex: 0,
  width: '100%',
  position: 'fixed',
  height: '50vh',
  bottom: 0,

  path: {
    fill: 'rgba(135, 182, 194, 0.15)',
  }
});
 
const UpDots = styled(Dots)({
  top: '2.5rem',
  position: 'fixed',
  left: '2.5rem',
  zIndex: 1
});

const DownDots = styled(Dots)({
  bottom: '2.5rem',
  position: 'fixed',
  right: '2.5rem',
  zIndex: 1
});

export default Background;
