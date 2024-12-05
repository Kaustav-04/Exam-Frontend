import * as Yup from "yup";

export const ExamSchema = Yup.object().shape({
  exam_name: Yup.string().required("Exam Name"),
  start_time: Yup.string().required("Require Exam Start Date Time"),
  end_time: Yup.string().required("Require Exam End Date Time"),
});
