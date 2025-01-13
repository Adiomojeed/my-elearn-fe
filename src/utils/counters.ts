import { AssignmentData } from "@/api/assignments";
import { CourseData } from "@/api/course";
import moment from "moment";

export const countLessons = (course: CourseData) => {
  return course?.modules?.reduce((total, module) => total + (module?.lessons?.length || 0), 0) || 0;
};

export const assignmentsStats = (assignments: AssignmentData[]) => {
  const statusCounts = {
    pending: 0,
    completed: 0,
    overdue: 0,
  };

  assignments?.forEach((assignment) => {
    if (moment(assignment?.dueDate).diff(moment(new Date()), "seconds") < 0) {
      statusCounts.overdue += 1;
    } else if (assignment?.isVisible) {
      statusCounts.pending += 1;
    } else {
      statusCounts.completed += 1;
    }
  });

  return statusCounts;
}