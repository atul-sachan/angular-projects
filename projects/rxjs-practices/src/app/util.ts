import { Observable } from 'rxjs';

export function createHttpObservable(url: string): Observable<any> {

    return Observable.create(observer => {
        const controller: AbortController = new AbortController();
        const signal: AbortSignal = controller.signal;

        fetch(url, {signal})
            .then(response => {
                return response.json();
            })
            .then(body => {
                observer.next(body);
                observer.complete();
            })
            .catch(err => {
                observer.error(err);
            });

        return () => controller.abort();
    });
}
