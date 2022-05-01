import roleApi from "src/composebles/RoleApi";

export default function roleServices() {
  const { listAll, add, remove, listById } = roleApi("role");

  return {
    listAll,
    add,
    remove,
    listById,
  };
}
