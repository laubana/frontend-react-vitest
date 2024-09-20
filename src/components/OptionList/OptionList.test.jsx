import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import OptionList from "./OptionList";

import { render } from "../../utils/vitest";

test("scoops", async () => {
  const user = userEvent.setup();

  render(<OptionList optionType="scoops" />);

  const images = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(images).toHaveLength(2);
  expect(images.map((image) => image.alt)).toEqual([
    "chocolate scoop",
    "vanilla scoop",
  ]);

  const total = screen.getByText("Scoops Total: $", { exact: false });
  expect(total).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(total).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(total).toHaveTextContent("6.00");

  await user.clear(vanillaInput);

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "11");
  expect(total).toHaveTextContent("0.00");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "-1");
  expect(total).toHaveTextContent("0.00");
});

test("toppings", async () => {
  const user = userEvent.setup();

  render(<OptionList optionType="toppings" />);

  const images = await screen.findAllByRole("img", { name: /topping$/i });
  expect(images).toHaveLength(3);
  expect(images.map((image) => image.alt)).toEqual([
    "cherries topping",
    "m&ms topping",
    "hot fudge topping",
  ]);

  const total = screen.getByText("Toppings Total: $", { exact: false });
  expect(total).toHaveTextContent("0.00");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });
  await user.click(cherriesInput);
  expect(total).toHaveTextContent("1.50");

  const fudgeInput = await screen.findByRole("checkbox", {
    name: /hot fudge/i,
  });
  await user.click(fudgeInput);
  expect(total).toHaveTextContent("3.00");

  await user.click(cherriesInput);
  expect(total).toHaveTextContent("1.50");

  await user.click(fudgeInput);
  expect(total).toHaveTextContent("0.00");
});
