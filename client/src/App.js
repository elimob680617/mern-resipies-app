import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default App;
