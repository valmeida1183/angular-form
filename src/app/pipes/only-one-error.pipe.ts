import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "onlyOneError",
})
export class OnlyOneErrorPipe implements PipeTransform {
  transform(allErrors: any, errorsPriority: string[]) {
    if (!allErrors) {
      return null;
    }

    const onlyOneError: any = {};

    for (const error of errorsPriority) {
      if (allErrors[error]) {
        onlyOneError[error] = allErrors[error];
        break;
      }
    }

    return onlyOneError;
  }
}
