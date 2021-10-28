import React from "react";
import { BackgroundContext } from "./contexts/backgroundContext";
import sea from "./assets/imgs/sea.jpg";
import mountains from "./assets/imgs/mountains.jpg";
import sky from "./assets/imgs/sky.jpg";
import sand from "./assets/imgs/sand.jpg";

export const optionObject = [
  { value: "sea", text: "Background Sea" },
  { value: "mountains", text: "Background Mountains" },
  { value: "sky", text: "Background Sky" },
  { value: "sand", text: "Background Sand" },
  { value: "any", text: "No Background / Toggle Theme" },
];

export const SwitchBackground = () => {
  const { backgroundChoice, changeBackground } =
    React.useContext(BackgroundContext);


  switch (backgroundChoice) {
    case "sea":
      return sea;

    case "sky":
      return sky;

    case "mountains":
      return mountains;

    case "sand":
      return sand;

    default:
      return "";
  }
};
