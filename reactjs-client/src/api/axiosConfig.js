import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export default axios.create({
    baseURL,
    headers: { "ngrok-skip-browser-warning": "true" }
});
