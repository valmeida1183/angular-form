import { Component, Input } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { catchError, finalize } from "rxjs/operators";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { noop, of } from "rxjs";
import { ErrorStateMatcher } from "@angular/material/core";

@Component({
  selector: "file-upload",
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input()
  requiredFileType: string;

  fileName: string = "";
  fileUploadError: boolean = false;
  fileUploadSuccess: boolean = false;
  uploadProgress: number;
  onChange: Function = (fileName: string) => {};
  onTouched: Function = () => {};
  onValidatorChange: Function = () => {};
  isDisabled: boolean = false;

  constructor(private http: HttpClient) {}

  writeValue(value: any): void {
    this.fileName = value;
  }

  registerOnChange(onChange: Function): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: Function): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  onFileSelected(event) {
    const file = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();
      formData.append("thumbnail", file);
      this.fileUploadError = false;

      this.http
        .post("/api/thumbnail-upload", formData, {
          reportProgress: true,
          observe: "events",
        })
        .pipe(
          catchError((error) => {
            this.fileUploadError = true;
            return of(error);
          }),
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        .subscribe((event) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          } else if (event.type == HttpEventType.Response) {
            this.fileUploadSuccess = true;
            this.onChange(this.fileName);
            this.onValidatorChange();
          }
        });
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.fileUploadSuccess) {
      return null;
    }

    let errors: any = {
      requiredFileType: this.requiredFileType,
    };

    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }

    return errors;
  }

  registerOnValidatorChange?(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }
}
