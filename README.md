# LA Advisory

Sitio de [la-advisory.com](https://la-advisory.com/): landing de asesoría
administrativa para pymes. HTML estático, sin build ni dependencias.

## Publicar

La VPS tira de este repo (rama `main`) y lo sirve con Caddy:

```bash
ssh hg-vps '/opt/hg/despliegue/desplegar.sh la-advisory'
curl -s https://la-advisory.com/.publicado.json   # confirma el commit servido
```

El contacto abre WhatsApp desde `script.js`; la canónica del HTML apunta a
`https://la-advisory.com/`.
