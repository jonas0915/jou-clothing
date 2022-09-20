import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
// import LogIn from "./components/log-in-form.jsx/log-in-form";
import Authentication from "./routes/authentication/authentication.components";

const Shop = () => {
  return (
    <div>
      <h1>I want to shop</h1>
    </div>
  );
};

const App = () => {
  return (
    //Routes Tells the App to leverage some routes to show in the page.
    <Routes>
      {/* When a route is match with a path value of string, render the element */}
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
