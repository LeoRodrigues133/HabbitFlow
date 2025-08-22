import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { userService } from "./services/user.service";
import { LocalStorageService } from "./services/local-storage.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorFn } from "./services/auth.interceptor";

export const provideAuthentication = (): EnvironmentProviders => {
  return makeEnvironmentProviders(
    [
      AuthService,
      userService,
      LocalStorageService,
    ])
};
