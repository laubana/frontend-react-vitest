import { useState } from "react";

import "./Practice.css";
import { convertKebabToPascal } from "../../helpers/helpers";

const Practice = () => {
  const [index, setIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const colors = ["medium-violet-red", "midnight-blue"];

  return (
    <div>
      <button
        className={`${isDisabled ? "grey" : colors[index % colors.length]}`}
        onClick={() => setIndex((prevState) => ++prevState)}
        disabled={isDisabled}
      >
        Change to {convertKebabToPascal(colors[(index + 1) % colors.length])}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
        onChange={(event) => setIsDisabled(event.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable Button</label>
    </div>
  );
};

export default Practice;
