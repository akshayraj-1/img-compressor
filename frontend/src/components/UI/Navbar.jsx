import {Link, NavLink} from "react-router-dom";

function Navbar() {
    return (
        <nav className="absolute top-0 z-[5] flex justify-between items-center w-full px-5 sm:px-8 py-5 bg-secondary shadow-navBar">
            <span className="text-base sm:text-lg text-accent font-semibold">
                <Link to="/">imgCompressor</Link>
            </span>
            <div className="sm:flex justify-center items-center gap-4 hidden">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;