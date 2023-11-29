import create from 'zustand';

interface LoadingState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

interface ErrorState {
  isError: boolean;
  errorMessage: string | null;
  setError: (error: boolean, errorMessage?: string | null) => void;
}

interface SuccessState {
  isSuccess: boolean;
  successMessage: string | null;
  setSuccess: (success: boolean, successMessage?: string | null) => void;
}

interface SearchQueryState {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

interface AppState
  extends LoadingState,
    ErrorState,
    SuccessState,
    SearchQueryState {}

const useLoadingStateStore = create<AppState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  isError: false,
  errorMessage: null,
  setError: (error, errorMessage = null) =>
    set({ isError: error, errorMessage }),

  isSuccess: false,
  successMessage: null,
  setSuccess: (success, successMessage = null) =>
    set({ isSuccess: success, successMessage }),

  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

export default useLoadingStateStore;
