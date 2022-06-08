import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: { [key: string]: string}) {
    return this.http.get<T>(url, { params })
  }

  post<T1, T2>(url: string, data: T1, params?: { [key: string]: string}) {
    return this.http.post<T2>(url, data, { params })
  }
}
