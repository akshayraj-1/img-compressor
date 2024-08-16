import {Link, NavLink} from "react-router-dom";

function Navbar() {
    return (
        <nav className="fixed top-0 z-[5] flex justify-between items-center w-full px-5 sm:px-8 py-5 bg-secondary shadow-navBar">
            <Link to="/">
                <img className="h-[1.1rem]" src="/images/logo.svg" alt="logo"/>
            </Link>
            <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-[0.96rem] font-medium">
                <NavLink to="/" className={({isActive}) => isActive ? "text-accent" : "text-textPrimary hover:text-accent"}>Home</NavLink>
                <NavLink to="/api" className={({isActive}) => isActive ? "text-accent" : "text-textPrimary hover:text-accent"}>Get API</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;