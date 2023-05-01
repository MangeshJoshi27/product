import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(value: any[], searchValue: string): any[] {
        if (!value) return [];
        if (!searchValue) return value;

        searchValue = searchValue.toLowerCase();

        return value.filter(item => {
            return item.title.toLowerCase().includes(searchValue);
        });

    }
}

