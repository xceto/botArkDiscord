const moment = require('moment')
require('moment-timezone');

const formatSaturday = (data) => {
  const fridayFormat = data.format().split('T')[0];
  return moment(fridayFormat+' 00:00:00')
};

const diferenceResponse = (intial, final) => {
  return moment.duration(intial.diff(final));
};

module.exports = function (robot) {
  robot.respond(/pr(?:ó|o)ximo pvp/gi, async function(msg){
    const nextFriday = moment().day('Saturday');
    const fridayformatToCompare = await formatSaturday(nextFriday);
    const today = moment.tz('America/Santiago');
    let diferences = diferenceResponse(fridayformatToCompare, today)

    if(diferences.hours() < 0) {
      const nextFridayWeek = formatSaturday(nextFriday.add(1, 'weeks')) 
      diferences = diferenceResponse(nextFridayWeek, today)
    }

    if (diferences.days() === 0) {
      return msg.send(`Queda ${diferences.hours()} Horas - ${diferences.minutes()} Minutos`)
    } 
    return msg.send(`Queda ${diferences.days()} Dias - ${diferences.hours()} Horas - ${diferences.minutes()} Minutos`)
  });
}