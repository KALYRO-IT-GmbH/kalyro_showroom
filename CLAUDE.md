# KALYRO Showroom

## Projektbeschreibung

Website-Showroom der **Kalyro GmbH** zur Vorstellung von Dienstleistungen, Produkten und Leistungen. Das Projekt besteht aus zwei Bereichen:

1. **Showroom (öffentlich):** Präsentation fertiger Konzepte als interaktive Infografiken und visuelle Darstellungen für Kunden und Interessenten.
2. **Admin-Bereich (intern):** Nur für Kalyro-Mitglieder (Tenant-/Repo-Zugang). Hier werden neue Konzepte erstellt, bearbeitet und zur Veröffentlichung im Showroom vorbereitet.

## Technologie-Stack

- **Pure HTML/CSS/JS** — kein Framework, kein Build-Tool
- **Sprache:** Deutsch (UI-Texte, Kommentare, Commits)
- **Font:** Inter (Google Fonts)
- **Infographic Engine:** Eigenes konfigurations-getriebenes SVG-Rendering-System (`infographic-engine.js`)

## Projektstruktur

```
├── index.html              # Hauptseite mit Toolbar, Cards und SVG-Infografik-Viewer
├── infographic-engine.js   # SVG-Infografik-Engine (konfigurationsgetrieben)
├── diagrams/               # Diagramm-Konfigurationen (JS-Objekte)
│   ├── _template.js        # Vorlage für neue Diagramme
│   └── software-entwicklung.js  # Konzept: Software-Entwicklung & Bereitstellung
├── infinity-loop.html      # Konzept: CI/CD Infinity Loop (standalone)
├── cicd-infinity.html      # Konzept: CI/CD Infinity Loop (reines SVG)
├── assets/
│   └── logos/              # Firmenlogos und Icons
└── .gitignore
```

## Konzepte in Arbeit

Aktuell existieren zwei Konzepte:
1. **Moderne Software-Entwicklung & Bereitstellung** — Infografik mit Cards (Entwickler-Team, Code & Qualität, Cloud-Hosting, Unternehmens-IT) über die Infographic Engine
2. **CI/CD Infinity Loop** — Visualisierung des CI/CD-Prozesses als Infinity-Loop-Diagramm (Coral/Teal Farbschema)

## Infographic Engine

Das System zum Erstellen neuer Diagramme:
- Neue Diagramme werden als JS-Konfigurationsobjekte in `diagrams/` angelegt
- `diagrams/_template.js` als Vorlage verwenden
- Konfiguration unterstützt: Canvas, Titel, Cards mit Bullets/Icons, Pfeile, freie Texte, Bilder
- Engine rendert SVG und bietet PNG-Export

## Konventionen

- **Commits:** Deutsch, beschreibend, kein Präfix-Schema
- **Umlaute in Code:** Als ae/oe/ue geschrieben (z.B. `Hoehe`, `Groesse`)
- **CSS:** Inline-Styles in HTML-Dateien, CSS Custom Properties für Farben
- **Farbschema Kalyro:** Blau `#1e5faa`, Grün `#16a34a`, Orange `#e87400`, Rot `#dc2626`
