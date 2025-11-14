// components/login/LoginSocial.tsx

import React from 'react';
import { Button } from '@/components/ui/button';

// Íconos SVG para no depender de librerías externas
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.544 2.914 1.19.092-.926.35-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.163 20 14.413 20 10c0-5.523-4.477-10-10-10z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 0C4.478 0 0 4.478 0 10c0 4.99 3.657 9.128 8.438 9.879V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.128 20 14.99 20 10c0-5.522-4.478-10-10-10z" />
  </svg>
);


const LoginSocial = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="outline"
        className="bg-slate-800/50 border-slate-700 hover:border-[#605AEA]/50 hover:bg-slate-700/50 text-slate-300 rounded-lg transition-all duration-200"
      >
        <GithubIcon />
      </Button>
      <Button
        type="button"
        variant="outline"
        className="bg-slate-800/50 border-slate-700 hover:border-[#605AEA]/50 hover:bg-slate-700/50 text-slate-300 rounded-lg transition-all duration-200"
      >
        <FacebookIcon />
      </Button>
    </div>
  );
};

export default LoginSocial;