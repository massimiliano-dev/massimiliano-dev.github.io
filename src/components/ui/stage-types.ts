/** Una voce dello stage: un progetto in home, una funzione nella pagina di un progetto. */
export interface StageItem {
  key: string;
  name: string;
  tags: string;
  text: string;
  image: string;
  /** Video muto in loop (senza estensione); `image` fa da poster. */
  video?: string;
  alt: string;
  focus?: string;
  /** Immagine verticale (lo schermo di un telefono): non viene ritagliata. */
  portrait?: boolean;
  href?: string;
  hrefLabel?: string;
  external?: boolean;
}
