import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './modules/project/project.module'
import { PlotsModule } from './modules/plot/plot.module'


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '164.92.166.48',
      port: 3306,
      username: 'node',
      password: 'Geshem@2030',
      database: 'geshem_dev',
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
      cache : true,
    }),
    ProjectsModule ,
    PlotsModule
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