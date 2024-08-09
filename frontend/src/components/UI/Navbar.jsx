import {Link, NavLink} from "react-router-dom";

function Navbar() {
    return (
        <nav className="absolute top-0 z-[5] flex justify-between items-center w-full px-5 sm:px-8 py-4 bg-secondary shadow-navBar">
            <Link className="text-base sm:text-lg text-accent font-semibold" to="/">imgCompressor</Link>
            <NavLink
                className="flex items-center justify-center gap-1.5 text-[0.8rem] sm:text-sm font-normal text-accent px-4 py-1.5 sm:py-2 border border-accentLight rounded-lg hover:bg-button hover:text-white transition"
                to="/api">
                <i className="fi fi-rs-terminal -mb-1"></i>
                Get API
            </NavLink>
        </nav>
    );
}

export default Navbar;