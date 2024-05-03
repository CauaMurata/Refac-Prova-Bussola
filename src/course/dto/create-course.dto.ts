import { IsString, IsNumber, IsArray } from "class-validator";

export class CreateCourseDto {

    @IsString()
    name: string

    @IsNumber()
    value: number

    @IsNumber()
    duration: number

    @IsArray()
    students: string
}
