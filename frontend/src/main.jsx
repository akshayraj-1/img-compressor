import './main.scss';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import App from './App.jsx';
import Home from "./pages/Home.jsx";
import API from "./pages/API.jsx";
import Error from "./pages/Error.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index element={<Home/>}/>
            <Route path="/api" element={<API/>}/>
            <Route path="*" element={<Error/>}/>
        </Route>
    )
);


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
);
