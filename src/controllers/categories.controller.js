export const createCategory = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category created",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const deleteCategory = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category deleted",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const updateCategory = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category updated",
    });
  } catch (error) {
    res.json(error.message);
  }
};
