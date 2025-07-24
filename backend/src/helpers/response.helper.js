export const successResponse = async (res, data) => {
  return res.send({
    status: true,
    message: data.message || "sucess",
    code: data.code || 200,
    data: data.data || null,
  });
};

export const errorResponse = async (res, error) => {
  return res.send({
    status: false,
    message: error.message || "error",
    code: error.code || 500,
    data: error || null,
  });
};
