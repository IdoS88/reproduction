import { Module } from '@nestjs/common';
//import { KeycloakConnectModule, ResourceGuard, RoleGuard, AuthGuard} from 'nest-keycloak-connect';
//import { APP_GUARD } from '@nestjs/core';
import {KeycloakConfigService} from './auth.cnfig.service'

@Module({
    exports: [KeycloakConfigService],
    providers: [KeycloakConfigService] 
    })
export class AutorizationModule {}