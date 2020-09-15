import { Observable } from 'rxjs';

export function createHttpObservable(url: string): Observable<any> {

    return new Observable(observer => {
        const controller: AbortController = new AbortController();
        const signal: AbortSignal = controller.signal;

        fetch(url, {signal})
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                else{
                   observer.error('Request Failed with status code: ' + response.status);
                }
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
