import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Saved from "./Saved";
import { ToastContainer, toast,Bounce } from 'react-toastify';
export default function PasswordManagerUI() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
  site: "",
  username: "",
  password: ""
});
    const [password, setPassword] = useState(()=>{
      const stored=localStorage.getItem("passwordArray")
      return stored ? JSON.parse(stored) : []
    })
    const [editindex, setEditindex] = useState(null)
    useEffect(()=>{
      localStorage.setItem("passwordArray",JSON.stringify(password))

    },[password])
const handlesave=()=>{
    if(!form.site || !form.username || !form.password) return;
    if(editindex!==null){
      setPassword(prev=>prev.map((item,i)=>(i===editindex ? form:item)))
      setEditindex(null)
    }
    else{
      setPassword((prev)=>[...prev,form])
      
    }
    toast('Password Saved', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });
    setForm({
        site:"",
        username:"",
        password:"",
    })
}
const handleDelete=(index)=>{
  setPassword(prev=>prev.filter((_,i)=>i!==index));
}
const handleEdit=(index)=>{
  setForm(password[index]);
  setEditindex(index)
}
  return (
    <div className="relative w-full max-w-md p-px rounded-2xl bg-linear-to-b from-white/20 to-white/5">
      <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
  <div className="backdrop-blur-2xl bg-black/40 rounded-2xl p-6 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
    
    <h2 className="text-xl font-semibold mb-6 text-white/90">
      Save Credentials
    </h2>

    <div className="space-y-4">
        
        {/* Website */}
        <input
          type="text"
          placeholder="Website (example.com)"
          value={form.site}
          onChange={(e) => setForm({...form,site: e.target.value})}
          className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 rounded-lg outline-none placeholder:text-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition"
        />

        {/* Username */}
        <input
          type="text"
          placeholder="Username / Email"
          value={form.username}
          onChange={(e)=>setForm({...form,username:e.target.value})}
          className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 rounded-lg outline-none placeholder:text-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e)=>setForm({...form,password:e.target.value})}
            className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 rounded-lg outline-none pr-10 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Button */}
        <button className="w-full bg-indigo-500/80 hover:bg-indigo-500 text-white py-2.5 rounded-lg font-medium transition shadow-lg shadow-indigo-500/20" onClick={handlesave}>
          Save Password
        </button>
  </div>
</div>
    <Saved info={password} onDelete={handleDelete} onEdit={handleEdit}/>
</div>
  );
}