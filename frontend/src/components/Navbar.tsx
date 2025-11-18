'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ChevronDown, Building2, MapPin, MapPinned, Menu, X, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

const Navbar = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({
    cooperativas: false,
    rutas: false,
    bahias: false,
    usuario: false,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const closeTimerRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

 

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const openDropdown = (menu: string) => {
    if (closeTimerRef.current[menu]) {
      clearTimeout(closeTimerRef.current[menu]);
    }
    setOpenDropdowns((prev) => ({ ...prev, [menu]: true }));
  };

  const closeDropdown = (menu: string) => {
    closeTimerRef.current[menu] = setTimeout(() => {
      setOpenDropdowns((prev) => ({ ...prev, [menu]: false }));
    }, 150);
  };

  const limpiarDropdown = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdowns({
    cooperativas: false,
    rutas: false,
    bahias: false,
    usuario: false,
  });
  };
  return (
    <nav className="sticky top-0 z-40 border-b backdrop-blur-sm bg-white/95" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <div
            className="flex cursor-pointer items-center gap-8"
          >
            <div className="flex items-baseline gap-1 group"

              onClick={() => { router.push('/dashboard'); limpiarDropdown()}}
            >
              <span className="text-xl font-normal" style={{ color: '#000000' }}>Geo</span>
              <span className="text-xl font-semibold transition-colors group-hover:text-accent" style={{ color: 'var(--colorPrimary)' }}>Transit</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex desktop-navbar gap-1">
              {/* Cooperativas */}
              <div
                className="relative"
                ref={(el) => {
                  dropdownRefs.current.cooperativas = el;
                }}
                onMouseEnter={() => openDropdown('cooperativas')}
                onMouseLeave={() => closeDropdown('cooperativas')}
              >
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-secondary/50 text-sm font-medium group"
                  style={{ color: 'var(--foreground)' }}

                >
                  <Building2 className="w-4 h-4 group-hover:text-primary transition-colors" />
                  <span>Cooperativas</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openDropdowns.cooperativas ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {openDropdowns.cooperativas && (
                  <div
                    className="absolute left-0 mt-2 w-64 rounded-xl shadow-lg z-50 py-2 animate-fade-in border"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)'
                    }}
                  >
                    <Link
                      href="/Cooperativa/Gestionar_Cooperativa"
                      className="block px-4 py-3 text-sm transition-all rounded-md mx-2 hover:bg-secondary/40"
                      style={{
                        color: 'var(--foreground)'
                      }}
                    >
                      <div className="font-semibold">Gestionar Cooperativa</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        Crea, edita y elimina Cooperativas
                      </div>
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-3 text-sm transition-all rounded-md mx-2 hover:bg-secondary/40"
                      style={{ color: 'var(--foreground)' }}
                    >
                      <div className="font-semibold">Gestionar Encargados</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        Crea, edita y elimina Encargados
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Rutas */}
              <div
                className="relative"
                ref={(el) => {
                  dropdownRefs.current.rutas = el;
                }}
                onMouseEnter={() => openDropdown('rutas')}
                onMouseLeave={() => closeDropdown('rutas')}
              >
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-secondary/50 text-sm font-medium group"
                  style={{ color: 'var(--foreground)' }}
                >
                  <MapPin className="w-4 h-4 group-hover:text-primary transition-colors" />
                  <span>Rutas</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openDropdowns.rutas ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {openDropdowns.rutas && (
                  <div
                    className="absolute left-0 mt-2 w-64 rounded-xl shadow-lg z-50 py-2 animate-fade-in border"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)'
                    }}
                  >
                    <Link
                      href="#"
                      className="block px-4 py-3 text-sm transition-all rounded-md mx-2 hover:bg-secondary/40"
                      style={{ color: 'var(--foreground)' }}
                    >
                      <div className="font-semibold">Crear</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        Crea nuevas Rutas
                      </div>
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-3 text-sm transition-all rounded-md mx-2 hover:bg-secondary/40"
                      style={{ color: 'var(--foreground)' }}
                    >
                      <div className="font-semibold">Administrar</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        Edita y elimina Rutas
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Bahías */}
              <div
                className="relative"
                ref={(el) => {
                  dropdownRefs.current.bahias = el;
                }}
                onMouseEnter={() => openDropdown('bahias')}
                onMouseLeave={() => closeDropdown('bahias')}
              >
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-secondary/50 text-sm font-medium group"
                  style={{ color: 'var(--foreground)' }}
                >
                  <MapPinned className="w-4 h-4 group-hover:text-primary transition-colors" />
                  <span>Bahías</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openDropdowns.bahias ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {openDropdowns.bahias && (
                  <div
                    className="absolute left-0 mt-2 w-64 rounded-xl shadow-lg z-50 py-2 animate-fade-in border"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)'
                    }}
                  >
                    <Link
                      href="#"
                      className="block px-4 py-3 text-sm transition-all rounded-md mx-2 hover:bg-secondary/40"
                      style={{ color: 'var(--foreground)' }}
                    >
                      <div className="font-semibold">Crear</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        Crea nuevas Bahías
                      </div>
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-3 text-sm transition-all rounded-md mx-2 hover:bg-secondary/40"
                      style={{ color: 'var(--foreground)' }}
                    >
                      <div className="font-semibold">Administrar</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        Edita y elimina Bahías
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex desktop-navbar items-center gap-6">
            {/* User Menu */}
            <div
              className="relative flex items-center gap-3 cursor-pointer group px-3 py-2 rounded-lg hover:bg-secondary/30 transition-colors"
              onMouseEnter={() => openDropdown('usuario')}
              onMouseLeave={() => closeDropdown('usuario')}
            >
              <Avatar className="h-9 w-9 border-2" style={{ borderColor: 'var(--colorPrimary)' }}>
                <AvatarImage src="https://github.com/shadcn.png" alt="Paolo Guerrero" />
                <AvatarFallback style={{ color: 'white', backgroundColor: 'var(--colorPrimary)' }}>PG</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>
                  Paolo Guerrero
                </p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  Encargado MTI
                </p>
              </div>

              {/* User Menu Dropdown */}
              {openDropdowns.usuario && (
                <div
                  className="absolute right-0 top-full mt-3 w-56 rounded-xl shadow-lg z-50 py-2 border animate-fade-in"
                  style={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 text-sm transition-all rounded-lg mx-2 hover:bg-secondary/40"
                    style={{ color: 'var(--foreground)' }}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configuración</span>
                  </Link>
                  <div className="my-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
                  <div className='mr-4'>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-3 text-sm transition-all rounded-lg mx-2"
                      style={{
                        color: 'var(--destructive)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-navbar p-2 rounded-lg transition-colors hover:bg-secondary/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: 'var(--foreground)' }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-navbar border-t pb-4 animate-fade-in" style={{ borderColor: 'var(--border)' }}>
            <div className="py-3 space-y-2">
              {/* Mobile Cooperativas */}
              <button
                onClick={() => setOpenDropdowns((prev) => ({ ...prev, cooperativas: !prev.cooperativas }))}
                className="w-full text-left px-4 py-2.5 rounded-lg transition-colors flex items-center justify-between text-sm font-medium hover:bg-secondary/40"
                style={{ color: 'var(--foreground)' }}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Cooperativas</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdowns.cooperativas ? 'rotate-180' : ''}`} />
              </button>
              {openDropdowns.cooperativas && (
                <div className="pl-6 space-y-1">
                  <Link href="/Cooperativa/Gestionar_Cooperativa" onClick={() => limpiarDropdown()} className="block py-2 text-sm" style={{ color: 'var(--foreground)' }}>
                    Gestionar Cooperativa
                  </Link>
                  <Link href="#" onClick={() => limpiarDropdown()} className="block py-2 text-sm" style={{ color: 'var(--foreground)' }}>
                    Gestionar Encargados
                  </Link>
                </div>
              )}

              {/* Mobile Rutas */}
              <button
                onClick={() => setOpenDropdowns((prev) => ({ ...prev, rutas: !prev.rutas }))}
                className="w-full text-left px-4 py-2.5 rounded-lg transition-colors flex items-center justify-between text-sm font-medium hover:bg-secondary/40"
                style={{ color: 'var(--foreground)' }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Rutas</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdowns.rutas ? 'rotate-180' : ''}`} />
              </button>
              {openDropdowns.rutas && (
                <div className="pl-6 space-y-1">
                  <Link href="#" onClick={() => limpiarDropdown()} className="block py-2 text-sm" style={{ color: 'var(--foreground)' }}>
                    Crear
                  </Link>
                  <Link href="#" onClick={() => limpiarDropdown()} className="block py-2 text-sm" style={{ color: 'var(--foreground)' }}>
                    Administrar
                  </Link>
                </div>
              )}

              {/* Mobile Bahías */}
              <button
                onClick={() => setOpenDropdowns((prev) => ({ ...prev, bahias: !prev.bahias }))}
                className="w-full text-left px-4 py-2.5 rounded-lg transition-colors flex items-center justify-between text-sm font-medium hover:bg-secondary/40"
                style={{ color: 'var(--foreground)' }}
              >
                <div className="flex items-center gap-2">
                  <MapPinned className="w-4 h-4" />
                  <span>Bahías</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdowns.bahias ? 'rotate-180' : ''}`} />
              </button>
              {openDropdowns.bahias && (
                <div className="pl-6 space-y-1">
                  <Link href="#" onClick={() => limpiarDropdown()} className="block py-2 text-sm" style={{ color: 'var(--foreground)' }}>
                    Crear
                  </Link>
                  <Link href="#" onClick={() => limpiarDropdown()} className="block py-2 text-sm" style={{ color: 'var(--foreground)' }}>
                    Administrar
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile User Section */}
            <div className="border-t pt-4 mt-4 px-4" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10 border-2" style={{ borderColor: 'var(--colorPrimary)' }}>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Paolo Guerrero" />
                  <AvatarFallback style={{ color: 'white', backgroundColor: 'var(--colorPrimary)' }}>PG</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>
                    Paolo Guerrero
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    Encargado MTI
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-all font-medium"
                style={{ color: 'var(--destructive)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
