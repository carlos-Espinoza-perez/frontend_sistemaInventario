const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, '../public/service-worker.js');
let swContent = fs.readFileSync(swPath, 'utf8');

const buildId = Date.now(); // o usar process.env.VERCEL_GIT_COMMIT_SHA
swContent = swContent.replace(/sistema-inventario-[^\']+/g, `sistema-inventario-${buildId}`);

fs.writeFileSync(swPath, swContent);
console.log(`Service Worker actualizado con CACHE_NAME sistema-inventario-${buildId}`);
