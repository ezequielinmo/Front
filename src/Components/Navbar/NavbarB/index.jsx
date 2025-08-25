import React from 'react'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import './style.css';


function NavbarB() {
    return (
        <div className='cont-navbar-B'>
            <div className='cont-navbar-B-items'>
                <WhatsAppIcon sx={{ fontSize: 15, color: 'black', marginRight: '5px' }} />
                <InstagramIcon sx={{ fontSize: 15, color: 'black' }} />
            </div>
            <div className='cont-navbar-B-items'>
                <LocalPhoneIcon sx={{ fontSize: 15, color: 'black', marginLeft: '10px', marginRight: '5px' }} />
                <p className='p-tel'>2235554552</p>
            </div>
            <div className='cont-navbar-B-items'>
                <EmailIcon sx={{ fontSize: 15, color: 'black', marginRight: '5px' }} />
                <a href="mailto: info@ortizlizmar" className='a-email-navSup'>
                    <p className='p-mail'>info@ezequieljosepropiedades.com</p>
                </a>
            </div>
        </div>
    )
}

export default NavbarB