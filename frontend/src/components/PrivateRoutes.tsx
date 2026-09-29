// components/PrivateRoute.tsx
import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import type { ReactNode } from "react";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const token = useAuthStore((state) => state.token);
    return token ? children : <Navigate to="/login" replace />;
};
