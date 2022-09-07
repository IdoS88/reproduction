import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: 'https://dev-new.geshem-ag.com:8443',
      realm: 'geshsem-dev',
      clientId: 'geshem-dev',
      secret: 'T8MzyrPlZrHonJ5A5MDmz9MkAoq5sSRS',   
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // optional
      tokenValidation: TokenValidation.NONE, // optional
    };
  } 
}