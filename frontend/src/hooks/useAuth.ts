// src/hooks/useAuth.ts
import {useAppSelector} from '../store/store';
import {User} from '../store/slices/userSlice';

interface UseAuthReturn {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export const useAuth = (): UseAuthReturn => {
    const {currentUser, isAuthenticated, loading, error} = useAppSelector(
        (state) => state.user
    );

    return {
        user: currentUser,
        isAuthenticated,
        loading,
        error,
    };
};
