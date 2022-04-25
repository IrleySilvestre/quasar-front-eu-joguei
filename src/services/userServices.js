import useApi from "src/composebles/UserApi";

export default function userServices() {
  const { listAll, add, remove, listById } = useApi("user");

  return {
    listAll,
    add,
    remove,
    listById,
  };
}
