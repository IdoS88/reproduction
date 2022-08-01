import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitsFamily } from '../entities/unitsFamily.entity';
import { Unit } from '../entities/unit.entity';
import { CreateUnitsFamilyDto, UpdateUnitsFamilyDto } from '../dto/unitsFamily.dto';

@Injectable()
export class UnitsFamilyService {
  constructor(
    @InjectRepository(UnitsFamily)
    private unitsFamilyRepository: Repository<UnitsFamily>
  ){}

  async create(createUnitsFamilyDto: CreateUnitsFamilyDto) {
    let unitsFamily = new UnitsFamily;
    unitsFamily.name = createUnitsFamilyDto.name;
    console.log(`UnitsFamilyService: create name= ${createUnitsFamilyDto.name}`)
    console.log(`UnitsFamilyService: create name= ${unitsFamily.name}`)
    await this.unitsFamilyRepository.save(unitsFamily);
    return unitsFamily.id;
  }

  async getAll(): Promise<UnitsFamily[]> {
    return this.unitsFamilyRepository.find();
  }

  async getUnitsFamilyById(id: number): Promise<UnitsFamily> {
    if (id <= 0)
      throw Error("UnitsFamily id cannot be negative");
    return this.unitsFamilyRepository.findOne({
      where: {id: id}
    });
  }

  
  async update(id: number, updateUnitsFamilyDto: UpdateUnitsFamilyDto) {
    await this.unitsFamilyRepository.update(id, updateUnitsFamilyDto);
    return id;
  }

  async delete(id: number) {
    await this.unitsFamilyRepository.delete(id)
    return id;
  }
}
