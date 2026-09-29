import { create } from "zustand";

type AuthState = {
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"), // inicializa desde localStorage
    
    setToken: (token) => {
        localStorage.setItem("token", token);

        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }

        set({ token });
    },

    clearToken: () => {
        localStorage.removeItem("token");
        set({ token: null });
    },
}));