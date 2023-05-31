import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#374151",
      // ...
      900: "#ffbe79",
    },
  },
});

export default theme;
