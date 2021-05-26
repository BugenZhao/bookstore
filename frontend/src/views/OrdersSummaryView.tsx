import ECharts from "echarts-for-react";
import _ from "lodash";
import { Moment } from "moment";
import { useState } from "react";
import { useHistory } from "react-router";
import { FromToPicker } from "../components/FromToPicker";
import { useOrdersSummary } from "../services/order";
import { defaultFrom, defaultTo } from "../utils";

export function OrdersSummaryView() {
  const [from, setFrom] = useState<Moment>(defaultFrom());
  const [to, setTo] = useState<Moment>(defaultTo());
  const { summary } = useOrdersSummary(from, to);
  const history = useHistory();

  const books = summary?.books ?? [];
  const totalCount = _(books)
    .map(({ count }) => count)
    .sum();
  const totalPrice = summary?.total ?? 0;

  const option = {
    title: {
      text: `${totalCount} books, ¥${totalPrice} in total`,
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
      data: books.map(({ book }) => book.name).reverse(),
    },
    series: [
      {
        type: "bar",
        data: books.map(({ count }) => count).reverse(),
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
            const book = books.find(({ book }) => book.name === name)?.book;
            if (book) {
              history.push(`/detail/${book.id}`);
            }
          },
        }}
      />
    </>
  );
}
