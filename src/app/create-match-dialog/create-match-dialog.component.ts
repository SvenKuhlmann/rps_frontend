import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatchService } from '../matchservice';

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
    this.matchService.post(this.formGroup.getRawValue()).subscribe({
      next: () => this.dialogRef.close(),
      error: error => this.displayErrorDialog(error)
    });
  }

  displayErrorDialog(error: HttpErrorResponse): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { error: error },
    });
  }

}
