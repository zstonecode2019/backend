const Database = require('../database');

const database = new Database();

const save = async (cache) => {
    const redis = await database.getRedis();
    const type = typeof cache.value;
    let result;
    if(type == 'string'){
        result = await redis.set(cache.key, cache.value);
    }else{
        const json_value = JSON.stringify(cache.value);
        result = await redis.set(cache.key, json_value);
        // result = await redis.hSet(cache.key, 'field', Buffer.from("haha"));
    }
    return result;
}

const getByKey = async (key) => {
    const redis = await database.getRedis();
    const result = await redis.get(key);
    return result;
}


module.exports = {
    save,
    getByKey,
}