export const errorRes = (res, status = 400, message = null) => {
  if (message === null) {
    switch (status) {
      case 400: {
        message = 'The server did not understand the request.';
        break;
      }
      case 500: {
        message = 'There was some internal server error. Please contact Admin';
        break;
      }
      case 404: {
        message = 'The required data could not be found.';
        break;
      }
    }
  }
  return res.status(status).json({error: message}).end()
};