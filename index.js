 const { fetchMyIP } = require('./iss');
 const { fetchISSFlyOverTimes } = require('./iss');
 const { nextISSTimesForMyLocation } = require('./iss');
 
 const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => { 
    if(error) {
      console.log('error',error);
    }
  
     fetchCoordsByIP(ip, (error, myGeo) =>{
      if(error) {
        console.log('error', error);
      }
  
      fetchISSFlyOverTimes(myGeo, (error,stationPassTime) =>{
  
        if(error) {
          console.log('error', error);
        }
        callback(error, stationPassTime);
  
      })
  
    });
  });

}

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, stationPasstime) => {

  if(error){
    return error
  }
  
printPassTimes(stationPasstime);

});