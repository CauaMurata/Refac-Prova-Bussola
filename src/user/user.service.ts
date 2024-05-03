import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.userHash(createUserDto.password)
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find().select('-password');
  }

  findOne(id: string) {
    return this.userModel.findOne({ _id: id }).select('-password');;
  }

  findName(nome: string) {
    return this.userModel.findOne({ nome: nome });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id })
  }

  private async userHash(pass) {
    const saltOrRound = 10
    const passHashed = bcrypt.hash(pass, saltOrRound)
    return passHashed
  }

}
