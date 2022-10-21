import { createBrowserRouter } from 'react-router-dom';

import MainPage from './Pages/MainPage/MainPage';
import ErrorPage from './Pages/ErrorPage';
import ContactsCard from './Components/ContactsCard';
import Homepage from './Pages/Homepage';

const router = createBrowserRouter([

    {
      path: "/",
      element: <MainPage></MainPage>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "contacts/:cId",
          element: <ContactsCard/>
        },
        {
          path: "/",
          element: <Homepage/>
        }
      ]
    },
    {
      path: "error",
      element: <ErrorPage/>
    }
  ]);

  export default router;