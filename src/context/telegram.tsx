import React, { createContext, useEffect, useState } from "react";

interface TelegramContext {
  WebApp: any | null;
  isInitialized: boolean;
  error: string | null;
}

export const TelegramContext = createContext<TelegramContext>({
  WebApp: null,
  isInitialized: false,
  error: null,
});

const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [WebApp, setWebApp] = useState<any | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initWebApp = async () => {
      try {
        const WebAppModule = await import("@twa-dev/sdk");
        WebAppModule.default.ready();
        WebAppModule.default.expand();
        const _WebApp = WebAppModule.default;
        setWebApp(_WebApp);
        setIsInitialized(true);
      } catch (err) {
        setError("Failed to load Telegram WebApp SDK");
      }
    };

    initWebApp();
  }, []);

  return (
    <TelegramContext.Provider value={{ WebApp, isInitialized, error }}>
      {children}
    </TelegramContext.Provider>
  );
};

export default TelegramProvider;
