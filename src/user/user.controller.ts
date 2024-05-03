import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserNotFoundException } from 'src/exception/user-not-found.exeception';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
 
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    const user = await this.userService.findName(name);
    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new UserNotFoundException(id);
    }
    return updatedUser;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.userService.remove(id);
    if (!deletedUser) {
      throw new UserNotFoundException(id);
    }
    return deletedUser;
  }
}
