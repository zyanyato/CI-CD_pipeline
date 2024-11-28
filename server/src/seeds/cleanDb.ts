// import models from '../models/index.js';
// import db from '../config/connection.js';

// export default async (modelName: "Question", collectionName: string) => {
//   try {
//     let modelExists = await models[modelName].db.db.listCollections({
//       name: collectionName
//     }).toArray()

//     if (modelExists.length) {
//       await db.dropCollection(collectionName);
//     }
//   } catch (err) {
//     throw err;
//   }
// }
import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    // Ensure the model exists
    const model = models[modelName];
    if (!model || !model.db || !model.db.db) {
      throw new Error(`Model "${modelName}" or its database is not properly initialized.`);
    }

    // Check if the collection exists
    const collections = await model.db.db.listCollections({ name: collectionName }).toArray();

    // Drop the collection if it exists
    if (collections.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    console.error(`Error in cleanDb: ${err.message}`);
    throw err;
  }
};
