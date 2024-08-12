import {Link, NavLink} from "react-router-dom";
import Button from "../UI/Button.jsx";

function Navbar() {
    return (
        <nav className="absolute top-0 z-[5] flex justify-between items-center w-full px-5 sm:px-8 py-4 bg-secondary shadow-navBar">
            <Link className="text-base sm:text-lg text-accent font-semibold" to="/">imgCompressor</Link>
            <NavLink
                to="/api">
                <Button type="tertiary" icon="fi fi-sr-terminal" label="Get API" className="text-[0.8rem] sm:text-sm font-normal"/>
            </NavLink>
        </nav>
    );
}

export default Navbar;