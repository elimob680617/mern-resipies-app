import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth, Home, NewRecipe, SavedRecipes } from "./pages";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Register from "./components/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-recipe" element={<NewRecipe />} />
          <Route path="/saved-recipe" element={<SavedRecipes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
