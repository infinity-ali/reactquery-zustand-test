import "./App.css";
import MultipleDemo from "./compnents/Autocomplete";
import { QueryClient, QueryClientProvider } from "react-query";
import { create } from "zustand";

function App() {
  // Create a client
  const queryClient = new QueryClient()
  return (
    <div className="">
      <h1 className="text-center mt-5">Pry Autocomplete</h1>
      <div className="d-flex justify-content-center">
        <QueryClientProvider client={queryClient}>
          <MultipleDemo />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
