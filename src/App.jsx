import { Outlet } from 'react-router-dom';
import PageNav from "./components/PageNav.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return (
        <div>
            <PageNav />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;