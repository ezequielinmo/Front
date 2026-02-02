import NavbarA from './NavbarA';
//import NavbarB from './NavbarB';
import NavbarC from './NavbarC';
import './styles.css';


function Navbar() {

    return (
        <nav className="navbar">
            <div className='sub-cont-navbar'>
                <div className='cont-navbar-navA'>
                    <NavbarA />
                </div>
                <div className='cont-navbars-byc'>
                    {/* <div className='cont-navbar-navB'>
                        <NavbarB />
                    </div> */}
                    <div className='cont-navbar-navC'>
                        <NavbarC />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
