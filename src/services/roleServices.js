import roleApi from "src/composebles/RoleApi";

export default function roleServices() {
  const {
    listAll,
    add,
    remove,
    findById,
    listRolesPermissions,
    updateRolesPermissions,
  } = roleApi("role");

  return {
    listAll,
    add,
    remove,
    findById,
    listRolesPermissions,
    updateRolesPermissions,
  };
}
