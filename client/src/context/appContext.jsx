import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl

const appContext = createContext()

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()

    const [token, setToken] = useState(null);
    const [blog, setBlog] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        
        fetchBlogs();
        
        const token = localStorage.getItem('token');

        if (token) {
            setToken(token)
            axios.defaults.headers.common['Authorization'] = token
        }

    }, [])

    // Function fro fetch blogs
    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all')
            if (data.success) {
                setBlog(data.blogs)
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);

        }
    }






    const value = {
        axios, token, setToken, blog, setBlog, input, setInput, navigate
    }

    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(appContext)
}