# Script para desplegar Vite en GitHub Pages
# Ejecuta esto después de 'npm run build'

# Instala gh-pages si no está instalado
if (-not (Get-Command gh-pages -ErrorAction SilentlyContinue)) {
  npm install -g gh-pages
}

# Publica la carpeta dist en el branch gh-pages
npx gh-pages -d dist
