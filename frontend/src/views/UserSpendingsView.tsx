import ECharts from "echarts-for-react";
import _ from "lodash";
import { Moment } from "moment";
import { useState } from "react";
import { FromToPicker } from "../components/FromToPicker";
import { useUserSpendings } from "../services/admin";
import { defaultFrom, defaultTo } from "../utils";

export function UserSpendingsView() {
  const [from, setFrom] = useState<Moment>(defaultFrom());
  const [to, setTo] = useState<Moment>(defaultTo());
  const { userSpendings } = useUserSpendings(from, to);

  const users = userSpendings?.map((us) => us.user) ?? [];
  const spendings = userSpendings?.map((us) => us.spending) ?? [];

  const option = {
    title: {
      text: `User Spendings Summary`,
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
      data: users.map((u) => `${u.username} [${u.id}]`).reverse(),
    },
    series: [
      {
        type: "bar",
        data: spendings.reverse(),
      },
    ],
    responsive: true,
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
          height: users.length * 60 + 80,
        }}
        option={option}
      />
    </>
  );
}
