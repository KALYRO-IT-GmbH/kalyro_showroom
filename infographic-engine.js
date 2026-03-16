/**
 * KALYRO Infographic Engine
 * Konfigurations-getriebenes SVG-Infografik-System
 *
 * Nutzung:
 *   const engine = new InfographicEngine('svg-container');
 *   engine.render(diagramConfig);
 *   engine.exportSVG();       // SVG-String
 *   engine.exportPNG(scale);  // PNG-Download
 */

class InfographicEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.ns = 'http://www.w3.org/2000/svg';
    this.svg = null;
    this.defs = null;
    this.config = null;
  }

  // ── Haupt-Render-Methode ──────────────────────────────────────────
  render(config) {
    this.config = config;
    this.container.innerHTML = '';

    const { width, height, background } = config.canvas;
    this.svg = this._createSVG(width, height);
    this.defs = this._el('defs');
    this.svg.appendChild(this.defs);

    // Hintergrund
    if (background) {
      this.svg.appendChild(this._rect(0, 0, width, height, { fill: background, rx: 0 }));
    }

    // Filter & Schatten registrieren
    this._registerFilters(config.filters || []);

    // Titel
    if (config.title) this._renderTitle(config.title);

    // Untertitel / Footer
    if (config.footer) this._renderFooter(config.footer);

    // Pfeile / Verbindungen zuerst (hinter den Boxen)
    if (config.arrows) config.arrows.forEach(a => this._renderArrow(a));

    // Boxen / Karten
    if (config.cards) config.cards.forEach(c => this._renderCard(c));

    // Freie Bilder / Icons
    if (config.images) config.images.forEach(img => this._renderImage(img));

    // Freie Texte
    if (config.texts) config.texts.forEach(t => this._renderFreeText(t));

    this.container.appendChild(this.svg);
    return this;
  }

  // ── Export-Funktionen ─────────────────────────────────────────────
  exportSVG() {
    const serializer = new XMLSerializer();
    return serializer.serializeToString(this.svg);
  }

  exportPNG(scale = 2) {
    const svgData = this.exportSVG();
    const { width, height } = this.config.canvas;
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const link = document.createElement('a');
      link.download = (this.config.title?.text || 'infographic') + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  }

  // ── SVG-Grundelemente ─────────────────────────────────────────────
  _createSVG(w, h) {
    const svg = document.createElementNS(this.ns, 'svg');
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('xmlns', this.ns);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', 'auto');
    svg.style.fontFamily = "'Segoe UI', Arial, sans-serif";
    return svg;
  }

  _el(tag, attrs = {}) {
    const el = document.createElementNS(this.ns, tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v !== undefined && v !== null) el.setAttribute(k, v);
    }
    return el;
  }

  _rect(x, y, w, h, opts = {}) {
    return this._el('rect', {
      x, y, width: w, height: h,
      fill: opts.fill || 'none',
      stroke: opts.stroke || 'none',
      'stroke-width': opts.strokeWidth || 0,
      rx: opts.rx ?? 12,
      ry: opts.ry ?? 12,
      filter: opts.filter || undefined,
      opacity: opts.opacity ?? 1,
    });
  }

  _text(x, y, content, opts = {}) {
    const t = this._el('text', {
      x, y,
      fill: opts.fill || '#333',
      'font-size': opts.fontSize || 16,
      'font-weight': opts.fontWeight || 'normal',
      'font-style': opts.fontStyle || 'normal',
      'text-anchor': opts.anchor || 'start',
      'dominant-baseline': opts.baseline || 'auto',
      'letter-spacing': opts.letterSpacing || undefined,
    });
    t.textContent = content;
    return t;
  }

  // ── Filter (Schatten etc.) ────────────────────────────────────────
  _registerFilters(filters) {
    // Standard-Schatten immer registrieren
    const defaultShadow = this._el('filter', { id: 'shadow', x: '-5%', y: '-5%', width: '120%', height: '130%' });
    const feOffset = this._el('feOffset', { dx: 2, dy: 4, in: 'SourceAlpha', result: 'off' });
    const feBlur = this._el('feGaussianBlur', { in: 'off', stdDeviation: 6, result: 'blur' });
    const feFlood = this._el('feFlood', { 'flood-color': 'rgba(0,0,0,0.15)', result: 'color' });
    const feComposite = this._el('feComposite', { in: 'color', in2: 'blur', operator: 'in', result: 'shadow' });
    const feMerge = this._el('feMerge');
    feMerge.appendChild(this._el('feMergeNode', { in: 'shadow' }));
    feMerge.appendChild(this._el('feMergeNode', { in: 'SourceGraphic' }));
    defaultShadow.append(feOffset, feBlur, feFlood, feComposite, feMerge);
    this.defs.appendChild(defaultShadow);

    // Leichterer Schatten
    const lightShadow = this._el('filter', { id: 'shadow-light', x: '-5%', y: '-5%', width: '120%', height: '130%' });
    const lsOff = this._el('feOffset', { dx: 1, dy: 2, in: 'SourceAlpha', result: 'off' });
    const lsBlur = this._el('feGaussianBlur', { in: 'off', stdDeviation: 3, result: 'blur' });
    const lsFlood = this._el('feFlood', { 'flood-color': 'rgba(0,0,0,0.10)', result: 'color' });
    const lsComp = this._el('feComposite', { in: 'color', in2: 'blur', operator: 'in', result: 'shadow' });
    const lsMerge = this._el('feMerge');
    lsMerge.appendChild(this._el('feMergeNode', { in: 'shadow' }));
    lsMerge.appendChild(this._el('feMergeNode', { in: 'SourceGraphic' }));
    lightShadow.append(lsOff, lsBlur, lsFlood, lsComp, lsMerge);
    this.defs.appendChild(lightShadow);

    // Benutzerdefinierte Filter
    filters.forEach(f => {
      // Platzhalter fuer erweiterte Filter
    });
  }

  // ── Titel ─────────────────────────────────────────────────────────
  _renderTitle(titleCfg) {
    const t = this._text(
      this.config.canvas.width / 2,
      titleCfg.y || 50,
      titleCfg.text,
      {
        fill: titleCfg.color || '#1a1a2e',
        fontSize: titleCfg.fontSize || 32,
        fontWeight: 'bold',
        anchor: 'middle',
      }
    );
    this.svg.appendChild(t);
  }

  // ── Footer-Leiste ────────────────────────────────────────────────
  _renderFooter(footerCfg) {
    const { items, y, arrowColor } = footerCfg;
    const cw = this.config.canvas.width;
    const totalW = cw * 0.7;
    const startX = (cw - totalW) / 2;
    const segW = totalW / items.length;

    items.forEach((item, i) => {
      const cx = startX + segW * i + segW / 2;
      const t = this._text(cx, y, item.text, {
        fill: item.color || '#333',
        fontSize: item.fontSize || 18,
        fontWeight: item.fontWeight || 'normal',
        fontStyle: item.fontStyle || 'italic',
        anchor: 'middle',
      });
      this.svg.appendChild(t);

      // Pfeil zwischen Items
      if (i < items.length - 1) {
        const ax = cx + segW * 0.3;
        const ax2 = cx + segW * 0.7;
        this._drawArrowLine(ax, y - 5, ax2, y - 5, arrowColor || '#555', 2);
      }
    });
  }

  // ── Karten ────────────────────────────────────────────────────────
  _renderCard(card) {
    const g = this._el('g');
    const { x, y, width: w, height: h, headerHeight, headerColor, bodyColor,
            borderColor, borderWidth, title, bullets, icons, shadow } = card;

    const hh = headerHeight || 50;

    // Schatten-Rechteck
    if (shadow !== false) {
      g.appendChild(this._rect(x, y, w, h, {
        fill: 'transparent', filter: 'url(#shadow)', rx: 14
      }));
    }

    // Rahmen
    if (borderColor) {
      g.appendChild(this._rect(x, y, w, h, {
        fill: 'none', stroke: borderColor,
        strokeWidth: borderWidth || 3, rx: 14
      }));
    }

    // Body
    g.appendChild(this._rect(x + 1.5, y + hh, w - 3, h - hh - 1.5, {
      fill: bodyColor || '#fff', rx: 0
    }));
    // Untere Ecken abrunden
    const bodyClip = this._el('clipPath', { id: `clip-body-${card.id}` });
    bodyClip.appendChild(this._rect(x, y, w, h, { rx: 14 }));
    this.defs.appendChild(bodyClip);

    // Body mit Clip
    const bodyRect = this._rect(x, y + hh, w, h - hh, {
      fill: bodyColor || '#fff', rx: 0
    });
    bodyRect.setAttribute('clip-path', `url(#clip-body-${card.id})`);
    g.appendChild(bodyRect);

    // Header mit oberen Ecken abgerundet
    const headerClip = this._el('clipPath', { id: `clip-header-${card.id}` });
    headerClip.appendChild(this._rect(x, y, w, h, { rx: 14 }));
    this.defs.appendChild(headerClip);

    const headerRect = this._rect(x, y, w, hh, {
      fill: headerColor || '#2c5282', rx: 0
    });
    headerRect.setAttribute('clip-path', `url(#clip-header-${card.id})`);
    g.appendChild(headerRect);

    // Gestrichelte Linien oben/unten am Header
    const dashLine = this._el('line', {
      x1: x + 15, y1: y + 8, x2: x + w - 15, y2: y + 8,
      stroke: 'rgba(255,255,255,0.4)', 'stroke-width': 1,
      'stroke-dasharray': '6,4'
    });
    g.appendChild(dashLine);
    const dashLine2 = this._el('line', {
      x1: x + 15, y1: y + hh - 8, x2: x + w - 15, y2: y + hh - 8,
      stroke: 'rgba(255,255,255,0.4)', 'stroke-width': 1,
      'stroke-dasharray': '6,4'
    });
    g.appendChild(dashLine2);

    // Titel
    if (title) {
      const tt = this._text(x + w / 2, y + hh / 2 + 2, title.text, {
        fill: title.color || '#fff',
        fontSize: title.fontSize || 18,
        fontWeight: 'bold',
        anchor: 'middle',
        baseline: 'middle',
      });
      this.svg.appendChild(g);
      g.appendChild(tt);
    }

    // Icons im Header
    if (icons) {
      icons.forEach(icon => {
        this._renderIconInCard(g, icon, x, y);
      });
    }

    // Bullet Points
    if (bullets) {
      bullets.forEach((b, i) => {
        const bx = x + 25;
        const by = y + hh + 35 + i * (b.lineHeight || 30);

        // Bullet-Punkt
        g.appendChild(this._el('circle', {
          cx: bx, cy: by - 4, r: 5,
          fill: b.bulletColor || headerColor || '#e67e22'
        }));

        // Text
        const bt = this._text(bx + 14, by, b.text, {
          fill: b.color || '#333',
          fontSize: b.fontSize || 15,
          fontWeight: b.fontWeight || 'normal',
        });
        g.appendChild(bt);
      });
    }

    if (!title) this.svg.appendChild(g);
  }

  // ── Icons (SVG-Pfade in Karten) ──────────────────────────────────
  _renderIconInCard(g, icon, cardX, cardY) {
    if (icon.type === 'svg-group') {
      const ig = this._el('g', {
        transform: `translate(${cardX + icon.x}, ${cardY + icon.y}) scale(${icon.scale || 1})`
      });
      icon.paths.forEach(p => {
        const path = this._el('path', { d: p.d, fill: p.fill || '#fff' });
        if (p.stroke) path.setAttribute('stroke', p.stroke);
        if (p.strokeWidth) path.setAttribute('stroke-width', p.strokeWidth);
        ig.appendChild(path);
      });
      g.appendChild(ig);
    } else if (icon.type === 'emoji') {
      const t = this._text(cardX + icon.x, cardY + icon.y, icon.char, {
        fontSize: icon.fontSize || 36,
        anchor: 'middle',
        baseline: 'middle',
      });
      g.appendChild(t);
    } else if (icon.type === 'circle-icon') {
      g.appendChild(this._el('circle', {
        cx: cardX + icon.x, cy: cardY + icon.y, r: icon.r || 22,
        fill: icon.bgColor || 'rgba(255,255,255,0.25)'
      }));
      if (icon.text) {
        const it = this._text(cardX + icon.x, cardY + icon.y + 1, icon.text, {
          fill: icon.color || '#fff', fontSize: icon.fontSize || 20,
          fontWeight: 'bold', anchor: 'middle', baseline: 'middle'
        });
        g.appendChild(it);
      }
    } else if (icon.type === 'image') {
      const img = this._el('image', {
        x: cardX + icon.x, y: cardY + icon.y,
        width: icon.width, height: icon.height,
        href: icon.href,
        opacity: icon.opacity ?? 1,
      });
      g.appendChild(img);
    }
  }

  // ── Pfeile / Verbindungen ────────────────────────────────────────
  _renderArrow(arrow) {
    const { from, to, color, width, label, dashed, curve } = arrow;

    // Marker (Pfeilspitze)
    const markerId = `arrow-${Math.random().toString(36).substr(2, 6)}`;
    const marker = this._el('marker', {
      id: markerId, viewBox: '0 0 10 10',
      refX: 8, refY: 5, markerWidth: 8, markerHeight: 8,
      orient: 'auto-start-reverse', fill: color || '#666'
    });
    marker.appendChild(this._el('path', { d: 'M 0 0 L 10 5 L 0 10 z' }));
    this.defs.appendChild(marker);

    if (curve) {
      // Geschwungener Pfeil
      const path = this._el('path', {
        d: `M ${from.x} ${from.y} C ${curve.cx1} ${curve.cy1}, ${curve.cx2} ${curve.cy2}, ${to.x} ${to.y}`,
        fill: 'none', stroke: color || '#666',
        'stroke-width': width || 2.5,
        'marker-end': `url(#${markerId})`,
        'stroke-dasharray': dashed ? '8,5' : undefined,
      });
      this.svg.appendChild(path);
    } else {
      this._drawArrowLine(from.x, from.y, to.x, to.y, color || '#666', width || 2.5, markerId, dashed);
    }

    // Label
    if (label) {
      const mx = (from.x + to.x) / 2 + (label.offsetX || 0);
      const my = (from.y + to.y) / 2 + (label.offsetY || -12);
      const lt = this._text(mx, my, label.text, {
        fill: label.color || '#555',
        fontSize: label.fontSize || 14,
        fontStyle: 'italic',
        anchor: 'middle',
      });
      this.svg.appendChild(lt);
    }
  }

  _drawArrowLine(x1, y1, x2, y2, color, width, markerId, dashed) {
    const line = this._el('line', {
      x1, y1, x2, y2,
      stroke: color, 'stroke-width': width || 2,
      'marker-end': markerId ? `url(#${markerId})` : undefined,
      'stroke-dasharray': dashed ? '8,5' : undefined,
    });
    this.svg.appendChild(line);
  }

  // ── Freie Bilder ─────────────────────────────────────────────────
  _renderImage(img) {
    const g = this._el('g');
    if (img.shadow) {
      // Container fuer Schatten
    }
    const image = this._el('image', {
      x: img.x, y: img.y,
      width: img.width, height: img.height,
      href: img.href,
      opacity: img.opacity ?? 1,
      filter: img.shadow ? 'url(#shadow-light)' : undefined,
    });
    this.svg.appendChild(image);
  }

  // ── Freie Texte ──────────────────────────────────────────────────
  _renderFreeText(t) {
    const el = this._text(t.x, t.y, t.text, {
      fill: t.color || '#333',
      fontSize: t.fontSize || 14,
      fontWeight: t.fontWeight || 'normal',
      fontStyle: t.fontStyle || 'normal',
      anchor: t.anchor || 'middle',
    });
    this.svg.appendChild(el);
  }

  // ── Hilfsmethode: Wolken-Pfad ────────────────────────────────────
  static cloudPath(cx, cy, w, h) {
    // Erzeugt einen Wolken-artigen Pfad
    const hw = w / 2, hh = h / 2;
    return `M ${cx - hw + 10} ${cy + hh}
      Q ${cx - hw - 5} ${cy + hh}, ${cx - hw} ${cy}
      Q ${cx - hw} ${cy - hh + 5}, ${cx - hw + 20} ${cy - hh}
      Q ${cx - 5} ${cy - hh - 15}, ${cx + 15} ${cy - hh}
      Q ${cx + hw} ${cy - hh - 5}, ${cx + hw} ${cy}
      Q ${cx + hw + 5} ${cy + hh}, ${cx + hw - 10} ${cy + hh}
      Z`;
  }
}

// Export fuer Module
if (typeof module !== 'undefined') module.exports = InfographicEngine;
