import { api } from "src/boot/axios";

export default function useApi(url) {
  const listAll = async () => {
    try {
      const { data } = await api.get(url);
      return data.res;
    } catch (error) {
      throw new Error(error);
    }
  };

  const add = async (form) => {
    try {
      if (form.id) {
        const { data } = await api.put(`${url}/${form.id}`, form);
        return data.res;
      } else {
        const { data } = await api.post(url, form);
        return data.res;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    listAll,
    add,
    remove,
  };
}
