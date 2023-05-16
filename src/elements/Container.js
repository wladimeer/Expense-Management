import styled from "styled-components";

const Container = styled.div({
  width: '90%',
  height: '90vh',
  display: 'flex',
  maxWidth: '70rem',
  background: '#ffffff',
  boxShadow: '0px 1.25rem 2.5rem rgba(0, 0, 0, 0.05)',
  justifyContent: 'space-between',
  borderRadius: '0.625rem',
  flexDirection: 'column',
  position: 'relative',
  maxHeight: '50rem',
  overflowY: 'auto',
  margin: 'auto',
  zIndex: 100,

  '@media(max-width: 60rem)': {
    height: '95vh',
    maxHeight: 'none'
  }
});

export default Container;