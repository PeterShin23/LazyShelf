import * as React from "react";

export const HeaderContainer = () => {
  const userName = "peter.shin";

  return (
    <div 
      id="header-container" 
      className="flex flex-row items-center justify-center gap-x-20"
      style={{
        height: "54px",
        borderBottomColor: "black",
        borderBottomWidth: "2"
      }}
    >
      <div>Hello World</div>
      <div className="min-w-fit flex flex-row items-center gap-x-10">
        <a 
          className="font-weight-light" 
          href={`https://instagram.com/${userName}`}
          target="_blank" 
          rel="noopener noreferrer"
          >@{userName}</a>
        <div className="rounded-full size-12 bg-white"></div>
      </div>
    </div>
  )
}