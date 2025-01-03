"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

// This function loads css file after page first load to prevent non-critical css to affect load time
const lazyLoadFromCDN = (url: string) => {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", url);
    link.setAttribute("crossOrigin", "anonymous");
    document.head.appendChild(link);
  }
};

// All other non-critial css files are loaded from here
const StylingComponent = ({ children }: { children?: any }) => {
  // lazyLoadFromCDN("");
  return <>{children}</>;
};

export default StylingComponent;
