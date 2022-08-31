import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: 'https://dev-new.geshem-ag.com:8443',
      realm: 'Geshsem-dev',
      clientId: 'geshem-dev',
      secret: 'secret',   
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // optional
      tokenValidation: TokenValidation.ONLINE, // optional
    };
  } 
}