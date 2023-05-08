import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

import AppWrapper from "./appWrapper";
import { AuthProvider } from "./context/userAuthContext";
function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
}

export default App;
