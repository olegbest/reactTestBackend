import products from './products';
import files from './files';

files.hasOne(products, { foreignKey: 'imgId', as: 'image' });
products.belongsTo(files, { foreignKey: 'imgId', as: 'image' });
// products.hasOne(files);
// files.belongsTo(products);
