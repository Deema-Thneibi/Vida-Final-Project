import { Outlet } from "react-router-dom"
import NestedNav from '../../pages/nestedNav/components/nestedNav/NestedNav'
import './nestedRoot.css'
export default function Root() {
  return (
    <>
    <div className='nested'>
          <NestedNav/>
          <Outlet/>
    </div>
    </>

  )
}