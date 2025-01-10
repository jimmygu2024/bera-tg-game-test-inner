'use client';

import { useLoad } from "@/hooks/use-load";
import { onCopy } from "@/utils";

export default function Home() {
  const [data, dataList] = useLoad();

  return (
    <div className="h-full overflow-y-auto">
      <ul>
        {
          dataList?.map((it: any, idx: number) => (
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
