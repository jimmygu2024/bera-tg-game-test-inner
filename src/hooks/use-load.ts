import { useEffect, useState } from "react";

export function useLoad() {
  const [dataList, setDataList] = useState<any>();
  const [WebApp, setWebApp] = useState<any | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('>>> inner use load: %o', window);

    try {
      // @ts-ignore
      console.log('>>>inner TelegramWebApp: %o', window?.parent?.TelegramWebApp);
    } catch(err) {
      console.log('>>>inner error: %o', err);
    }

    const handleMessage = (e: any) => {
      console.log('>>> inner: listened message %o', e);
      if (e.data?.type !== 'Beraciaga') return;
      const _data = e.data.data;
      console.log('>>> inner: %o', _data);
    };
    window.addEventListener('message', handleMessage);

    const initWebApp = async () => {
      try {
        const WebAppModule = await import("@twa-dev/sdk");
        console.log('>>>inner WebAppModule: %o', WebAppModule);
        WebAppModule.default.ready();
        WebAppModule.default.expand();
        const _WebApp = WebAppModule.default;
        setWebApp(_WebApp);
        setIsInitialized(true);

        console.log('>>>inner _WebApp: %o', _WebApp);

        //#region test data
        const _data = {
          initData: _WebApp.initData,
          initDataUnsafe: _WebApp.initDataUnsafe,
          version: _WebApp.version,
          viewportHeight: _WebApp.viewportHeight,
          viewportStableHeight: _WebApp.viewportStableHeight,
          isExpanded: _WebApp.isExpanded,
          platform: _WebApp.platform,
  
          API: process.env.NEXT_PUBLIC_API,
        };
        const _list: any = [];
        const formatData = (it: any) => {
          for (const key in it) {
            if (typeof it[key] !== 'object') {
              _list.push({
                label: key,
                value: it[key]?.toString(),
              });
              continue;
            }
            formatData(it[key]);
          }
        };
        formatData(_data);
        setDataList(_list);
        //#endregion
      } catch (err) {
        setError(">>>inner Failed to load Telegram WebApp SDK");
      }
    };

    initWebApp();

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return [dataList, WebApp, isInitialized, error];
}
