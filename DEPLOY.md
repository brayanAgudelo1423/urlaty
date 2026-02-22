# Desplegar URLATY en GitHub Pages

Sitio publicado en **https://urlaty.online** (dominio personalizado). Cada push a `main` hace build y despliega en GitHub Pages.

## 1. Imágenes y logos en el repositorio

Todo lo que está en la carpeta **`public/`** se incluye en el build y se publica. Asegúrate de tener ahí:

- **`public/joyeria/`** – logo, fotos de productos de joyería (p. ej. `logo.png`, `combito.jpeg`, etc.)
- **`public/tennis/`** – imágenes de tennis
- Cualquier otra carpeta o archivo que uses desde la app (favicon, etc.)

Si faltan carpetas o archivos, el build seguirá funcionando, pero en la web publicada no se verán esas imágenes hasta que los añadas en `public/` y vuelvas a desplegar.

## 2. Activar GitHub Pages en el repositorio

1. Entra en tu repositorio en GitHub (por ejemplo `https://github.com/TU_USUARIO/urlaty`).
2. Ve a **Settings** → **Pages** (en el menú izquierdo).
3. En **Source** elige **GitHub Actions**.
4. Guarda si hace falta.

Con esto, cada vez que hagas push a la rama `main`, se ejecutará el workflow y se desplegará la web.

## 3. Subir los cambios y desplegar

Desde la raíz del proyecto:

```bash
git add .
git commit -m "Deploy: configurar GitHub Pages con imágenes y funcionalidades"
git push origin main
```

El workflow **Deploy to GitHub Pages** se ejecutará solo. Puedes ver el progreso en la pestaña **Actions** de tu repositorio.

## 4. URL de la web

- **Dominio:** **https://urlaty.online**
- El workflow añade un archivo `CNAME` con `urlaty.online` para que GitHub Pages use ese dominio.

### Configurar el dominio urlaty.online en GitHub

1. En el repo: **Settings → Pages**.
2. En **Custom domain** escribe: `urlaty.online` y guarda.
3. En tu proveedor de dominio (donde compraste urlaty.online), crea un registro **CNAME** (o **ANAME** si lo tiene) que apunte a: **`<tu-usuario>.github.io`** (o el que te indique GitHub en Settings → Pages).

Cuando el DNS esté propagado, la web se verá en https://urlaty.online.

## 5. Si algo falla

- **Imágenes rotas**: Comprueba que los archivos estén en `public/` con la misma ruta que usas en el código (por ejemplo `public/joyeria/logo.png` para `/joyeria/logo.png`).
- **Rutas que no cargan**: El workflow ya configura `NEXT_PUBLIC_BASE_PATH` con el nombre del repo (`/urlaty`), así que los enlaces y assets deberían funcionar en esa URL.
- **Error en el build**: Revisa la pestaña **Actions** del repo y el log del job **build** para ver el mensaje de error.

## Resumen

1. Pon todas las imágenes y logos en **`public/`** (p. ej. `public/joyeria/`, `public/tennis/`).
2. En GitHub: **Settings → Pages → Source: GitHub Actions**.
3. `git push origin main` para desplegar.

Cuando el workflow termine, tendrás la web publicada con todo (imágenes, logos y funcionalidades) en GitHub Pages.
