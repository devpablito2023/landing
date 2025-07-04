import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import LandingPage from "./pages/LandingPage";
import Layout from "./layout/Layout";
import AdminMensajes from "./components/admin/AdminMensajes";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Ruta principal: Landing Page */}
              <Route
                path="/"
                element={
                  <Layout>
                    <LandingPage />
                  </Layout>
                }
              />

              {/* Ruta de administración */}
              <Route path="/admin/mensajes" element={<AdminMensajes />} />

              {/* Puedes agregar más páginas públicas si necesitas */}
              {/*
              <Route
                path="/about"
                element={
                  <Layout>
                    <AboutPage />
                  </Layout>
                }
              />
              <Route
                path="/contact"
                element={
                  <Layout>
                    <ContactPage />
                  </Layout>
                }
              />
              */}

              {/* Redirección por defecto a la landing page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
