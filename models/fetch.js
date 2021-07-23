// Mongo Client
var MongoClient = require('mongodb').MongoClient;

// Mongo connections
const uri = process.env.DB_HOST;
const client = new MongoClient(uri);

const getCollection = async (name) => {
  // Create DB connection
  await client.connect();
  const database = client.db(process.env.DB_NAME);
  return database.collection(name);
};

const fetchRecords = async ({ startDate, endDate, minCount, maxCount
 }) => {
  try {
    const collection = await getCollection(process.env.DB_COLLECTION);
    // Retreive data based on filtering logic
    const result = await collection
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $project: {
            _id: 0,
            key: 1,
            createdAt: 1,
            totalCount: {
              $reduce: {
                input: "$counts",
                initialValue: 0,
                in: {
                  $add: ["$$value", "$$this"],
                },
              },
            },
          },
        },
        {
          $match: {
            totalCount: {
              $gte: minCount,
              $lte: maxCount
            }
          }
        }
      ])
      .toArray();
    return result;
  } catch (err) {
    console.log(`Error while connecting to DB`, err);
    throw err;
  }
};

module.exports = fetchRecords;