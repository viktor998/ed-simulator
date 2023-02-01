import "./index.css";

import { LinearProgress, ThemeProvider } from "@mui/material";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { theme } from "./assets/theme/theme";
import ResultPage from "./pages/ResultPage";

// const DashboardPage = React.lazy(() => import("@pages/DashboardPage"));
const LandingPage = React.lazy(() => import("@pages/LandingPage"));
const QuizPage = React.lazy(() => import("@pages/QuizPage"));
const NoPage = React.lazy(() => import("@pages/NoPage"));
const LayoutPage = React.lazy(() => import("@pages/LayoutPage"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div>
          <LinearProgress />
        </div>
      }
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LayoutPage />}>
              <Route index element={<LandingPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/results" element={<ResultPage />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
