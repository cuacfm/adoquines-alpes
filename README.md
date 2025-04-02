# Adoquines Alpes

Programa de radio sobre ciclismo

## Actualización del Feed RSS

El feed RSS se genera automáticamente a partir del archivo `episodes.json`. Para actualizar el feed:

1. Asegúrate de que el archivo `episodes.json` está actualizado
2. Ejecuta el script de generación:
   ```bash
   node generate_feed.js
   ```
3. El nuevo feed se guardará en `feed.rss`

## Añadir Nuevos Episodios

Para añadir un nuevo episodio al sistema:

1. Descarga la página del episodio desde la web de CUAC FM y guárdala como `episodio{ID}.html` (donde {ID} es el número del episodio)
2. Ejecuta el script de extracción para actualizar `episodes.json`:
   ```bash
   node extract_episodes.js
   ```
3. Genera el nuevo feed RSS:
   ```bash
   node generate_feed.js
   ```

### Estructura de Datos

El archivo `episodes.json` contiene la información de todos los episodios con la siguiente estructura:

```json
{
  "episodes": [
    {
      "id": 1,
      "title": "Título del episodio",
      "date": "Lunes 24 de Marzo 2025",
      "description": "Descripción del episodio",
      "topics": ["Tema 1", "Tema 2", "Tema 3"],
      "audio_url": "URL del audio",
      "video_url": "URL del video (si existe)",
      "has_video": true/false,
      "cover_image": "URL de la imagen de portada",
      "has_komoot": true/false,
      "komoot_embed": "URL del embed de Komoot (si existe)"
    }
  ]
}
```

## Requisitos

- Node.js
- Dependencias de Node.js (instaladas con `npm install`):
  - cheerio (para el parsing de HTML)