import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../Services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form  = {
    email: null
  }
  error = null;

  constructor(
    private jarwis: JarwisService,
    private notify: SnotifyService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.notify.info('Wait...', {timeout:5000});
    this.jarwis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(res){
    this.notify.success(res.data, {timeout:0});
    this.form.email = null;
  }

  handleError(error){
    this.error = error.error.error;
  }

}
