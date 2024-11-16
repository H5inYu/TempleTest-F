import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'actindexContentPipe'
})
export class ActindexContentPipe implements PipeTransform {
  // 預設實作
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(value: string, para: string = '...'): string {
    if (value.length > 10) {
      let n = 10;
      return value.substring(0, n) + para;
    }
    return value;
  }
}


@Pipe({
  name: 'forMoneyPipe'
})
export class forMoneyPipe implements PipeTransform {
  transform(value: string | number): string {
    if (value) {
      if (typeof value === 'number') {
        value = value.toString();
      }
      // 使用正則表達式插入逗號
      if (typeof value === undefined) {
        return value;
      }
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    if (value == 0) {
      return "免費";
    }
    return "請洽管理員";
  }
}
