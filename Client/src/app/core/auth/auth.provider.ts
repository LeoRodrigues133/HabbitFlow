import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { userService } from "./services/user.service";
import { LocalStorageService } from "./services/local-storage.service";

export const provideAuthentication = (): EnvironmentProviders => {
  return makeEnvironmentProviders(
    [
      AuthService,
      userService,
      LocalStorageService
    ]);
};
