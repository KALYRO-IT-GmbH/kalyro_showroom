/**
 * VORLAGE: Neues Diagramm erstellen
 *
 * 1. Diese Datei kopieren und umbenennen (z.B. netzwerk-architektur.js)
 * 2. Konfiguration anpassen
 * 3. In index.html einbinden:
 *    - <script src="diagrams/netzwerk-architektur.js"></script>
 *    - Im diagrams-Objekt registrieren: diagrams['netzwerk'] = netzwerkConfig;
 *    - <option value="netzwerk">Netzwerk-Architektur</option>
 */

const templateDiagram = {
  // ── Zeichenflaeche ──────────────────────────────────────────────
  canvas: {
    width: 1400,        // Breite in px
    height: 780,        // Hoehe in px
    background: '#f0f0f0',  // Hintergrundfarbe
  },

  // ── Titel (optional) ──────────────────────────────────────────
  title: {
    text: 'Titel des Diagramms',
    y: 48,              // Y-Position
    fontSize: 34,
    color: '#1a1a2e',
  },

  // ── Footer mit Pfeil-Kette (optional) ─────────────────────────
  footer: {
    y: 740,
    arrowColor: '#555',
    items: [
      { text: 'Schritt 1', fontWeight: 'bold', fontStyle: 'italic', fontSize: 18 },
      { text: 'Schritt 2', fontWeight: 'bold', fontStyle: 'italic', fontSize: 18 },
      { text: 'Schritt 3', fontWeight: 'bold', fontStyle: 'italic', fontSize: 18 },
    ],
  },

  // ── Karten / Boxen ────────────────────────────────────────────
  cards: [
    {
      id: 'karte-1',           // Eindeutige ID (wird fuer Clip-Paths benoetigt)
      x: 40, y: 130,            // Position
      width: 260, height: 280,  // Groesse
      headerHeight: 52,         // Hoehe des farbigen Headers
      headerColor: '#2b6cb0',   // Farbe Header
      bodyColor: '#dbeafe',     // Farbe Body
      borderColor: '#2b6cb0',   // Rahmenfarbe
      borderWidth: 3,
      title: { text: 'Karten-Titel', color: '#fff', fontSize: 18 },
      bullets: [
        { text: 'Punkt 1', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
        { text: 'Punkt 2', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
      ],
      icons: [
        // Verschiedene Icon-Typen:
        // { type: 'circle-icon', x: 130, y: 135, r: 30, bgColor: '#4a90d9', text: 'A', fontSize: 20 },
        // { type: 'emoji', x: 130, y: 135, char: '🔧', fontSize: 36 },
        // { type: 'image', x: 100, y: 100, width: 60, height: 60, href: 'icon.png' },
      ],
    },
    // Weitere Karten hier...
  ],

  // ── Pfeile / Verbindungen ─────────────────────────────────────
  arrows: [
    {
      from: { x: 300, y: 230 },    // Startpunkt
      to: { x: 400, y: 230 },      // Endpunkt
      color: '#4a5568',
      width: 3,
      dashed: false,                 // true fuer gestrichelt
      label: {                       // optional
        text: 'Beschriftung',
        offsetX: 0, offsetY: -14,
        fontSize: 13,
        color: '#4a5568',
      },
      // Fuer geschwungene Pfeile:
      // curve: { cx1: 350, cy1: 300, cx2: 350, cy2: 300 },
    },
  ],

  // ── Freie Texte ───────────────────────────────────────────────
  texts: [
    {
      x: 700, y: 600,
      text: 'Zusatztext',
      color: '#4a5568',
      fontSize: 15,
      fontStyle: 'italic',
      anchor: 'middle',  // 'start', 'middle', 'end'
    },
  ],

  // ── Freie Bilder (optional) ───────────────────────────────────
  images: [
    // { x: 100, y: 500, width: 120, height: 80, href: 'bild.png', shadow: true },
  ],
};
