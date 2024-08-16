import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center gap-2 w-screen px-5 sm:px-8 py-10 bg-footer">
            <Link to="/">
                <img className="h-5" src="/images/logo.svg" alt="logo"/>
            </Link>
            <p className="text-sm text-textSecondary text-center mt-2">Copyright © 2022. All rights reserved.</p>
        </footer>
);
}

export default Footer;