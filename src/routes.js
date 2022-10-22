import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainPage from './Pages/MainPage/MainPage';
import ErrorPage from './Pages/ErrorPage';
import ContactsCard from './Components/ContactsCard';
import Homepage from './Pages/Homepage';
import AddContactPage from './Pages/AddContactPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "contacts/:cId",
        element: <ContactsCard/>
      },
      {
        path: "/",
        element: <Homepage/>
      },
      {
        path: "/addContact",
        element: <AddContactPage/>
      },
      {
        path: "/updateContact",
        element: <AddContactPage/>
      }
    ]
  },
  {
    path: "error",
    element: <ErrorPage/> 
  }
]);

export default function Router(){
  return <RouterProvider router={router}/>
}