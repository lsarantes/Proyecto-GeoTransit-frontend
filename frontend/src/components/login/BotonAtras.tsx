// components/login/BotonAtras.tsx

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BotonAtras = () => {
  return (
    <Link href="/" className="absolute top-8 left-8 z-20">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-[#605AEA] transition-colors duration-200 hover:bg-slate-900/50">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Atrás</span>
      </button>
    </Link>
  );
};

export default BotonAtras;