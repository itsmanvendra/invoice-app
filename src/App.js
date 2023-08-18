import { ListDataProvider } from "./ContextApi";
import List from "./pages/List";
import CreateInvoice from "./pages/CreateInvoice";
import ViewInvoice from "./pages/ViewInvoice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider>
    <ListDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/createInvoice" element={<CreateInvoice />} />
          <Route path="/viewInvoice" element={<ViewInvoice />} />
        </Routes>
      </BrowserRouter>
    </ListDataProvider>
    </SnackbarProvider>
  );
}

export default App;
