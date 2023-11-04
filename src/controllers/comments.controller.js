export const createComment = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment created",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const singleComment = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Single comment",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const deleteComment = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment deleted",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const updateComment = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment updated",
    });
  } catch (error) {
    res.json(error.message);
  }
};
