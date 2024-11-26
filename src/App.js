import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Drawer from "./components/drawer/drawer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Drawer />} />
        {/* <Route path="/roles" element={<RolesTable />} />
        <Route path="/permissions" element={<PermissionsGrid />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
