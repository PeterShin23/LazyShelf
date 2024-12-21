import * as React from "react";
import { ContainerView } from "../shared/enums/fe";
import useAppContext from "../hooks/app-hook";
import { Media } from "../shared/types/s3";
import { HeaderContainer } from "./header/header-container";
import { MediaCarousel } from "./media/media-carousel";
import { TheDevContainer } from "./the-dev/the-dev-container";
import { SignUpCards } from "./user-screens/sign-up-cards";
import { LazyImage } from "./common/lazy-media-image";
import { LoginCard } from "./user-screens/login-card";
import { colorPairs } from "../constants/colors";
import { ColorPicker } from "./common/color-picker";
import { AppActions } from "../contexts/app-context";

type ShowCaseContainerProps = {
  igUserMedia?: Media[][];
  // hideVerticalOverflow: (hide: boolean) => void;
}

export const ShowCaseContainer = (props: ShowCaseContainerProps) => {
  const { igUserMedia, } = props; //hideVerticalOverflow } = props;
  const flattenedMedias = igUserMedia?.flatMap(m => m.map(n => n));

  const { state, dispatch } = useAppContext();

  const [selectedMediaId, setSelectedMediaId] = React.useState<string | undefined>(undefined);
  const [colorPickerPosition, setColorPickerPosition] = React.useState<any>(null)

  const getContainerView = () => {
    switch (state.view) {
      case ContainerView.TheDevDisplay:
        return <TheDevContainer />
      default:
        return (
          <>
            <div className="flex flex-col justify-center my-8" style={{ marginLeft: "100px", marginRight: "100px" }}>
              <p 
                className="flex justify-center font-size-xl font-weight-light"
                style={{
                  color: colorPairs[state.uiColor].darkest,
                }} 
                contentEditable={state.view === ContainerView.CreatorMode}>
                {state.isSignedIn ? "Signed In!" : "Based In Washington D.C."}
              </p>
              <p 
                className="flex justify-center font-size-sm font-weight-medium"
                style={{
                  color: colorPairs[state.uiColor].darkest,
                }}>
                Message me on LinkedIn or Instagram to connect! Find out more about me in the top right "Meet The Dev".
              </p>
            </div>
            <div className="media-container">
              <div className="media-list">
                {flattenedMedias && flattenedMedias.flatMap(m => (
                  <LazyImage
                    // ref={imageRef}
                    src={m.mediaUrl}
                    onClick={() => {
                      if (state.view === ContainerView.CreatorMode) return;

                      setSelectedMediaId(m.mediaId);
                    }} />
                ))}
              </div>
            </div>
          </>
        )
    }
  }

  const onColorPairClick = (colorPairName: string) => {
    dispatch({
      type: AppActions.SetUpdatedConfigs,
      payload: { ...state.updatedConfigs, updatedUiColor: colorPairName },
    });
    dispatch({
      type: AppActions.SetUiOptionColor,
      payload: colorPairName,
    });
  }

  const updateUiColorHandler = React.useCallback((e) => {
    if (state.view !== ContainerView.CreatorMode) return;

    if (e.target.id !== "showcase-content-container" || colorPickerPosition) {
      setColorPickerPosition(null);
    } else {
      setColorPickerPosition({ x: e.pageX, y: e.pageY });
    }
  }, [state.view, colorPickerPosition]);

  React.useEffect(() => {
    document.addEventListener("click", updateUiColorHandler);

    return () => {
      document.removeEventListener("click", updateUiColorHandler);
    };
  }, [updateUiColorHandler])

  return (
    <div id="showcase-content-container" className="relative">
      <HeaderContainer />
      {getContainerView()}
      {state.view === ContainerView.SignUpCards && (
        <SignUpCards />
      )}
      {state.view === ContainerView.LoginCard && (
        <LoginCard />
      )}
      {selectedMediaId && (
        <MediaCarousel 
          initialMediaId={selectedMediaId} 
          media={flattenedMedias}
          closeCarousel={() => setSelectedMediaId(undefined)}
        />
      )}
      {colorPickerPosition && (
        <ColorPicker
          xPosition={colorPickerPosition.x}
          yPosition={colorPickerPosition.y}
          onClick={onColorPairClick}
        />
      )}
    </div>
  )
}