import { getStudentInfo } from "@/service/get-student-info.service";

export default {
  state() {
    return {
        studentInfo: {}
    }
  },
  actions: {
    async getMe(ctx) {
      ctx.state.studentInfo = await getStudentInfo()
        .then((res) => res.data)
        .catch(() => {});
    },
  },
};
