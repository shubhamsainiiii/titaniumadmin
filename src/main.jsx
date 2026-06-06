// /* eslint-disable no-unused-vars */

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// import App from "./App";

// import "./index.css";

// ReactDOM.createRoot(
//   document.getElementById("root")
// ).render(

//   <React.StrictMode>

//     <BrowserRouter>

//       <App />

//     </BrowserRouter>

//   </React.StrictMode>
// );


/* eslint-disable no-unused-vars */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0d1526",
            color: "#fff",
            border: "1px solid #1a2540",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#c9a227",
              secondary: "#0d1526",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#0d1526",
            },
          },
        }}
      />

      <App />

    </BrowserRouter>

  </React.StrictMode>
);