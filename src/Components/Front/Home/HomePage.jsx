import { Link } from "react-router-dom"

export const HomePage = () => {
  return (
    <>
    <div className="text-black text-xl">This is a first page</div>
    <Link className="text-gray-600 text-lg " to="/admin">go admin</Link>
    </>
  )
}
