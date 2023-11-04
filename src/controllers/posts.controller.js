export const createPost = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Post created",
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const singlePost = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "fetched post",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const allPost = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "fetched posts",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const deletePost = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Delete posts",
    });
  } catch (error) {
    res.json(error.message);
  }
};
export const updatePost = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Update posts",
    });
  } catch (error) {
    res.json(error.message);
  }
};
