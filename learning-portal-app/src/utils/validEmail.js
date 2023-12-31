const validEmail = (e) => {
  var filter =
    /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/;
  return String(e).search(filter) !== -1;
};

export default validEmail;
