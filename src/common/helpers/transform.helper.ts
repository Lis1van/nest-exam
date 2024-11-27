export class TransformHelper {
  // Преобразование строки в нижний регистр
  public static toLowerCase({ value }: { value: string }): string {
    return value ? value.toString().toLowerCase() : value;
  }

  // Преобразование строки в нижний регистр, удаление пробелов в начале и конце строки, удаление спецсимволов
  public static trim({ value }: { value: string }): string {
    return value ? value.toString().trim() : value;
  }

  // Преобразование строки в верхний регистр
  public static toUpperCase({ value }: { value: string }): string {
    return value ? value.toString().toUpperCase() : value;
  }

  // Замена пробелов на подчеркивания
  public static replaceSpacesWithUnderscores({
    value,
  }: {
    value: string;
  }): string {
    return value ? value.toString().replace(/\s+/g, '_') : value;
  }

  // Удаление спецсимволов
  public static removeSpecialCharacters({ value }: { value: string }): string {
    return value ? value.toString().replace(/[^a-zA-Z0-9 ]/g, '') : value;
  }
}
