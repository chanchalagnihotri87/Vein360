export default class ConversionHelper {
  static convertStringToDate(dateString: string): Date {
    return new Date(dateString);
  }

  static convertToInt(stringValue: string | undefined | null) {
    if (stringValue != undefined && stringValue != null) {
      return parseInt(stringValue);
    }

    return 0;
  }
}
