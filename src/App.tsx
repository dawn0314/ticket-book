import { useState, useEffect } from "react";
import Home from "./routes/home";
import ErrorPage from "./error-page";
import CreateTicket from "./routes/create-ticket";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import TicketList from "./routes/ticket-list";
import TicketDetail from "./components/list/ticket-detail";
import CreateAccount from "./components/user/create-account";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import Login from "./components/user/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/create-ticket",
    element: (
      <ProtectedRoute>
        <CreateTicket />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ticket-list",
    element: (
      <ProtectedRoute>
        <TicketList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ticket-list/:id",
    element: (
      <ProtectedRoute>
        <TicketDetail />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // 컴포넌트가 언마운트 될 때 리스너를 정리
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

const GlobalStyles = createGlobalStyle`
  ${reset};

  :root {
    --primary-dark: #333333;
    --accent:#cba135;
    --beige:rgb(231, 213, 144);
    --light:#f4f1ec;
    --light-200:#E7DDCF ;
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

export default App;
