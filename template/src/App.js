import {Routes, Route, Navigate} from "react-router-dom";
import pages from './pages';
import MainLayout from './MainLayout';
import {globalPreset} from "./preset";
import './index.scss';

const {Home, Error, NotFound} = pages;
const App = () => {
    return <Routes>
        <Route path="/" element={<MainLayout preset={globalPreset} themeToken={globalPreset.themeToken} paths={[]}/>}>
            <Route index element={<Home/>}/>
            <Route path="/error" element={<Error/>}/>
            <Route path="/404" element={<NotFound/>}/>
            <Route path="*" element={<Navigate to="/404"/>}/>
        </Route>
    </Routes>;
};

export default App;
