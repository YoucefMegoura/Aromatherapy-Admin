import * as moment from "moment";

export class Functions {
  public static exportJsonFile(data: any, filename: string = 'data') {
    const sJson = JSON.stringify(data);
    const element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', `${filename} - ${moment().format('YYYYMMDD(hh-mm)')}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }
}
