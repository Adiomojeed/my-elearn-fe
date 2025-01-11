import { CourseData } from "@/api/course";

export const countLessons = (course: CourseData) => {
  return course?.modules.reduce((total, module) => total + (module?.lessons?.length || 0), 0) || 0;
};