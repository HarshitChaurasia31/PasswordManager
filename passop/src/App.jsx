import PasswordManagerUI from "./components/PasswordManagerUI";
import Saved from "./components/Saved";
export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      
      {/* Grid Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]" />

      {/* Glow Layer */}
      <div className="absolute left-1/2 top-[-10%] -translate-x-1/2 h-225 w-225 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#ffffff22,#000)]" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <PasswordManagerUI />
      </div>
    </div>
  );
}