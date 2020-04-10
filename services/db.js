const Connection = require("../db/connection");

const dbService = ()=>{
    const  sync = async ()=>{
        await Connection.sync();
    }
    const init = async ()=>{
        try{
            await sync();
        }catch(err){
            console.log("Error in syncing database ", err);
        }
    }
    return {
        init
    }
}

module.exports = dbService