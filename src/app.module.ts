import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './modules/projects/projects.module'
import { PlotsModule } from './modules/plots/plots.module'
import { CropsModule } from './modules/crops/crops.module'
import { WorkersModule } from './modules/workers/workers.module';
import { ToolsModule } from './modules/tools/tools.module';
import { UnitsModule } from './modules/units/units.module';

import * as dotenv from 'dotenv'
dotenv.config();

@Module({
  imports: [
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
  providers: []
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