﻿import {Component } from '@angular/core';
import {Input, Output, EventEmitter} from '@angular/core';
import {AuthenticationService } from './authentication.service';
import {UserProfile} from './../place';
import {BusyModule} from 'angular2-busy';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TrackerService} from "./../tracker.service";

@Component({
    templateUrl: './resetPassword.component.html',
})

export class ResetPasswordComponent {
    model: any = {};
    error: any = {};
    busy: any;

    @Output() user = new EventEmitter<UserProfile>();
    public submitted = false;
    public currentUser: UserProfile;

    constructor(
         private authenticationService: AuthenticationService,
         public activeModal: NgbActiveModal,
         private tracker: TrackerService) //Modal del login
         { }

    resetPassword(): any {
       this.busy = this.authenticationService.resetPassword(this.model)
            .subscribe(
                data => {
                     this.submitted = true;
                     this.tracker.emitEvent("contraseña", "recuperar_contraseña");
                },
                error => {
                    this.error = error;
                });
    }

    cancel(){
        this.activeModal.close();
    }
    close(){
        this.activeModal.close();
    }

}
