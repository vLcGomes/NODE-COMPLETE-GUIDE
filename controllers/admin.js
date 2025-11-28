const Product = require('../models/product')

exports.getAddProducts = (req, res, next) => {
  res.render('admin/edit-product', { 
    docTitle: 'Add Product', 
    path: '/admin/add-product',
    editing: false
  })
}

exports.postAddProducts = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  Product.create({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl
  })
    .then(result => {
      console.log('Product Added on Database')
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }

  const prodId = req.params.productId
  Product.findByPk(prodId).then(product => {

    if (!product) {
      return res.redirect('/')
    }
  
    res.render('admin/edit-product', { 
      docTitle: 'Edit Product', 
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    })
  }).catch(err => {
    console.log(err)
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedProdTitle = req.body.title
  const updatedProdImageUrl = req.body.imageUrl
  const updatedProdPrice = req.body.price
  const updatedProdDesc = req.body.description
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedProdTitle
      product.imageUrl = updatedProdImageUrl
      product.price = updatedProdPrice
      product.description = updatedProdDesc
      return product.save()
    })
    .then(result => {
      console.log('Updated Product')
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('admin/products', {
      prods: products,
      docTitle: 'Shop',
      path: '/admin/products'
    })
  }).catch(err => {
    console.log(err)
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findByPk(prodId)
  .then(product => {
    return product.destroy(prodId)
  })
  .then(result => {
    console.log('Product Removed')
    res.redirect('/admin/products')
  })
  .catch(
    err => console.log(err)
  )
}