import { api } from "src/boot/axios";

export default function useApi(url) {
  const listAll = async (notrole) => {
    if (notrole) {
      try {
        const { data } = await api.get(`${url}/usernotroles/${notrole}`);
        return data.res;
      } catch (error) {
        throw new Error(error);
      }
    } else {
      try {
        const { data } = await api.get(url);
        return data.res;
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  const listById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`);
      return data.res;
    } catch (error) {
      throw new Error(error);
    }
  };
  const listUserByRole = async (id_role) => {
    try {
      const { data } = await api.get(`${url}/role/${id_role}`);
      return data.res;
    } catch (error) {
      throw new Error(error);
    }
  };

  const add = async (id, form) => {
    try {
      if (!id) {
        const { data } = await api.post(url, form);
        return data.res;
      } else {
        const { data } = await api.patch(`${url}/${id}`, form);
        return data.res;
      }
    } catch (error) {
      const { message } = error.response.data;
      throw new Error(message);
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
    listById,
    listUserByRole,
  };
}
