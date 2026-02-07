import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';

function App() {
    const basename = import.meta.env.MODE === 'production' ? '/G-Note-Landing-Page' : '/';

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
