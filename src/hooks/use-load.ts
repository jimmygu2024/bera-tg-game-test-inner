import { useEffect } from "react";

export function useLoad() {
  useEffect(() => {
    const handleMessage = (e: any) => {
      console.log(e);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
}
