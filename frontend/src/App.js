import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import axios from "axios";

//Page & Component Imports
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useTodosContext } from "./hooks/useTodosContext";


function App() {
    
    const { dispatch } = useTodosContext();
    let lastestSearch = '';
    // Searching task handle
    const searchTodos = async (value) => {
        try {
            lastestSearch = value; //store lastest input
            let response;

            if (!value) {
                response = await axios.get(`${process.env.REACT_APP_API_URL}/api/todos`);
            } else {
            response = await axios.get(`/api/todos?q=${value}`);
            }

            if (lastestSearch !== value) return;

            dispatch({type: 'SET_TODOS', payload: response.data.data });
            console.log("Search API Response:", response.data.data);
            
        } catch (error) {
                console.log(error);
            }
    };

    return (
        <div className="App">
            <BrowserRouter>
            <Navbar onSearch={searchTodos}/>
                <div className="pages">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;