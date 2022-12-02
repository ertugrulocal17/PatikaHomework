const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getAddPage = (req, res) => {
  res.status(200).render('add', {
    page_name: 'add',
  });
};

exports.getPhotoPage = (req, res) => {
  res.render('photo');
};

exports.getEditPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};
