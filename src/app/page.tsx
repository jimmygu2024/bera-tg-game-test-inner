'use client';

import { useTelegram } from "@/hooks/use-telegram";
import { onCopy } from "@/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const { WebApp } = useTelegram();

  const [dataList, setDataList] = useState<any>();

  useEffect(() => {
    if (!WebApp) return;

     //#region test data
     const _data = {
      initData: WebApp.initData,
      initDataUnsafe: WebApp.initDataUnsafe,
      version: WebApp.version,
      viewportHeight: WebApp.viewportHeight,
      viewportStableHeight: WebApp.viewportStableHeight,
      isExpanded: WebApp.isExpanded,
      platform: WebApp.platform,

      // during deployment
      // set the corresponding environment variables in Vercel and other platforms
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
  }, [WebApp]);

  return (
    <div className="h-full overflow-y-auto">
      <ul>
        {
          dataList?.map?.((it: any, idx: number) => (
            <li key={idx} className="flex gap-2">
              <label className="font-bold">{it.label}:</label>
              <div
                className="underline decoration-solid break-all"
                onClick={() => onCopy(it.value)}
              >
                {it.value}
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
