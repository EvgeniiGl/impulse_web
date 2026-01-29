// src/hooks/useAuth.ts
import {useAppSelector} from '@store/store';
import {logoutUser, selectIsAuthenticated, User} from "@store/slices/authSlice";

interface UseAuthReturn {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export const useAuth = (): UseAuthReturn => {
    const {isAuthenticated, loading, error, user} = useAppSelector((state) => {
        return state.auth
    });

    return <UseAuthReturn>{
        user,
        isAuthenticated,
        loading,
        error,
    };
};
