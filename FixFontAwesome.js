import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

export const fixFontAwesome = () => {
  return (config.autoAddCss = false);
};
