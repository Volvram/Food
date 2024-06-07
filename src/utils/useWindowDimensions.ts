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
    width: 0,
    height: 0,
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
