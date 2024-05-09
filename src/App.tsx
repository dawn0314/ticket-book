import Home from "./routes/home";
import ErrorPage from "./error-page";
import CreateTicket from "./routes/create-ticket";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import TicketList from "./routes/ticket-list";
import TicketDetail from "./components/list/ticket-detail";

const GlobalStyles = createGlobalStyle`
  ${reset};

  :root {
    --primary-dark: #333333;
    --accent:#cba135;
    --beige:#e7d590;
    --light:#f4f1ec;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "Public Sans", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    height: 100vh;
    background-color: var(--primary-dark);
    min-width: 800px;
  }
  ::-webkit-scrollbar {
   display:none;
  }

  button{
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create-ticket",
    element: <CreateTicket />,
  },
  {
    path: "/ticket-list",
    element: <TicketList />,
  },
  {
    path: "/ticket-list/:id",
    element: <TicketDetail />,
  },
]);

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
