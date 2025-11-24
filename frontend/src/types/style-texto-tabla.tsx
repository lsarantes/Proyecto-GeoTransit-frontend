export class DefaultStylesTableContent {
  static id= "font-bold text-[var(--colorPrimary)] text-sm";
  static titulo= "font-semibold text-[var(--textColor)] text-sm";
  static subtitulo= "text-[var(--textColor)]/75 text-sm";
  static resaltado= "text-center";
  static text= "text-[var(--textColor)]/70 text-xs max-w-xs truncate";
};


export class DefaultStylesTableTitle {
  // Título normal alineado a la izquierda
  static normalTitle = "text-[var(--textColor)] font-bold text-sm";
  // Título centrado y más destacado
  static centerTitle = "text-[var(--textColor)] font-bold text-sm text-center";
  // Título para claves o IDs (mismo estilo que normal, pero diferenciado semánticamente)
  static idTitle = "text-[var(--textColor)] font-bold text-sm";
  // Texto en estilo simple sin resaltar
  static normalText = "text-[var(--textColor)] text-sm";
}

