
class EuromilClientConfig {
  constructor(host, port) {
      this.host = host;
      this.port = port;
  }
}

const appsettings = require("./appsettings.json")
const config = new EuromilClientConfig(appsettings.EuromilClientConfig.Host, appsettings.EuromilClientConfig.Port)

var PROTO_PATH = __dirname + '/euromil.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });
var euromil_proto = grpc.loadPackageDefinition(packageDefinition).euromil;

function registerBet(request, response) {
console.log(request.body)
checkID = request.body.checkID
key = request.body.key
try {
  var client = new euromil_proto.Euromil(`${config.host}:${config.port}`, grpc.credentials.createInsecure());
  client.registerEuroMil({key: key, checkid: checkID}, function(err, res) {
    var result = ""
    if (!err) {
      result = res.message
    } else {
      result = err
    }
    console.log(result)
    response.send(result)
  });
}
catch (error){
  console.log(error)
  response.send(error)
}
}

const express = require('express')
const cors = require('cors');

const port = process.env.PORT || 3000

const app = express()

app.use(express.static('./'));

// // var corsOptions = {
// //   origin: '*',
// //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
// // }
app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/register', function (req, res){
registerBet(req, res)
})

app.listen(port, () => {
console.log(`Server running at port ${port}`)
})
