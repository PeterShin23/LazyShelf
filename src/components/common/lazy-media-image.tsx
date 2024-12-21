import React from 'react';

export const LazyImage = ({ src, onClick }) => {
  const [beforeLoadClassName, setBeforeLoadClassName] = React.useState<string>("media-list-img-lazy")

  // Generate a random delay between 0 and 3 seconds
  const randomDelay = (Math.random() * 2).toFixed(2) + 's';
  
  const removeClassName = () => {
    setTimeout(() => {
      setBeforeLoadClassName("");
    }, 3600);
  };

  React.useEffect(() => {
    removeClassName();

    return () => {
      removeClassName();
    }
  }, []);

  return (
    <img
      src={src}
      alt={"Image"}
      loading="lazy"
      width="275px"
      className={`${beforeLoadClassName}`}
      onClick={onClick}
      style={{ animationDelay: randomDelay }}
    />
  );
};