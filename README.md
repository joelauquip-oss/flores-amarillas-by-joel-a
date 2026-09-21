# Flores amarillas — 21 de septiembre

Sitio web estático listo para compartir. No usa dependencias, servidores, fuentes externas ni archivos remotos: todo funciona con `index.html`, `style.css`, `script.js` y el archivo local `flores-amarillas.mp3`.

## Probarlo

Abre `index.html` con cualquier navegador moderno. Para probar el botón de compartir correctamente, conviene publicarlo primero porque algunos navegadores limitan esa función en archivos locales.

## Publicar gratis en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube `index.html`, `style.css`, `script.js` y este `README.md` a la raíz del repositorio.
3. En el repositorio, abre **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**.
5. Selecciona la rama `main`, la carpeta `/ (root)` y pulsa **Save**.
6. GitHub mostrará el enlace público cuando termine la publicación.

## Publicar gratis en Netlify

1. Entra en Netlify y elige **Add new site → Deploy manually**.
2. Arrastra la carpeta que contiene estos archivos al área de publicación.
3. Netlify generará un enlace público de inmediato. Puedes cambiar su nombre desde la configuración del sitio.

## Publicar gratis en Vercel

1. Crea un proyecto nuevo en Vercel e importa el repositorio de GitHub que contiene estos archivos.
2. Deja **Framework Preset** en `Other` y no agregues un comando de compilación.
3. Pulsa **Deploy**. Vercel generará el enlace para compartir.

## Personalización rápida

- Textos: edítalos en `index.html` y en la lista `messages` de `script.js`.
- Colores: cambia las variables al inicio de `style.css`.
- Firma: busca `by JOEL A` al final de `index.html`.

La canción incluida solo comienza cuando la persona toca el botón **Música**, por lo que cumple las restricciones de reproducción automática.
