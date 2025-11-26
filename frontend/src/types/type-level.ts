export class TypeLevel {
  static id = "id";
  static titulo = "titulo";
  static subtitulo = "subtitulo";
  static textRelevante = "textRelevante";
  static textNormal = "textNormal";
  static coordenada = "coordenada";
  static fecha = "fecha";
  static foto = "foto";
  static tags = "tags";
}
export type TypeLevelKeys = typeof TypeLevel[keyof typeof TypeLevel];
