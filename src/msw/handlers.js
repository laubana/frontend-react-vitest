import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:4000/scoops", () => {
    return HttpResponse.json([
      { name: "chocolate", imagePath: "/images/chocolate.png" },
      { name: "vanilla", imagePath: "/images/vanilla.png" },
    ]);
  }),

  http.get("http://localhost:4000/toppings", () => {
    return HttpResponse.json([
      { name: "cherries", imagePath: "/images/cherries.png" },
      { name: "m&ms", imagePath: "/images/m-and-ms.png" },
      { name: "hot fudge", imagePath: "/images/hot-fudge.png" },
    ]);
  }),

  http.post(
    "http://localhost:4000/order",
    async () => {
      await delay(300);

      return HttpResponse.json({ orderNumber: 123456789 });
    },
    { status: 201 }
  ),
];
