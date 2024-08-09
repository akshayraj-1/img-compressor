import {Link, NavLink} from "react-router-dom";

function Navbar() {
    return (
        <nav className="absolute top-0 z-[5] flex justify-between items-center w-full px-5 sm:px-8 py-4 bg-secondary shadow-navBar">
            <Link className="text-base sm:text-lg text-accent font-semibold" to="/">imgCompressor</Link>
            <div className="sm:flex justify-center items-center gap-7 hidden font-medium">
                <NavLink
                    className="flex items-center justify-center gap-1.5 text-sm text-accent px-4 py-2 border border-accentLight rounded-lg hover:bg-button hover:text-white transition"
                    to="/about">
                    <i className="fi fi-rs-terminal -mb-1"></i>
                    Get API
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;