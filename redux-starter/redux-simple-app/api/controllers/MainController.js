module.exports = {
  index: mapReqView()
};

function mapReqView() {
  return function (req, res) {
    return res.render('index');
  }
}
