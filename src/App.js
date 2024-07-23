import SearchHeader from "./components/SearchHeader";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <SearchHeader />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
  );
}

export default App;

// 필요 컴포넌트
