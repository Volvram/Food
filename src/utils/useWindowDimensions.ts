import React from "react";
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  React.useLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    window.dispatchEvent(new Event("resize"));
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}
