import * as React from "react";
import { ContainerView } from "../shared/enums/fe";
import useAppContext from "../hooks/app-hook";
import { Media } from "../shared/types/s3";
import { HeaderContainer } from "./header/header-container";
import { MediaCarousel } from "./media/media-carousel";
import { TheDevContainer } from "./the-dev/the-dev-container";
import { SignUpCards } from "./user-screens/sign-up-cards";

type ShowCaseContainerProps = {
  igUserMedia?: Media[][];
  // hideVerticalOverflow: (hide: boolean) => void;
}

export const ShowCaseContainer = (props: ShowCaseContainerProps) => {
  const { igUserMedia, } = props; //hideVerticalOverflow } = props;
  const flattenedMedias = igUserMedia?.flatMap(m => m.map(n => n));

  const { state, dispatch } = useAppContext();

  const [selectedMediaId, setSelectedMediaId] = React.useState<string>(undefined);

  // React.useEffect(() => {
  //   if (selectedMediaId) {
  //     hideVerticalOverflow(true);
  //   } else {
  //     hideVerticalOverflow(false);
  //   }
  // }, [selectedMediaId]);

  const getContainerView = () => {
    switch (state.view) {
      case ContainerView.TheDevDisplay:
        return <TheDevContainer />
      default:
        return (
          <>
            <div className="flex flex-col justify-center my-8" style={{ marginLeft: "100px", marginRight: "100px" }}>
              <p className="flex justify-center font-size-xl font-weight-light">
                This is the tag line.
              </p>
              <p className="flex justify-center font-size-sm font-weight-medium">
                I take pictures of nature in the cities. I'm based in Germany, and I take pictures using the Canon EOS RP.
              </p>
            </div>
            <div className="media-container">
              <div className="media-list">
                {flattenedMedias && flattenedMedias.flatMap(m => (
                  <img 
                    // ref={imageRef} 
                    src={m.mediaUrl} 
                    width="275px"
                    onClick={() => setSelectedMediaId(m.mediaId)} 
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="">
      <HeaderContainer />
      {getContainerView()}
      {state.view === ContainerView.SignUpCards && (
        <SignUpCards />
      )}
      {selectedMediaId && (
        <MediaCarousel 
          initialMediaId={selectedMediaId} 
          media={flattenedMedias}
          closeCarousel={() => setSelectedMediaId(undefined)}
        />
      )}
    </div>
  )
}