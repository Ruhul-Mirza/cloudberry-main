import api from "./api";

export const loginUser = async (payload) => {
  const res = await api.post("/admin/login", payload);

  const { token, admin } = res.data.data;

  // ✅ Store token for middleware
  document.cookie = `token=${token}; path=/; max-age=604800`;

  // ✅ Store admin info
  localStorage.setItem("admin", JSON.stringify(admin));

  return res.data;
};

export const logoutUser = () => {
  document.cookie = "token=; path=/; max-age=0";
  localStorage.removeItem("admin");
  window.location.href = "/login"
};
