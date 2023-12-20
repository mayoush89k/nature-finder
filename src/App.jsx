import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import { ThemeProvider } from "./context/ThemeContext";
import Homepage from "./Components/Homepage/Homepage";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";
import AsideComp from "./Components/AsideComp/AsideComp";
import { SplitScreens } from "./SplitScreens";
import { UserProvider } from "./context/UserContext";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Nature from "./Components/Nature/Nature";
import AddPark from "./Components/AddPark/AddPark";
import SinglePark from "./Components/SinglePark/SinglePark";
import CrazyPick from "./Components/CrazyPick/CrazyPick";
import History from "./Components/History/History";
import Error from "./Components/Error/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <UserProvider>
            {window.outerWidth > 800 ? (
              <div>
                <Header />

                <SplitScreens
                  leftWeight={1}
                  rightWeight={3}
                  left={<AsideComp />}
                  right={
                    <Routes>
                      <Route path="/" element={<Homepage />} />
                      <Route path="/Park/:name" element={<SinglePark />} />
                      <Route path="/AboutUs" element={<AboutUs />} />
                      <Route path="/ContactUs" element={<ContactUs />} />
                      <Route path="/Login" element={<Login />} />
                      <Route path="/Register" element={<Register />} />
                      <Route path="/Nature" element={<Nature />} />
                      <Route path="/AddPark" element={<AddPark />} />
                      <Route path="/CrazyPick" element={<CrazyPick />} />
                      <Route path="/History" element={<History />} />
                      <Route path="/*" element={<Error />} />
                    </Routes>
                  }
                ></SplitScreens>
              </div>
            ) : (
              <div>
                <Header />
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/:name" element={<SinglePark />} />
                  <Route path="/AboutUs" element={<AboutUs />} />
                  <Route path="/ContactUs" element={<ContactUs />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Register" element={<Register />} />
                  <Route path="/Nature" element={<Nature />} />
                  <Route path="/AddPark" element={<AddPark />} />
                </Routes>
              </div>
            )}
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
