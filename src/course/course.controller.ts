import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseNotFoundException } from 'src/exception/course-not-found.exception';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }
  
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.courseService.findAll();
  }
 
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const course = await this.courseService.findOne(id);
    if (!course) {
      throw new CourseNotFoundException(id);
    }
    return course;
  }
 
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    const updatedCourse = await this.courseService.update(id, updateCourseDto);
    if (!updatedCourse) {
      throw new CourseNotFoundException(id);
    }
    return updatedCourse;
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedCourse = await this.courseService.remove(id);
    if (!deletedCourse) {
      throw new CourseNotFoundException(id);
    }
    return deletedCourse;
  }
  
  @UseGuards(AuthGuard)
  @Get(':courseName/students')
  async findStudentsByCourseName(@Param('courseName') courseName: string) {
    return this.courseService.findStudentsByCourseName(courseName);
  }
}

