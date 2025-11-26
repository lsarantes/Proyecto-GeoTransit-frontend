"use client";

export default function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left accent */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #2275C3, transparent)",
          filter: "blur(80px)"
        }}
      />

      {/* Bottom right accent */}
      <div 
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #605AEA, transparent)",
          filter: "blur(80px)"
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(0deg, #2275C3 1px, transparent 1px), linear-gradient(90deg, #2275C3 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />
    </div>
  );
}
