import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
    selector: 'app-confirm-dialog',
    template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>Are you sure you want to delete?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="warn" style="background-color: #e53935; color: white;" (click)="onConfirm()">Delete</button>
    </mat-dialog-actions>
  `
})

export class ConfirmDialogComponent{

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>){}

    onConfirm(): void{
        this.dialogRef.close(true);
    }

    onCancel(): void{
        this.dialogRef.close(false)
    }
}