import { Cart } from "./cart";

export enum OrderStatus {
  submitted,
  shipped,
  delivered,
  cancelled,
}

export type Order = {
  id: number;
  datetime: string;
  cart: Cart;
  consignee: string;
  status: OrderStatus;
};

export function useOrders() {
  const example: Order = {
    id: 2021050100002333,
    datetime: "2021-05-01 09:41:05",
    cart: {
      books: [
        {
          book: {
            id: 1,
            isbn: "1",
            name: "Java核心技术卷II",
            type: "编程",
            author: "凯S.霍斯特曼",
            price: 95.2,
            description:
              "本书是Java领域有影响力和价值的著作之一，由拥有20多年教学与研究经验的Java技术专家撰写（获Jolt大奖），与《Java编程思想》齐名，10余年全球畅销不衰，广受好评。第10版根据JavaSE8全面更新，同时修正了第9版中的不足，系统全面讲解了Java语言的核心概念、语法、重要特性和开发方法，包含大量案例，实践性强。",
            inventory: 1000,
            image: "http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg",
          },
          count: 1,
        },
        {
          book: {
            id: 4,
            isbn: "4",
            name: "小王子",
            type: "儿童文学",
            author: "圣-埃克苏佩里",
            price: 8.89,
            description:
              "豆瓣9.7高分推荐！旅法翻译家梅子涵之女梅思繁法文直译，舒朗大开本，央美教授高精度还原原作插画。首次收录全球舞台剧、音乐会、电影、动画片等对《小王子》的精彩诠释，通晓名作的前世今生。",
            inventory: 1000,
            image: "http://img3m9.ddimg.cn/75/6/25067469-1_u_2.jpg",
          },
          count: 3,
        },
      ],
      discount: 36.561,
      total: 85.309,
    },
    consignee: "Bugen Zhao",
    status: OrderStatus.delivered,
  };

  return [example, example];
}
