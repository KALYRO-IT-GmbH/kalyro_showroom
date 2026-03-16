/**
 * Diagramm-Konfiguration: Moderne Software-Entwicklung & Bereitstellung
 *
 * Dieses Diagramm zeigt den Workflow von der Entwicklung
 * ueber Code-Qualitaet und Cloud-Hosting bis zur sicheren Unternehmens-IT.
 */

const softwareEntwicklung = {
  canvas: {
    width: 1400,
    height: 780,
    background: '#f0f0f0',
  },

  title: {
    text: 'Moderne Software-Entwicklung & Bereitstellung',
    y: 48,
    fontSize: 34,
    color: '#1a1a2e',
  },

  footer: {
    y: 740,
    arrowColor: '#555',
    items: [
      { text: 'Innovative Loesungen', fontWeight: 'bold', fontStyle: 'italic', fontSize: 18, color: '#333' },
      { text: 'Effiziente Prozesse', fontWeight: 'bold', fontStyle: 'italic', fontSize: 18, color: '#333' },
      { text: 'Erfolgreiches Business', fontWeight: 'bold', fontStyle: 'italic', fontSize: 18, color: '#333' },
    ],
  },

  // ── Die 4 Hauptkarten ────────────────────────────────────────────

  cards: [
    // 1) Entwickler-Team
    {
      id: 'dev-team',
      x: 40, y: 130, width: 260, height: 280,
      headerHeight: 52,
      headerColor: '#2b6cb0',
      bodyColor: '#dbeafe',
      borderColor: '#2b6cb0',
      borderWidth: 3,
      title: { text: 'Entwickler-Team', color: '#fff', fontSize: 18 },
      bullets: [
        { text: 'Web- & App-Entwicklung', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
        { text: 'KI-Assistenz Claude Code', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
        { text: 'Lokale Tests & Datenbank', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
      ],
      icons: [
        // Personen-Icons als Kreise
        { type: 'circle-icon', x: 80, y: 140, r: 28, bgColor: '#4a90d9', text: '\uD83D\uDC69\u200D\uD83D\uDCBB', fontSize: 28 },
        { type: 'circle-icon', x: 130, y: 130, r: 26, bgColor: '#5ba3ec', text: '\uD83E\uDD16', fontSize: 24 },
        { type: 'circle-icon', x: 180, y: 140, r: 28, bgColor: '#4a90d9', text: '\uD83D\uDC68\u200D\uD83D\uDCBB', fontSize: 28 },
      ],
    },

    // 2) Code & Qualitaet
    {
      id: 'code-quality',
      x: 400, y: 130, width: 260, height: 280,
      headerHeight: 52,
      headerColor: '#2f855a',
      bodyColor: '#dcfce7',
      borderColor: '#2f855a',
      borderWidth: 3,
      title: { text: 'Code & Qualitaet', color: '#fff', fontSize: 18 },
      bullets: [
        { text: 'Code-Pruefung', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
        { text: 'Automatische Tests', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
        { text: 'Sicherer Code-Stand', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
      ],
      icons: [
        { type: 'circle-icon', x: 80, y: 130, r: 24, bgColor: '#38a169', text: '\u2611', fontSize: 22 },
        { type: 'circle-icon', x: 130, y: 138, r: 26, bgColor: '#48bb78', text: '\u2705', fontSize: 22 },
        { type: 'circle-icon', x: 180, y: 130, r: 24, bgColor: '#38a169', text: '\uD83D\uDCCB', fontSize: 22 },
      ],
    },

    // 3) Cloud-Hosting
    {
      id: 'cloud-hosting',
      x: 760, y: 130, width: 260, height: 280,
      headerHeight: 52,
      headerColor: '#c05621',
      bodyColor: '#fed7aa',
      borderColor: '#c05621',
      borderWidth: 3,
      title: { text: 'Cloud-Hosting', color: '#fff', fontSize: 18 },
      bullets: [
        { text: 'Eigene Web-App', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
        { text: 'Hochverfuegbar', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
        { text: 'Weltweit erreichbar', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
      ],
      icons: [
        { type: 'circle-icon', x: 130, y: 135, r: 30, bgColor: '#dd6b20', text: '\u2601', fontSize: 30 },
      ],
    },

    // 4) Sichere Unternehmens-IT
    {
      id: 'enterprise-it',
      x: 1120, y: 130, width: 260, height: 280,
      headerHeight: 52,
      headerColor: '#9b2c2c',
      bodyColor: '#fecaca',
      borderColor: '#9b2c2c',
      borderWidth: 3,
      title: { text: 'Sichere Unternehmens-IT', color: '#fff', fontSize: 16 },
      bullets: [
        { text: 'Datenschutz', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
        { text: 'Interne Systeme', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
        { text: 'Verlaesslicher Betrieb', bulletColor: '#e67e22', fontSize: 14, lineHeight: 32 },
      ],
      icons: [
        { type: 'circle-icon', x: 130, y: 135, r: 30, bgColor: '#c53030', text: '\uD83C\uDFE2', fontSize: 28 },
      ],
    },
  ],

  // ── Pfeile zwischen den Karten ───────────────────────────────────

  arrows: [
    // Entwickler -> Code & Qualitaet
    {
      from: { x: 300, y: 230 },
      to: { x: 395, y: 230 },
      color: '#4a5568',
      width: 3,
      label: { text: 'Code hochladen', offsetY: -14, fontSize: 13, color: '#4a5568' },
    },
    // Code & Qualitaet -> Cloud-Hosting
    {
      from: { x: 660, y: 230 },
      to: { x: 755, y: 230 },
      color: '#4a5568',
      width: 3,
      label: { text: 'Freigabe erteilt', offsetY: -14, fontSize: 13, color: '#4a5568' },
    },
    // Cloud-Hosting -> Sichere Unternehmens-IT
    {
      from: { x: 1020, y: 230 },
      to: { x: 1115, y: 230 },
      color: '#4a5568',
      width: 3,
      dashed: true,
    },
    // Rueckpfeil: Code & Qualitaet -> Entwickler (gestrichelt, unten)
    {
      from: { x: 400, y: 415 },
      to: { x: 170, y: 415 },
      color: '#4a5568',
      width: 2,
      dashed: true,
      curve: { cx1: 300, cy1: 460, cx2: 200, cy2: 460 },
    },
  ],

  // ── "Nutzung durch Kunden & Kollegen" ────────────────────────────

  texts: [
    {
      x: 920, y: 595,
      text: 'Nutzung durch Kunden & Kollegen',
      color: '#4a5568',
      fontSize: 15,
      fontStyle: 'italic',
      anchor: 'middle',
    },
  ],

  // ── Geraete-Icons unten ──────────────────────────────────────────
  // (werden als freie SVG-Elemente gezeichnet)
};
