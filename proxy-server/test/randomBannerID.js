
const randomID = (userContext, events, done) => {
  const id = Math.floor(Math.random()*1000000) + 9000000;
  userContext.vars.id = id;
  return done();
}

module.exports.randomID = randomID;