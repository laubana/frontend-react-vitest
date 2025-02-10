import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.get(`${import.meta.env.VITE_BACKEND_URL}/scoops`, () => {
    return HttpResponse.json({
      message: "",
      data: [
        { name: "chocolate", imageUrl: "images/chocolate.png" },
        { name: "vanilla", imageUrl: "images/vanilla.png" },
      ],
    });
  }),

  http.get(`${import.meta.env.VITE_BACKEND_URL}/toppings`, () => {
    return HttpResponse.json({
      message: "",
      data: [
        { name: "cherries", imageUrl: "images/cherries.png" },
        { name: "m&ms", imageUrl: "images/m-and-ms.png" },
        { name: "hot fudge", imageUrl: "images/hot-fudge.png" },
      ],
    });
  }),

  http.post(
    `${import.meta.env.VITE_BACKEND_URL}/order`,
    async () => {
      await delay(300);

      return HttpResponse.json({
        message: "",
        data: { orderNumber: 123456789 },
      });
    },
    { status: 201 }
  ),
];
