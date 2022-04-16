import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string) {
    if (value.length === 0 || filterString === '' ) {
      return value;
    }

    const conversationList = [];
    for (const conversation of value) {
      if (conversation['username'].includes(filterString)) {
        conversationList.push(conversation);
      }
    }
    return conversationList;
  }

}
