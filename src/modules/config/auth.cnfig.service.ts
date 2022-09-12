import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: 'https://dev-new.geshem-ag.com:8443',
      realm: 'geshem-dev',
      clientId: 'geshem-dev',
      secret: 'J6rSbtyHWjX3KbPstWXnOHuKUjy4Az18', 
      realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoz9fOsz0xXmATl6W61It0Tq80jVKQjMCqLGaTTeozZberMzhh4uUkumluVRhg+VjqQX2vYMs5mq72WVfBHrxMpz8lqbpDH12bJQ85sE1yVHSQEzuEg6CWa29pKqwgZM7ScsBMUfw4qLfJFZCQ7/LMoMOZ0QA32LbAaFl5Yyn/K93B7MpDwDnxbStiJ2GqjJ6RHLPYp438D5Mx7fV2BmayDq6wtMN5aoQPPeJeEi11y3lvIJL2JPCVFJPsdSsAo7xAs0ySVjQu/+zrJMh1nOPoNHG8pBJmhHPLQYNXfsqiwi69N76OjqCnIr6yuJW7PKS2wgj+ORuX22wVJBwWVB8hQIDAQAB',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // optional
      tokenValidation: TokenValidation.ONLINE, // optional
    };
  } 
}