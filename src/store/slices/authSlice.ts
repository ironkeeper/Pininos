import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
    email: string;
    nombre: string;
    rol: string;
    id: number;
} | null;
type AuthU = {
    user: User | null;
}

// 👇 Recuperar usuario desde localStorage al iniciar
const userFromStorage = localStorage.getItem("user");

const initialState : AuthU   = {
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
   
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
       login: (state, action : PayloadAction<User>) => {
           state.user = action.payload;
           localStorage.setItem("user", JSON.stringify(action.payload)); // 👈 Guardar en localStorage
               
          
       },
       logout: (state) => {
           state.user = null;
           localStorage.removeItem("user"); // 👈 Eliminar del localStorage
       },
   },

});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;