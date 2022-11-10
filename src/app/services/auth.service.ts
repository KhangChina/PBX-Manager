import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor( private rest : RestApiService) {}

isAuthenticated():boolean{
const accessToken = localStorage.getItem('accessToken')
const refreshToken = localStorage.getItem('refreshToken')
  let headers = this.rest.getHeaders()
  if (accessToken && refreshToken)
  {
    console.log(accessToken + refreshToken)
    return true
  }
  return false
}

logout(){
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

}
