
// Define DB connections for different environments
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/ajaxblog'
  },
  test: {},
  production: {
    client: 'pg',
    connection: 'postgres://bnrdptlockdtcv:1feaf7477ec255cb30aa303a11931f7196c10891b2a7772cd53a118f880f2df7@ec2-54-243-61-194.compute-1.amazonaws.com:5432/dd6h456uoib81s'
  }
}
