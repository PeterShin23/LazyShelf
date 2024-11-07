import * as React from "react";
import { Media } from "../../shared/types/s3";

type MediaCarouselProps = {
  initialMediaId: string;
  media: Media[];
  closeCarousel: () => void;
}

export const MediaCarousel = (props: MediaCarouselProps) => {
  const { initialMediaId, media, closeCarousel } = props;

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  React.useLayoutEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    const initialMediaPosition = document.getElementById(`media-in-carousel-${initialMediaId}`)?.getBoundingClientRect();

    if (!initialMediaPosition) return;

    console.log(initialMediaPosition);

    scrollContainer.scrollLeft = initialMediaPosition.left - (window.innerWidth * 0.7) + (initialMediaPosition.width * 1.47);
  }, [])

  React.useEffect(() => {

    const handleOutsideClick = (e) => {
      if (e.target.className.includes("media-carousel")) {
        closeCarousel();
      }
    }

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    }
  })

  return (
    <div ref={scrollContainerRef} className="media-carousel">
      <div className="media-carousel-content">
        {media && media.flatMap(m => (
          <img 
            ref={imageRef} 
            id={`media-in-carousel-${m.mediaId}`}
            src={m.mediaUrl} 
            // style={{ height: "40vh" }}
            alt="image"
          />
        ))}
      </div>
    </div>
  )
}