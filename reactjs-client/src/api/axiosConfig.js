import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export default axios.create({
    baseURL,
    headers: { "ngrok-skip-browser-warning": "true" }
});
