import ECharts from "echarts-for-react";
import _ from "lodash";
import { Moment } from "moment";
import { useState } from "react";
import { useHistory } from "react-router";
import { FromToPicker } from "../components/FromToPicker";
import { useSales } from "../services/admin";
import { defaultFrom, defaultTo } from "../utils";

export function SalesView() {
  const [from, setFrom] = useState<Moment>(defaultFrom());
  const [to, setTo] = useState<Moment>(defaultTo());
  const { sales } = useSales(from, to);
  const history = useHistory();

  const books = sales?.map(({ book }) => book) ?? [];
  const counts = sales?.map(({ count }) => count) ?? [];

  const option = {
    title: {
      text: `Sales Summary`,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: books.map((b) => b.name).reverse(),
    },
    series: [
      {
        type: "bar",
        data: counts.reverse(),
      },
    ],
  };

  return (
    <>
      <FromToPicker
        onChange={(ft) => {
          setFrom(ft.from);
          setTo(ft.to);
        }}
      />
      <ECharts
        style={{
          height: books.length * 60 + 80,
        }}
        option={option}
        onEvents={{
          click: (e: any) => {
            const name = e.name as string;
            const book = books.find((book) => book.name === name);
            if (book) {
              history.push(`/detail/${book.id}`);
            }
          },
        }}
      />
    </>
  );
}
