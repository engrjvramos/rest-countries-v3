import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import useDarkMode from "./hooks/useDarkMode";
import CountryDetails from "./pages/CountryDetails";
import Home from "./pages/Home";

function App() {
  const [theme, themeToggler] = useDarkMode();

  return (
    <>
      <Header theme={theme} toggleTheme={themeToggler} />
      <Routes>
        <Route index element={<Home />} />
        <Route path=":code" element={<CountryDetails />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
