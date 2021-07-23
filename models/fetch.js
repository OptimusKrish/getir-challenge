// Mongo Client
var MongoClient = require('mongodb').MongoClient;

// Mongo connections
const uri = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';
const client = new MongoClient(uri);

async function getData(reqObj) {
  try {
    // Create DB connection
    await client.connect();
    const database = client.db('getir-case-study');
    const getirRecord = database.collection('records');
    const convertedStartDate = new Date(reqObj.startDate);
    const convertedEndDate = new Date(reqObj.endDate);

    const query = { createdAt: { $gte: convertedStartDate, $lte: convertedEndDate } };
    const results = await getirRecord.find(query).toArray();
    const records = [];
    results.forEach((result) => {
      let calculatedCount = result.counts.reduce((a, b) => a + b);
      if(calculatedCount > reqObj.minCount && calculatedCount < reqObj.maxCount) {
        records.push({key: result.key, createdAt: result.createdAt, totalCount: calculatedCount});
      } else {
        console.log('calculatedCount is more >> ', calculatedCount);
      }
    });
    const processed = {
      code: 0,
      msg: "Success",
      records
    };
    return processed;
  } catch(e) {
    console.log(`Error while connecting to DB`, e);
    return { code: -1, error: e , msg: 'DB connection error'};
  } finally {
    // To Close the connection after completion
    await client.close();
  }
};

module.exports = getData;