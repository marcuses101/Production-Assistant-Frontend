export const SceneAPIServices = {
  async add({name,description}) {
    const response = await fetch();
    const data = response.json();
    return data
  },
  async edit({id,name,description}) {
    const response = await fetch();
    const data = response.json();
    return data
  },
  async delete({id}) {
    const response = await fetch();
    const data = response.json();
    return data
  },
};
