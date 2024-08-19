import api from "@/apiConfig/api";

export const getBranches = () => {
  return api.get(`/coins/student/branches`);
};
export const getBranchRatings = (branch_id, filter, from, till) => {
  return api.get(`/coins/student/branch_stat/${branch_id}`, {
    params: {
      filter: filter,
      from_date: from,
      till_date: till,
    },
  });
};
