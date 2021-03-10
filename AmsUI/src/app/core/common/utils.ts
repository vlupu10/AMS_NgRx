export function getValueFromPercentString(value: string): number {
    // remove '%' sign if any
    const  data = value.charAt(value.length - 1) === '%'  ? value.substring(0, (value.length - 1)) : value;
    // remove ',' from string after percent pipe
    const coreValue = data.split(',')
      .join('');
    // tranform string to number
    const rate = Number(coreValue);

    return  isNaN(rate)  ? 0 : rate;
  }

export function sortObjectsInArrayByProp(a: any, b: any, prop: string): any {
    if (a[prop] > b[prop]) { return 1; }
    if (a[prop] < b[prop]) { return -1; }
    if (a[prop] === b[prop]) { return 0; }
  }

export const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.',;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const WEBSITE_PATTERN = /^(?!\.)(?!.*?\.\.)(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export function tranformStringToNumber(value: string | number): number {
    return  isNaN(Number(value))  ? 0 : Number(value);
  }

export function createFormData(file: Blob): FormData {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return formData;
  }

export function parseToBoolean(value: string): boolean {
    if (value) {
      return (value.toLowerCase() === 'true');
    }

    return false;
  }

export async function fileToBase64(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // reader.onload = readerEvent => {
      //   resolve(readerEvent.target.result;
      // };
      reader.onerror = err => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  }

export function getYearsArray(start: number, end: number): Array<number> {
    return Array(end - start + 1)
      .fill(start)
      .map((year: number, index) => year + index);
  }

  /**
   * Transforms time string to Date object with current day as a base
   * @param time in format '7:30 AM' or '7:30 PM'
   */
export function transformTimeToDate(value: string): Date {
    const period = value.split(' ')[1]; // get AM or PM
    const time = value.split(' ')[0];
    let hour = + time.split(':')[0];
    const minute = + time.split(':')[1];
    if (period === 'PM') {
      hour = hour + 12;
    }
    const currentDate = new Date();
    currentDate.setHours(hour, minute, 0, 0);

    return currentDate;
  }

export function pFlt(val: string): number {
    const no$ = new RegExp(/\$/gi);
    const noComma = new RegExp(/\,/g);
    const noNegative = new RegExp(/\-/g);
    let res: number;
    res = parseFloat(String(val)
      .replace(no$, '')
      .replace(noNegative, '')
      .replace(noComma, ''));

    return res;
  }
