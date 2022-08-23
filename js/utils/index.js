const toggleLoading = (status) => {
  $("#loading-full-screen").toggleClass("d-none", status ? !status : null);
};
