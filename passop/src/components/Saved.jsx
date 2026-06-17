import React, { useState } from "react";
import { Pencil, Trash2, Eye, EyeOff, Copy } from "lucide-react";
import { ToastContainer, toast,Bounce } from 'react-toastify';

const Saved = ({ info, onDelete, onEdit }) => {
  const [visibleIndex, setVisibleIndex] = useState(null);

  const copyclip = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to Clipborad', {
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

  };

  return (
    <>
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
      <div className="w-full max-w-md space-y-4 mt-6">

        <h3 className="text-sm text-white/60 tracking-wide font-bold ml-4">
          Saved Passwords
        </h3>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">

          {info.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-black/30 border border-white/5 rounded-lg px-3 py-3 group hover:bg-white/5 transition"
            >
              {/* LEFT */}
              <div className="space-y-1">

                {/* Site */}
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white/90">{item.site}</p>
                  <button
                    onClick={() => copyclip(item.site)}
                    className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-white"
                  >
                    <Copy size={14} />
                  </button>
                </div>

                {/* Username */}
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-400">{item.username}</p>
                  <button
                    onClick={() => copyclip(item.username)}
                    className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-white"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-2">

                {/* Password */}
                <span className="text-xs text-gray-400 min-w-17.5 text-right">
                  {visibleIndex === index ? item.password : "••••••••"}
                </span>

                {/* Eye */}
                <button
                  onClick={() =>
                    setVisibleIndex(visibleIndex === index ? null : index)
                  }
                  className="text-gray-400 hover:text-white transition"
                >
                  {visibleIndex === index ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

                {/* Copy password */}
                <button
                  onClick={() => copyclip(item.password)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <Copy size={16} />
                </button>

                {/* Actions (hover reveal) */}
                <div className="flex items-center gap-2 ml-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => onEdit(index)}
                    className="text-gray-400 hover:text-indigo-400"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(index)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {info.length === 0 && (
            <p className="text-xs text-gray-500 text-center pt-2">
              Your saved passwords will appear here
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Saved;