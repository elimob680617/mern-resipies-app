import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import { Auth, Home, NewRecipe, Register, SavedRecipes } from "./pages";
import store from "./store";
import theme from "./theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/register" element={<Register />} />
      <Route path="/new-recipe" element={<NewRecipe />} />
      <Route path="/saved-recipe" element={<SavedRecipes />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider store={store}>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.StrictMode>
  </ReduxProvider>
);
