export class TypeLevel {
  static id = "id";
  static titulo = "titulo";
  static subtitulo = "subtitulo";
  static textRelevante = "textRelevante";
  static textNormal = "textNormal";
}
export type TypeLevelKeys = typeof TypeLevel[keyof typeof TypeLevel];
