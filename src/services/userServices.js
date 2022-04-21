import useApi from "src/composebles/UserApi";

export default function userServices() {
  const { listAll, add, remove } = useApi("user");

  return {
    listAll,
    add,
    remove,
  };
}
