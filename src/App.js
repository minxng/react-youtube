import SearchHeader from "./components/SearchHeader";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <SearchHeader />
      <Outlet />
    </div>
  );
}

export default App;

// 필요 컴포넌트
