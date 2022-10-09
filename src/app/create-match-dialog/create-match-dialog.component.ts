import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatchService } from '../matchservice';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-create-match-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create-match-dialog.component.html',
  styleUrls: ['./create-match-dialog.component.css']
})
export class CreateMatchDialogComponent implements OnInit {

  control: FormControl = new FormControl(null, [Validators.required, Validators.minLength(4)]);
  formGroup: FormGroup = new FormGroup({ "name": this.control });

  constructor(public dialogRef: MatDialogRef<CreateMatchDialogComponent>, private matchService: MatchService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  create() {
    console.log("create ", this.formGroup.getRawValue())
    this.matchService.post(this.formGroup.getRawValue()).subscribe({
      next: () => this.dialogRef.close(),
      error: error => this.displayErrorDialog(error)
    });
  }

  displayErrorDialog(error: HttpErrorResponse): void {
    let dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { error: error },
    });
  }

}
