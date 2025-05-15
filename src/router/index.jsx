import { createHashRouter } from "react-router-dom";

import FrontLayout from "../layouts/FrontLayout";
import Homepage from "../pages/HomePage";
import Calculator from "../pages/Calculator";
import MutliCalculator from "../pages/MutliCalculator";
import NotFound from "../pages/NotFound";

const router = createHashRouter([
  {
    path: '/',
    element: <FrontLayout />,
    children: [
      {
        path: '',
        element: <Homepage />,
      },
      {
        path: 'maintain-calculator',
        element: <Calculator />,
      },
      {
        path: 'multi-calculator',
        element: <MutliCalculator />,
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

export default router;