import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar/component/Navbar"
import Footer from '../components/footer/Footer'
import './root.css'
export default function Root() {
  return (
    <>
    <div className="root">
    <Navbar/>
    <Outlet/>
    <Footer/>
    </div>

    </>

  )
}
