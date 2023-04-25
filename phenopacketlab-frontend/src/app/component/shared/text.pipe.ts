import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeText',
  pure: false
})
export class TextPipe implements PipeTransform {

    constructor(protected _sanitizer: DomSanitizer) {}
    transform(items): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(items);
    }
}
