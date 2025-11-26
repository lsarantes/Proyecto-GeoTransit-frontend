"use client";

export default function LogoGiratorio() {
  return (
    <div className="flex justify-center">
      <div
        className="relative w-28 h-28 bg-gradient-to-br from-[#2275C3] to-[#1a5a9e] rounded-3xl flex items-center justify-center shadow-2xl border-2 border-[#C1DAF6]/60 hover:shadow-[0_20px_60px_rgba(34,117,195,0.4)] hover:scale-110 transition-all duration-300 animate-rotate-3d"
        style={{
          boxShadow: "0 20px 60px rgba(34, 117, 195, 0.3), inset 0 1px 0 rgba(193, 218, 246, 0.3)",
        }}
      >
        <span className="text-6xl drop-shadow-lg">🚌</span>
      </div>
    </div>
  );
}
