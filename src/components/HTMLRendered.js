const HTMLRendered = ({ html }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default HTMLRendered;