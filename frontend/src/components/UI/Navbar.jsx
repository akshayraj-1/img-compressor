import {Link} from "react-router-dom";
import img_github_icon from "../../assets/images/img_github_icon.svg";

function Navbar() {

    return (
        <nav
            className="sticky top-0 z-[5] flex justify-between items-center w-full px-5 sm:px-8 py-5 bg-colorSurface shadow-navBar">
            <Link to="/">
                <img className="h-5" src="/images/logo.svg" alt="logo"/>
            </Link>
            <a href="https://github.com/akshayraj-1/img-compressor" target="_blank">
                <img className="h-6"
                     src={img_github_icon}
                     alt="github"
                />
            </a>
        </nav>
    );
}

export default Navbar;