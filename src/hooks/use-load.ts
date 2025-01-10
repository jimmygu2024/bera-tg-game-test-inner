import { useEffect, useState } from "react";

export function useLoad() {
  const [data, setData] = useState({});
  const [dataList, setDataList] = useState<any>();

  useEffect(() => {
    const handleMessage = (e: any) => {
      if (e.data?.type !== 'Beraciaga') return;
      const _data = e.data.data;
      setData(_data);

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
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return [data, dataList];
}
