import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RouteScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        const targetId = decodeURIComponent(location.hash.slice(1));
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          return;
        }
      }

      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [location.hash, location.pathname]);

  return null;
}

export default RouteScrollManager;
