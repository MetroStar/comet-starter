import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@src/types/user';

// Auth slice
interface AuthState {
  isSignedIn: boolean;
  currentUser: User | undefined;
}

const initialState: AuthState = { isSignedIn: false, currentUser: undefined };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignedIn: (state, action: PayloadAction<boolean>) => {
      state.isSignedIn = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User | undefined>) => {
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Export actions
export const { setSignedIn, setCurrentUser, signOut } = authSlice.actions;

// Configure store
export const store = configureStore({ reducer: { auth: authSlice.reducer } });

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
