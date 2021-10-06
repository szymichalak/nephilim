import {HttpClient} from "@angular/common/http";
import {AuthService} from "@app/auth/services/auth.service";

export function initializeApp(_authService: AuthService): () => Promise<void> {
    return async () => {
        await _authService.initApp();
    };
}
