📘 Carcassonne Web (Prototipo Educativo)
Versión simplificada y modular del clásico juego Carcassonne, diseñada para el aula. Incluye motor de juego en JavaScript, interfaz con Bootstrap, persistencia en PHP, multijugador en red con WebSockets o polling, historial/deshacer y editor de tiles.

✨ Características
🧩 Colocación de fichas con validación de bordes.

👥 Meeples y cierres: control de áreas y puntuación por mayoría.

🎨 Editor de tiles: crea fichas personalizadas y exporta mazos JSON.

🔄 Historial y deshacer: pila de movimientos para retroceder jugadas.

🌐 Multijugador:

Opción A: WebSockets con Node.js..

Opción B: Long-polling con PHP.

💾 Persistencia: guarda/carga partida en localStorage o en servidor PHP.

🐳 Docker Compose: arranque automático de Apache+PHP y Node.js..

🧪 Tests con Jest: ejemplos de pruebas unitarias para el motor.

🚀 Arranque rápido
Opción A: Solo navegador (sin servidor)
bash
npx serve
# o
python -m http.server
Abrir en http://localhost:5000 o http://localhost:8000.

Opción B: Con PHP
Coloca el proyecto en htdocs/carcassonne-web/ y abre en: 👉 http://localhost/carcassonne-web/

Opción C: Multijugador con Node (WebSockets)
bash
npm install
node ws-server.js
Juego: abrir index.html en navegador.

WS: ws://localhost:8081

Opción D: Docker Compose (recomendado)
bash
docker-compose up --build
Juego: http://localhost:8080

WS: ws://localhost:8081

🧪 Tests
Se usan Jest.

bash
docker-compose run --rm tests
# o sin Docker:
npm test
📂 Estructura
Código
carcassonne-web/
├── index.html
├── assets/
│   ├── styles.css
│   ├── tiles.js
│   ├── game.js
│   ├── ui.js
│   ├── net.js        # cliente WS
│   └── net-php.js    # cliente PHP polling
├── api/
│   ├── state.php
│   ├── reset.php
│   └── events.php
├── ws-server.js      # servidor Node WebSocket
├── Dockerfile.php
├── Dockerfile.node
├── docker-compose.yml
├── package.json
└── README.md
🎓 Uso en clase
Explorar: jugar con la versión básica en navegador.

Extender: activar meeples y cierres, probar el editor de tiles.

Colaborar: usar multijugador en red (WS o PHP).

Analizar: revisar historial y deshacer para enseñar arquitectura de estado.

Probar: ejecutar tests unitarios y escribir nuevos.

📜 Licencia
MIT — libre para usar, modificar y compartir en contextos educativos.