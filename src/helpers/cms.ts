import type { Idioma } from './idiomas';

export interface SeccionPost {
  id: string;
  title: string;
}

export interface PostBlog {
  slug: string;
  cat: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  read: string;
  secciones: SeccionPost[];
  contenido?: string;
  contenidoHtml?: string;
}

interface PostCrudoCms {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  formato_contenido: 'MARKDOWN' | 'HTML';
  idioma: string;
  estado: string;
  publicado_en: string | null;
  creado_en: string;
  categorias?: { nombre: string }[] | string[];
  etiquetas?: { nombre: string }[] | string[];
  seo_titulo?: string;
  seo_descripcion?: string;
}

interface SobreCrudo<T> {
  exito: boolean;
  datos: T | null;
  error?: { codigo: string; mensaje: string } | null;
}

const URL_BASE = (import.meta.env.CODEPLEX_API_URL ?? 'http://localhost:8080/api').replace(/\/$/, '');
const CODIGO_SITIO = import.meta.env.CODEPLEX_SITIO_CODIGO ?? 'DGDWEB';

const escaparHtml = (texto: string): string =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const aplicarInline = (linea: string): string =>
  escaparHtml(linea)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

const construirEmbedYoutube = (urlVideo: string): string | null => {
  const c = urlVideo.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  if (!c) return null;
  return `<div class="video-embed"><iframe src="https://www.youtube.com/embed/${c[1]}" loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
};

const construirEmbedVimeo = (urlVideo: string): string | null => {
  const c = urlVideo.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (!c) return null;
  return `<div class="video-embed"><iframe src="https://player.vimeo.com/video/${c[1]}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
};

const renderizarLineaEspecial = (linea: string): string | null => {
  const limpia = linea.trim();
  const imagen = limpia.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imagen) {
    const cap = imagen[1] ? `<figcaption>${imagen[1]}</figcaption>` : '';
    return `<figure class="figura-post"><img src="${imagen[2]}" alt="${imagen[1]}" loading="lazy" />${cap}</figure>`;
  }
  if (limpia.startsWith('@youtube:')) return construirEmbedYoutube(limpia.slice(9).trim()) ?? null;
  if (limpia.startsWith('@vimeo:')) return construirEmbedVimeo(limpia.slice(7).trim()) ?? null;
  if (limpia.startsWith('@video:')) {
    return `<div class="video-embed"><video controls preload="metadata"><source src="${limpia.slice(7).trim()}" /></video></div>`;
  }
  return null;
};

const generarIdSeccion = (texto: string): string =>
  texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

const renderizarMarkdownConSecciones = (markdown: string): { html: string; secciones: SeccionPost[] } => {
  const lineas = markdown.split('\n');
  const bloques: string[] = [];
  const secciones: SeccionPost[] = [];
  let parrafoBuffer: string[] = [];
  let listaBuffer: string[] = [];

  const cerrarParrafo = () => {
    if (parrafoBuffer.length) { bloques.push(`<p>${parrafoBuffer.map(aplicarInline).join(' ')}</p>`); parrafoBuffer = []; }
  };
  const cerrarLista = () => {
    if (listaBuffer.length) { bloques.push(`<ul>${listaBuffer.map(i => `<li>${aplicarInline(i)}</li>`).join('')}</ul>`); listaBuffer = []; }
  };

  for (const linea of lineas) {
    const especial = renderizarLineaEspecial(linea);
    if (especial) {
      cerrarParrafo();
      cerrarLista();
      bloques.push(especial);
      continue;
    }
    const coincidenciaH2 = linea.match(/^## (.+)/);
    if (coincidenciaH2) {
      cerrarParrafo();
      cerrarLista();
      const titulo = coincidenciaH2[1];
      const id = generarIdSeccion(titulo);
      secciones.push({ id, title: titulo });
      bloques.push(`<h2 id="${id}">${aplicarInline(titulo)}</h2>`);
      continue;
    }
    if (/^### (.+)/.test(linea)) { cerrarParrafo(); cerrarLista(); bloques.push(`<h3>${aplicarInline(linea.replace(/^### /, ''))}</h3>`); }
    else if (/^# (.+)/.test(linea)) { cerrarParrafo(); cerrarLista(); bloques.push(`<h1>${aplicarInline(linea.replace(/^# /, ''))}</h1>`); }
    else if (/^[-*] (.+)/.test(linea)) { cerrarParrafo(); listaBuffer.push(linea.replace(/^[-*] /, '')); }
    else if (linea.trim() === '') { cerrarParrafo(); cerrarLista(); }
    else { cerrarLista(); parrafoBuffer.push(linea); }
  }
  cerrarParrafo();
  cerrarLista();
  return { html: bloques.join('\n'), secciones };
};

const estimarLectura = (texto: string): string => {
  const palabras = texto.split(/\s+/).length;
  const minutos = Math.max(1, Math.round(palabras / 220));
  return `${minutos} min`;
};

const extraerNombre = (item: unknown): string =>
  typeof item === 'string' ? item : (item as { nombre?: string })?.nombre ?? '';

const aPostBlog = (crudo: PostCrudoCms): PostBlog => {
  const categorias = (crudo.categorias ?? []).map(extraerNombre).filter(Boolean);
  const { html, secciones } = crudo.formato_contenido === 'MARKDOWN'
    ? renderizarMarkdownConSecciones(crudo.contenido)
    : { html: crudo.contenido, secciones: [] };
  return {
    slug: crudo.slug,
    cat: categorias[0] ?? 'General',
    title: crudo.titulo,
    excerpt: crudo.resumen,
    author: 'Equipo DGD',
    authorRole: 'Consultor',
    date: (crudo.publicado_en ?? crudo.creado_en).slice(0, 10),
    read: estimarLectura(crudo.contenido),
    secciones,
    contenido: crudo.contenido,
    contenidoHtml: html,
  };
};

const consultar = async <T>(ruta: string): Promise<T | null> => {
  try {
    const respuesta = await fetch(`${URL_BASE}${ruta}`, { headers: { Accept: 'application/json' } });
    if (!respuesta.ok) return null;
    const sobre = (await respuesta.json()) as SobreCrudo<T>;
    if (!sobre.exito) return null;
    return sobre.datos;
  } catch {
    return null;
  }
};

export async function obtenerPostsBlog(idioma: Idioma, limite = 50): Promise<PostBlog[]> {
  const datos = await consultar<{ elementos: PostCrudoCms[] } | PostCrudoCms[]>(
    `/publico/sitios/${CODIGO_SITIO}/posts?pagina=1&tamano_pagina=${limite}`,
  );
  if (!datos) return [];
  const elementos = Array.isArray(datos) ? datos : datos.elementos ?? [];
  return elementos
    .filter((p) => p.idioma === idioma && p.estado === 'PUBLICADO')
    .map(aPostBlog);
}

export async function obtenerPostBlog(idioma: Idioma, slug: string): Promise<PostBlog | null> {
  const crudo = await consultar<PostCrudoCms>(`/publico/sitios/${CODIGO_SITIO}/posts/${slug}`);
  if (!crudo || crudo.idioma !== idioma) return null;
  return aPostBlog(crudo);
}

interface CategoriaCrudaCms {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  color?: string;
  orden?: number;
}

export interface CategoriaBlog {
  nombre: string;
  slug: string;
  color?: string;
  cantidad: number;
}

export async function obtenerCategoriasBlog(_idioma: Idioma): Promise<CategoriaBlog[]> {
  const datos = await consultar<CategoriaCrudaCms[] | { elementos: CategoriaCrudaCms[] }>(
    `/publico/sitios/${CODIGO_SITIO}/categorias`,
  );
  if (!datos) return [];
  const lista = Array.isArray(datos) ? datos : datos.elementos ?? [];
  return lista.map((c) => ({ nombre: c.nombre, slug: c.slug, color: c.color, cantidad: 0 }));
}

export function contarCategorias(posts: PostBlog[], categorias: CategoriaBlog[]): CategoriaBlog[] {
  const vistas = new Set<string>();
  return categorias
    .filter((c) => {
      const clave = c.nombre.trim().toLowerCase();
      if (!clave || vistas.has(clave)) return false;
      vistas.add(clave);
      return true;
    })
    .map((c) => ({
      ...c,
      cantidad: posts.filter((p) => p.cat.toLowerCase() === c.nombre.toLowerCase()).length,
    }))
    .filter((c) => c.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad);
}
