"use client";

import optsPieChart, { StatisticData } from "@/libs/optsPieChart";
import { type TitleComponentOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

export default function PieStatic({
  data,
  title,
}: {
  data: any;
  title: TitleComponentOption;
}) {
  const [constructedData, setConstructedData] = useState<StatisticData>([]);
  const [timeOut, setTimeOut] = useState(false);

  const opt = optsPieChart(title, constructedData);

  useEffect(() => {
    setConstructedData(data);

    const timeout = setTimeout(() => setTimeOut(true), 500);

    return () => {
      clearTimeout(timeout);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactECharts
      option={opt}
      notMerge
      lazyUpdate
      showLoading={!timeOut}
      loadingOption={{
        text: "Cargando estadísticas...",
        color: "#fff",
        textColor: "#fff",
        maskColor: "rgba(0, 0, 0, 0.8)",
        zlevel: 0,
      }}
    />
  );
}
