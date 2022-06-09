const successResponse = (res, msg) => {
  const data = {
    status: 1,
    message: msg,
  };
  return res.status(200).json(data);
};

const successResponseWithData = (res, msg, data) => {
  const resData = {
    status: 1,
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

const errorResponse = (res, msg) => {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(500).json(data);
};

const notFoundResponse = (res, msg) => {
  var data = {
    status: 0,
    message: msg,
  };
  return res.status(404).json(data);
};

export {
  successResponse,
  successResponseWithData,
  errorResponse,
  notFoundResponse,
};
