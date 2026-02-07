import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';

function App() {
    // Dynamically detect basename for GitHub Pages or Custom Domain
    const basename = window.location.pathname.startsWith('/G-Note-Landing-Page')
        ? '/G-Note-Landing-Page'
        : '/';

    return (
        <Router basename={basename}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
