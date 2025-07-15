import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apolloClient } from '@/lib/apollo';
import { GET_AUTH_USER, LOGIN, SIGN_UP, LOGOUT } from '@/graphql/user';
import { User, LoginInput, SignUpInput } from '@/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunks
export const fetchAuthUser = createAsyncThunk(
  'auth/fetchAuthUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: GET_AUTH_USER,
        fetchPolicy: 'network-only',
      });
      return data.authUser;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (input: LoginInput, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: LOGIN,
        variables: { input },
        update: (cache, { data: loginData }) => {
          if (loginData?.login) {
            cache.writeQuery({
              query: GET_AUTH_USER,
              data: { authUser: loginData.login },
            });
          }
        },
      });
      return data.login;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (input: SignUpInput, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: SIGN_UP,
        variables: { input },
        update: (cache, { data: signUpData }) => {
          if (signUpData?.signUp) {
            cache.writeQuery({
              query: GET_AUTH_USER,
              data: { authUser: signUpData.signUp },
            });
          }
        },
      });
      return data.signUp;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign up failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await apolloClient.mutate({
        mutation: LOGOUT,
        update: (cache) => {
          cache.writeQuery({
            query: GET_AUTH_USER,
            data: { authUser: null },
          });
        },
      });
      // Clear Apollo cache
      await apolloClient.clearStore();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Auth User
    builder
      .addCase(fetchAuthUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.error = null;
      })
      .addCase(fetchAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Sign Up User
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Logout User
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
