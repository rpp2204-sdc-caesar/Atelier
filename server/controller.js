const db = require('./mongoDB');
const redis = require('redis');

let REDIS_PORT = process.env.REDIS || 6379;
const redisClient = redis.createClient(REDIS_PORT);

(async () => {
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
  console.log('Connected to Redis');
})();

let getAll = (n=5) => {
  try{
    redisClient.get('all'+n).then(results => {
      if(results) {
        return redisClient.get('all'+n);
      }
    }).catch(err => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }

  let fields = {
    id:1,
    name:1,
    slogan:1,
    description:1,
    category:1,
    default_price:1
  }
    //return db.Prods.find({id:{$lte:n}}, fields).sort({"id":1}).limit(n);
  db.Prods.find({}, fields).limit(n).then(results => {
      redisClient.set('all'+n, JSON.stringify(results), {
        EX: 180,
        NX: false
      });
    });
  return db.Prods.find({}, fields).limit(n);
    //return results;
}

let getOne = (id) => {
  try{
    redisClient.get(`${id}`).then(results => {
      if(results) {
        return redisClient.get(`${id}`);
      }
    }).catch(err => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }

  let fields = {
    id:1,
    name:1,
    slogan:1,
    description:1,
    category:1,
    default_price:1,
    features:1
  }

  db.Prods.find({id:id}, fields).then(results => {
    redisClient.set(`${id}`, JSON.stringify(results), {
      EX: 180,
      NX: false
    });
  });

  return db.Prods.find({id:id}, fields);
  //return results;
}

let getStyles = (id) => {
  try{
    redisClient.get('style'+id).then(results => {
      if(results) {
        return redisClient.get('style'+id);
      }
    }).catch(err => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }

  let fields = {
    id:1,
    results:1
  }

  db.Prods.find({id:id}, fields).then(results => {
    redisClient.set('style'+id, JSON.stringify(results), {
      EX: 180,
      NX: false
    });
  });
  return db.Prods.find({id:id}, fields);
}

let getIds = (id) => {
  try{
    redisClient.get('related'+id).then(results => {
      if(results) {
        return redisClient.get('related'+id);
      }
    }).catch(err => {
      console.log(err);
    });
  } catch (error) {
    console.log(error);
  }

  let fields = {
    related:1
  }

  db.Prods.find({id:id}, fields).then(results => {
    redisClient.set('related'+id, JSON.stringify(results), {
      EX: 180,
      NX: false
    });
  });
  return db.Prods.find({id:id}, fields);
}

module.exports = {
  getAll,
  getIds,
  getOne,
  getStyles
}