// ws-server.js
// Servidor WebSocket sencillo con soporte de salas y broadcast de movimientos

const WebSocket = require('ws');
const PORT = process.env.WS_PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });
const rooms = new Map(); // roomId -> Set(ws)

function joinRoom(ws, roomId) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
  ws.roomId = roomId;
  safeSend(ws, { type: 'joined', roomId });
}

function leaveRoom(ws) {
  const { roomId } = ws;
  if (!roomId || !rooms.has(roomId)) return;
  rooms.get(roomId).delete(ws);
  if (rooms.get(roomId).size === 0) rooms.delete(roomId);
}

function safeSend(ws, obj) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(obj));
  }
}

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    let data;
    try { data = JSON.parse(msg); } catch { return; }

    if (data.type === 'join' && data.roomId) {
      joinRoom(ws, data.roomId);
      return;
    }

    if (data.type === 'move' && ws.roomId) {
      // Reenviar a todos los clientes en la misma sala (excepto el emisor)
      const peers = rooms.get(ws.roomId) || new Set();
      for (const peer of peers) {
        if (peer !== ws && peer.readyState === WebSocket.OPEN) {
          safeSend(peer, {
            type: 'move',
            roomId: ws.roomId,
            r: data.r,
            c: data.c,
            tile: data.tile
          });
        }
      }
      return;
    }
  });

  ws.on('close', () => leaveRoom(ws));
  ws.on('error', () => leaveRoom(ws));
});

console.log(`WS server listening on ws://localhost:${PORT}`);
