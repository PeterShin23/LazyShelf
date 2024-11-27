import * as React from "react";

export const Chevron = ({ onClick, fillColor, className, isOpen } : { onClick?: () => void, fillColor?: string, className?: string, isOpen: boolean }) => {
  const [chevronRotateClassName, setChevronRotateClassName] = React.useState<string>("chevron-rotate-90");

  const onChevronClick = () => {
    if (chevronRotateClassName === "chevron-rotate-90") {
      setChevronRotateClassName("chevron-rotate-270")
    } else {
      setChevronRotateClassName("chevron-rotate-90")
    }
    onClick && onClick();
  }

  React.useEffect(() => {
    setChevronRotateClassName(
      isOpen ? "chevron-rotate-270" : "chevron-rotate-90"
    );
  }, [isOpen]);

  return (
    <button 
      onClick={onChevronClick}
      className={`font-normal size-3 ${className ?? ""} ${chevronRotateClassName}`}
      dangerouslySetInnerHTML={{ __html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="${fillColor ?? "white"}" class="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
        </svg>`
      }}>
    </button>
  )
}