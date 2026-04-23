export type Idioma = 'es' | 'en';

export const IDIOMAS_DISPONIBLES: Idioma[] = ['es', 'en'];
export const IDIOMA_POR_DEFECTO: Idioma = 'es';

export const LOCALES_HTML: Record<Idioma, string> = {
  es: 'es-PE',
  en: 'en-US',
};

export const ETIQUETAS_IDIOMA: Record<Idioma, string> = {
  es: 'Español',
  en: 'English',
};

export async function cargarDatos<T = unknown>(idioma: Idioma, archivo: string): Promise<T> {
  const modulos = import.meta.glob<{ default: unknown }>('../datos/**/*.json');
  const ruta = `../datos/${idioma}/${archivo}.json`;
  const cargador = modulos[ruta];
  if (!cargador) throw new Error(`No existe el archivo de datos: ${ruta}`);
  const modulo = await cargador();
  return modulo.default as T;
}

export async function cargarTextosUi<T = unknown>(idioma: Idioma): Promise<T> {
  const modulos = import.meta.glob<{ default: unknown }>('../idiomas/*.json');
  const ruta = `../idiomas/${idioma}.json`;
  const cargador = modulos[ruta];
  if (!cargador) throw new Error(`No existe textos UI: ${ruta}`);
  const modulo = await cargador();
  return modulo.default as T;
}
