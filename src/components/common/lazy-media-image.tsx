import React from 'react';

export const LazyImage = ({ src, onClick }) => {
  const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
  const [beforeLoadClassName, setBeforeLoadClassName] = React.useState<string>("media-list-img-lazy")

  // Generate a random delay between 0 and 3 seconds
  const randomDelay = (Math.random() * 3).toFixed(2) + 's';
  
  const removeClassName = () => {
    setTimeout(() => {
      setBeforeLoadClassName("")
    }, 4200)
  }

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
      className={`${imageLoaded ? 'opacity-100' : 'opacity-0'} ${beforeLoadClassName}`}
      onClick={onClick}
      onLoad={() => setImageLoaded(true)}
      style={{ animationDelay: randomDelay }}
    />
  );
};