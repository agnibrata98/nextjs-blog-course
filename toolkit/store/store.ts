import { Cookies } from 'react-cookie';
import { create } from 'zustand'

interface UserState {
  token: string | null; // Add token property
  setToken: (token: string | null) => void; // Add setToken function
  user: any;
  setUser:()=>void
}

export const useUserStore = create<UserState>((set) => (
  {
    token: '',
    user:'',
    setToken: () => {
      const cookie = new Cookies()
      set({ token: cookie.get("token") })
    },
    setUser:()=>{
      const user = localStorage.getItem("user");
      if (user) {
        set({ user: JSON.parse(user) });
      }
    }
  }
));
