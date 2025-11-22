import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { store } from "./redux/store";
import AuthProvider from "./components/General/AuthProvider";

const queryClient = new QueryClient();

function App() {
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#1976d2",
  //     },
  //   },
  // });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <ThemeProvider theme={theme}> */}
        <Router>
          <AuthProvider />
        </Router>
        <ToastContainer position="top-right" autoClose={2000} />
        {/* </ThemeProvider> */}
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
