import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) {}

    getData(inquiry: string) {
        return [
            this.http.get(`https://api.github.com/search/repositories?q=${inquiry}`),
            this.http.get(`https://api.github.com/search/users?q=${inquiry}`)
        ];
    }
}
