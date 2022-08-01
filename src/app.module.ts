import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './modules/projects/projects.module'
import { PlotsModule } from './modules/plots/plots.module'
import { CropsModule } from './modules/crops/crops.module'
import { WorkersToolsModule } from './modules/workers/workers.module';
import { UnitsModule } from './modules/units/units.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '164.92.166.48',
      port: 3306,
      username: 'node',
      password: 'Geshem@2030',
      database: 'geshem_dev',
      synchronize: false,  // false means do not auto create tables in DB
      logging: false,
      autoLoadEntities: true,
      cache : true,
    }),
    ProjectsModule ,
    PlotsModule,
    CropsModule,
    UnitsModule,
    WorkersToolsModule
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