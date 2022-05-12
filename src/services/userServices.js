import useApi from "src/composebles/UserApi";

export default function userServices() {
  const { listAll, add, remove, listById, listUserByRole } = useApi("user");

  return {
    listAll,
    add,
    remove,
    listById,
    listUserByRole,
  };
}
