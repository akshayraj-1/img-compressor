import './main.scss';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import App from './App.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>

        </Route>
    )
)


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);
