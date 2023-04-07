import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { File } from '../models/base';

@Injectable({ providedIn: 'root' })
export class FileService {

    file: File;

    private fileSubject = new Subject<File>();

    setFile(newFile: File) {
        this.fileSubject.next(newFile);
        this.file = newFile;
    }
    getFile(): Observable<File> {
        return this.fileSubject.asObservable();
    }
}
