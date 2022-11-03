import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'app/model/login';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  message='';
  messageType='danger'
  login!:Login
constructor(private router:Router,rest:RestApiService) { }

}
