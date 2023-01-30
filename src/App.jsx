import "./index.css";

import AuthProvider from "@context/AuthProvider";
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

// import Invoices, { Main as MainInvoices } from "@pages/invoices";
// import WritingExerciseCorrection from "@pages/correction/writing";
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
        <AuthProvider>
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
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
