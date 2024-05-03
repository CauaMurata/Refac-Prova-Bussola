import { NotFoundException } from '@nestjs/common';

export class CourseNotFoundException extends NotFoundException {
    constructor(courseId: string) {
        super(`Course with id ${courseId} not found`);
    }
}