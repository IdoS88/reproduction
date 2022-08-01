import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from '../entities/unit.entity';
import { CreateUnitDto, UpdateUnitDto } from '../dto/unit.dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private repository: Repository<Unit>
  ){}

  async create(createUnitDto: CreateUnitDto) {
    let unit = new Unit();
    unit.name = createUnitDto.name;
    unit.familyid = createUnitDto.familyid;
    await this.repository.save(unit);
    return unit.id;
  }

  getAll(): Promise<Unit[]> {
    return this.repository.find();
  }

  getUnitById(id: number): Promise<Unit> {
    if (id <= 0)
      throw Error("Unit id cannot be negative");
    return this.repository.findOne({
      where: {id: id}
    });
  }

  async getByFamilyId(familyid: number): Promise<Unit[]> {familyid
    console.log("UnitsService : getByFamilyId() for family " + familyid);
    if (familyid <= 0)
        throw Error("UnitsService : getByFamilyId() id cannot be negative");

      return this.repository.find({
        where: {
          familyid: familyid,
        }
    })
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    await this.repository.update(id, updateUnitDto);
    return id;
  }

  async delete(id: number) {
    await this.repository.delete(id)
    return id;
  }
}
