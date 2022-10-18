
import { createBrowserRouter } from 'react-router-dom';

import MainPage from './Pages/MainPage';
import ErrorPage from './Pages/ErrorPage';
import ContactsCard from './Pages/ContactsCard';

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage></MainPage>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "contacts/:cId",
          element: <ContactsCard/>
        }
      ]
    },
    {
      path: "error",
      element: <ErrorPage/>
    }
  ]);

  export default router;