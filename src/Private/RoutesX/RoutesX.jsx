import { useRoutes } from "react-router-dom"
import {Glavni, O_nas, Kategory, Akkaunt, Avtor} from "../Pages"
import { Tovar_Page } from "../Pages/Tovar_Page"
export const RoutesX = () => {
    const route = [
        {
            path: "/",
            element: <Glavni/>
        },
        {
            path: "/Главная",
            element: <Glavni/>
        },
        {
            path: "/Онас",
            element: <O_nas/>
        },
        {
            path: "/Категории/*",
            element: <Kategory/>
        },
        {
            path: "/Akkaunt/*",
            element: <Akkaunt/>
        },
        {   path: "/tovar/:id",
            element: <Tovar_Page/>
        },
        {
            path: "/avtor/:id",
            element: <Avtor/>
        }
    ]
    return useRoutes(route)
}