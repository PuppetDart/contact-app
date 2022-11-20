import { createHashRouter, RouterProvider } from 'react-router-dom';

import MainPage from './Pages/MainPage/MainPage';
import ErrorPage from './Pages/ErrorPage';
import ContactsCard from './Components/ContactsCard';
import Homepage from './Pages/Homepage';
import AddContactPage from './Pages/AddContactPage';
import UpdateContactPage from './Pages/UpdateContactPage';

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Homepage/>
      },
      {
        path: "contacts/:cId",
        element: <ContactsCard/>
      },
      {
        path: "/addContact",
        element: <AddContactPage/>
      },
      {
        path: "/updateContact/:cId",
        element: <UpdateContactPage/>
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