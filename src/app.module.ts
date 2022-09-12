import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './modules/projects/projects.module'
import { PlotsModule } from './modules/plots/plots.module'
import { CropsModule } from './modules/crops/crops.module'
import { WorkersModule } from './modules/workers/workers.module';
import { ToolsModule } from './modules/tools/tools.module';
import { UnitsModule } from './modules/units/units.module';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard,} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { AutorizationModule } from './modules/config/auth.config.module';
import { KeycloakConfigService } from './modules/config/auth.cnfig.service';

import * as dotenv from 'dotenv'

dotenv.config();



@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports:[AutorizationModule]
    }),


    TypeOrmModule.forRoot({
      type: 'mysql',
      /*host: "164.92.166.48",
      port: 3306,
      username: "node",
      database: "geshem_dev",
      password: "Geshem@2030",*/
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username:process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
     
      synchronize: false,  // false means do not auto create tables in DB
      logging: true,
      autoLoadEntities: true,
      cache : true,
    }),
    ProjectsModule ,
    PlotsModule,
    CropsModule,
    UnitsModule,
    WorkersModule,
    ToolsModule
  ],
  controllers: [],
  providers: [
    
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and 
    // methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the 
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    
  ],
})
export class AppModule {}


//sivan : see about route modules https://docs.nestjs.com/recipes/router-module
// @Module({ 
//   imports: [
//       ProjectsModule,
//       RouterModule.register([
//         {
//           path: 'Projects',
//           module: ProjectsModule,
//         },
//       ]),
//     ],
//   providers: [],
//   exports: [AppModule],
// }) export class AppModule {}