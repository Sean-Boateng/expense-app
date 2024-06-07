import axios from 'axios';

const AuthService = {
    refreshAccessToken: async (): Promise<string | null> => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                // Handle missing refresh token (e.g., redirect to login)
                return null;
            }

            const response = await axios.post<{ access_token: string }>('http://127.0.0.1:8000/api/auth/token/refresh/', {
                refresh: refreshToken,
            });

            const newAccessToken = response.data.access_token;
            localStorage.setItem('accessToken', newAccessToken);

            return newAccessToken;
        } catch (error) {
            console.error('Error refreshing access token:', error);
            // Handle token refresh failure (e.g., redirect to login)
            return null;
        }
    },
};

export default AuthService;
