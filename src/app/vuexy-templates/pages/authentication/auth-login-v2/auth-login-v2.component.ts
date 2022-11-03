import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { ToastrService,GlobalConfig } from 'ngx-toastr';
import { RestApiService } from 'app/services/rest-api.service';
import { HtmlParser } from '@angular/compiler';


@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV2Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;
  public url ='https://localhost:3000/auth/login'
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService,
    private rest : RestApiService,
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // Login
    this.loading = true;
    const body ={
      username: this.loginForm.controls.email.value,
      password:this.loginForm.controls.password.value
    }
   this.rest.post(this.url,body).then(data => {
    console.log(data)
    let dataLogin = data as {accessToken:string, refreshToken:string}
    console.log(dataLogin)
    localStorage.setItem('accessToken',dataLogin.accessToken)
    localStorage.setItem('refreshToken',dataLogin.refreshToken)
    this._router.navigate(['/']);
    
   }).catch(error=>{
    console.log(error)
    this.toastrError(error.error["message"])
    this.loading = false;
   })

  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, ]],//Validators.email
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
 
  toastrSuccess(mess: string) {
    this.toastr.success('👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.', 'Success!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }
  // Error
  toastrError(mess: string) {
    this.toastr.error(mess, 'Danger!', {
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }

}
