const moment = require('moment')
require('moment-timezone');

module.exports = function(robot) {
  robot.respond(/pr(?:ó|o)ximo pvp/gi, function(msg){
    const nextFriday = moment().day('Saturday');
    const fridayFormat = nextFriday.format().split('T')[0];
    const fridayformatToCompare = moment(fridayFormat+' 00:00:00')
    const today = moment.tz('America/Santiago');
    const diferences = moment.duration(fridayformatToCompare.diff(today));
    console.log(diferences.days());
    if (diferences.days() === 0) {
      return msg.send(`Queda ${diferences.hours()} Horas - ${diferences.minutes()} Minutos`)
    }
    return msg.send(`Queda ${diferences.days()} Dias - ${diferences.hours()} Horas - ${diferences.minutes()} Minutos`)
  });
}