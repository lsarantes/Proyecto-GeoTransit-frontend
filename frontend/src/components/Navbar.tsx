"use client";

import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

//Para Mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

const Navbar = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  return (
    <div className="border-b-2 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between sm:max mx-10 p-4 ">
        <div className="flex cursor-pointer">
          <h1
            className="text-2xl hoverTextAcentuar" 
            onClick={() => router.push("/dashboard")}
          >
            Geo
            <span className="font-bold">Transit</span>
          </h1>

          <NavigationMenu className="px-4" viewport={isMobile}>
            <NavigationMenuList>
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuTrigger className="hoverTextAcentuar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 26 26"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                    />
                  </svg>
                  <p className="pl-1">Cooperativas</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium text-black ">
                            Cooperativa
                          </div>
                          <div className="text-muted-foreground">
                            Crea, edita y elimina Cooperativas
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium text-black">
                            Encargados
                          </div>
                          <div className="text-muted-foreground">
                            Crea, edita y elimina Encargados
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuTrigger className="hoverTextAcentuar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 26 26"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                    />
                  </svg>

                  <p className="pl-1">Rutas</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium text-black">Crear</div>
                          <div className="text-muted-foreground">
                            Crea nuevas Rutas
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium text-black">
                            Administrar
                          </div>
                          <div className="text-muted-foreground">
                            Edita y elimina Rutas
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuTrigger className="hoverTextAcentuar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 26 26"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <p className="pl-1">Bahias</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium text-black">Crear</div>
                          <div className="text-muted-foreground">
                            Crea nuevas Bahías
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium text-black">
                            Administrar
                          </div>
                          <div className="text-muted-foreground">
                            Edita y elimina Bahías
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex justify-between">
          <Avatar className="h-9 w-9">
            {" "}
            {}
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Paolo Guerrero"
            />
            <AvatarFallback>PG</AvatarFallback>
          </Avatar>
          <div>           
            <NavigationMenu className="" viewport={isMobile}>
              <NavigationMenuList>
                <NavigationMenuItem className="hidden md:block">
                  <NavigationMenuTrigger className="cursor-pointer">
                    <p className="flex flex-col">
                      <span className="font-bold">Paolo Guerrero Herrero</span>
                      <span className="text-muted-foreground">
                        Encargado MTI
                      </span>
                    </p>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#" className="hoverTextAcentuar ">
                            Cerrar sesion
                          </Link>
                        </NavigationMenuLink>

                        <NavigationMenuLink asChild>
                          <Link href="#" className="hoverTextAcentuar">
                            Configuración
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    <Separator/>
    </div>
  );
};

export default Navbar;
