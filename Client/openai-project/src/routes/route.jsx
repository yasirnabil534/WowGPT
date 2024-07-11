import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home, TextPrompt, StreamPrompt } from "../pages";

const Approutes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/text-prompt",
          element: <TextPrompt />,
        },
        {
          path: "/stream-prompt",
          element: <StreamPrompt />,
        },
      ],
    },
  ]);
  return (<RouterProvider router={routes} />);
};

export default Approutes;

