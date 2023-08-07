import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Pages/Home";
import Spacing from "./components/Spacing";
import { ToastContainer } from 'react-toastify';
import WalletContext from "./contexts/walletContext";
import { DiscordAuth } from "./contexts/discordContext";

function App() {
  return (
    <>
      <DiscordAuth>
        <WalletContext>
          <Header />
          <Spacing lg='80' md='80' />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </WalletContext>
      </DiscordAuth>
    </>
  );
}

export default App;