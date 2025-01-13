import { AssignmentData } from "@/api/assignments";
import { CourseData } from "@/api/course";
import moment from "moment";

export const countLessons = (course: CourseData) => {
  return course?.modules?.reduce((total, module) => total + (module?.lessons?.length || 0), 0) || 0;
};

export const assignmentsStats = (assignments: AssignmentData[]) => {
  const statusCounts = {
    pending: 0,
    submitted: 0,
    overdue: 0,
  };

  assignments?.forEach((assignment) => {
    if (assignment?.isSubmitted) { statusCounts.submitted += 1; } else
      if (moment(assignment?.dueDate).diff(moment(new Date()), "seconds") < 0) {
        statusCounts.overdue += 1;
      } else if (assignment?.isVisible) {
        statusCounts.pending += 1;
      }
  });

  return statusCounts;
}