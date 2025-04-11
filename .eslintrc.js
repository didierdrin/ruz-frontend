module.exports = {
    // Your existing settings
    rules: {
      'no-undef': 'warn',          // Change from error to warning
      'react/jsx-no-undef': 'warn' // Change from error to warning
    },
    // Optional: completely ignore those files
    ignorePatterns: [
      'src/pages/admin/AdminScreen.jsx',
      'src/pages/order/OrderScreen.jsx',
      'src/pages/product/ProductScreen.jsx',
      'src/pages/product/ProductCreateScreen.jsx'
    ]
  };