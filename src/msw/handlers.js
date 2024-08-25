import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:5000/scoops", () => {
    return HttpResponse.json([
      { name: "chocolate", imagePath: "/images/chocolate.png" },
      { name: "vanilla", imagePath: "/images/vanilla.png" },
    ]);
  }),

  http.get("http://localhost:5000/toppings", () => {
    return HttpResponse.json([
      { name: "cherries", imagePath: "/images/cherries.png" },
      { name: "m&ms", imagePath: "/images/m-and-ms.png" },
      { name: "hot fudge", imagePath: "/images/hot-fudge.png" },
    ]);
  }),
];
