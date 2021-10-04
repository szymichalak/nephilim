import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

export async function read<T>(observable: Observable<T>): Promise<T> {
  return observable.pipe(take(1)).toPromise();
}
