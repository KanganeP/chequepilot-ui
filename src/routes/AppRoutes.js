import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UploadChequePage from "./pages/UploadChequePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={ <PrivateRoute><Dashboard /></PrivateRoute> }
        />
        <Route
          path="/upload-cheque"
          element={<PrivateRoute><UploadChequePage /></PrivateRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;