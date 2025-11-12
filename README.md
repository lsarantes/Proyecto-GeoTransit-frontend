# PARTE FRONTEND GEO TRANSIT 
🚀 GeoTransit 
Bienvenido al repositorio del proyecto GeoTransit. Este documento contiene toda la información necesaria para que puedas configurar tu entorno de desarrollo y empezar a contribuir.

🛠️ Stack de Tecnologías
Este proyecto está construido con las siguientes tecnologías:

Framework: Next.js

Librería UI: React

Estilos CSS: Tailwind CSS

Componentes UI: Shadcn/ui

Iconos: Heroicons

💻 Pasos para Iniciar
1. Instala las Dependencias
Abre una terminal en la carpeta del proyecto y ejecuta:

Bash

npm install
¿Qué hace esto? Este comando lee el archivo package.json e instala automáticamente todo lo que necesitamos: Next.js, React, Tailwind y Heroicons.

2. Ejecuta el Servidor de Desarrollo
Una vez termine la instalación, ejecuta:

Bash

npm run dev
¡Eso es todo! Abre http://localhost:3000 en tu navegador para ver la aplicación.

🛠️ Cómo Trabajamos con los Componentes
Esto es lo más importante que debes saber sobre nuestro stack de UI:

🔵 Shadcn/ui (Nuestros Componentes: Botones, Avatares, Menús)
Importante: Shadcn NO se instala con npm. Los componentes son archivos de código que viven dentro del repositorio.

Para USAR componentes existentes: ¡No necesitas hacer nada! Los componentes que ya hemos agregado (como Button, Avatar, NavigationMenu) ya están en la carpeta components/ui. Solo impórtalos y úsalos.

Para AGREGAR un componente NUEVO (que no existe): Si necesitas un componente que aún no está en el proyecto (ejemplo: un AlertDialog), eres tú quien debe ejecutar el comando para añadirlo:

Bash

npx shadcn-ui@latest add alert-dialog
Esto creará los nuevos archivos en components/ui. Asegúrate de hacer git commit y git push de esos nuevos archivos para que el resto del equipo los reciba.

🔶 Heroicons (Nuestros Iconos)
Heroicons SÍ es un paquete de npm. El comando npm install que ejecutaste en el primer paso ya lo instaló por ti.

Para USAR un ícono: Simplemente impórtalo desde @heroicons/react/24/solid (o outline) en el archivo .jsx donde lo necesites.