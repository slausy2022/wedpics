import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gallerie',
  standalone: true
})
export class GalleriePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

@Pipe({
  name: 'LikesIconPipe'
})
export class LikesIconPipe implements PipeTransform {
    transform(value: number | null | undefined): string {
      if (value && value > 0) {
        return 'heart';
      } else {
        return 'heart-empty';
      }
    }
}


@Pipe({
  name: 'LikesIconColorPipe'
})
export class LikesIconColorPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value && value > 0) {
      return 'danger';
    } else {
      return 'dark';
    }
  }
}
