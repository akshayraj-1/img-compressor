import {Link} from "react-router-dom";
import _github_icon from "../../assets/images/_github_icon.svg";

function Navbar() {

    return (
        <nav
            className="sticky top-0 z-[5] flex justify-between items-center w-full px-5 sm:px-8 py-5 bg-secondary shadow-navBar">
            <Link to="/">
                <img className="h-[1.1rem]" src="/images/logo.svg" alt="logo"/>
            </Link>
            <a href="https://github.com/akshayraj-1/ImageCompressor" target="_blank">
                <img className="h-6"
                     src={_github_icon}
                     alt="github"
                />
            </a>
        </nav>
    );
}

export default Navbar;