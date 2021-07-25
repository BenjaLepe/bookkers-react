export default (error) => {
  if (error.response) {
    return error.response.data.msg;
  } else if (error.message) {
    return error.message;
  } else {
    return 'Something went wrong, please try again later';
  }
}