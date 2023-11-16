import React, { ReactNode } from 'react';
import NavBar from './NavBar/Navbar'; // Assuming you have a NavBar component

interface LayoutProps {
    children: ReactNode;
}

const whatIsThis: () => void = () => {
    console.log("what is this");
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    whatIsThis();
    return (
        <div style = {{display:"flex"}}>
            <NavBar />
            {children}
        </div>
    );
};

export default Layout;