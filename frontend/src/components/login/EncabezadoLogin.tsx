// components/login/EncabezadoLogin.tsx

import React from 'react';
import Link from 'next/link';

const EncabezadoLogin = () => {
  return (
    <div className="text-center space-y-3">
      <Link href="/" className="inline-block">
        <div className="relative group">
          <div
            className="absolute inset-0 bg-[#605AEA] rounded-xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"
            style={{ boxShadow: "0 0 40px rgba(96, 90, 234, 0.8)" }}
          ></div>
          <div
            className="relative w-16 h-16 bg-gradient-to-br from-[#605AEA] to-[#4f51d8] rounded-xl flex items-center justify-center shadow-lg transition-all transform hover:scale-125 duration-300 mx-auto border border-[#605AEA]/50"
            style={{
              boxShadow: "0 10px 30px rgba(96, 90, 234, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            }}
          >
            <span className="text-3xl">🚌</span>
          </div>
        </div>
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-white">Geo Transit</h1>
        <p className="text-xs text-slate-400 mt-1">Acceso a la plataforma de seguimiento</p>
      </div>
    </div>
  );
};

export default EncabezadoLogin;