import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';

/**
 * Class that extends MatTableDataSource to check whether a table has data asynchronously
 */
export class DataPresentMatTableDataSource<T> extends MatTableDataSource<T> {

    dataPresent = this.connect().pipe(map(data => {
        if (data) {
            return data.length > 0;
        } else {
            return false;
        }

    }));

    public isDataPresent() {
        return this.dataPresent;
    }
}
