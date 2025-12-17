import { createContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import First from "./components/First";
import Second from "./components/Second";
import Cart from "./components/Cart";
import VoiceAssistant from "./components/VoiceAssistant";

export const GlobalState = createContext();

function App() {
  return (
    <RouterProvider router={browserroute} />
  );
}

export default App;

const AppWrapper = ({ children }) => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState({});
  const [currentPage, setCurrentPage] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/fooditems");
        const data = await res.json();
        setItems(data);

        const initialCount = {};
        data.forEach((item) => {
          initialCount[item.FoodID] = item.Quantity || 0;
        });
        setCount(initialCount);
      } catch (err) {
        console.log("Error Fetching the details", err);
      }
    };

    fetchData();
  }, []);

  const handleVoiceNavigation = (target) => {
    switch(target) {
      case "Home":
        navigate("/");
        setCurrentPage("Home");
        break;
      case "Cart":
        navigate("/Cart");
        setCurrentPage("Cart");
        break;
      case "About":
        navigate("/First");
        setCurrentPage("First");
        break;
      case "Second":
        navigate("/Second");
        setCurrentPage("Second");
        break;
      default:
        navigate("/");
        setCurrentPage("Home");
    }
  };

  const handleVoiceCommandResult = (result) => {
    const { response } = result;
    
    if (response.action === "NAVIGATE_TO" && response.navigationTarget) {
      handleVoiceNavigation(response.navigationTarget);
    }
  };

  const setCountWithBackendSync = (newCount) => {
    setCount((prevCount) => {
      const updatedCount =
        typeof newCount === "function" ? newCount(prevCount) : newCount;

      Object.keys(updatedCount).forEach((key) => {
        if (updatedCount[key] !== prevCount[key]) {
          updateBackendQuantity(key, updatedCount[key]);
        }
      });

      return updatedCount;
    });
  };

  const updateBackendQuantity = async (foodId, quantity) => {
    try {
      await fetch(`http://localhost:3000/updatequantity/${foodId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
    } catch (error) {
      console.error(`Error updating item ${foodId}:`, error);
    }
  };

  const sending = {
    items,
    count,
    setCount: setCountWithBackendSync,
    currentPage,
    handleVoiceNavigation,
    handleVoiceCommandResult
  };

  return (
    <GlobalState.Provider value={sending}>
      {children}
      <VoiceAssistant />
    </GlobalState.Provider>
  );
};

const MainLayoutWithContext = () => {
  return (
    <AppWrapper>
      <MainLayout />
    </AppWrapper>
  );
};

const browserroute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutWithContext />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "First",
        element: <First />,
      },
      {
        path: "Second",
        element: <Second />,
      },
      {
        path: "Cart",
        element: <Cart />,
      },
    ],
  },
]);