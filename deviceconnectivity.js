var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
 
// open connection to a serial port
client.connectRTU("/dev/ttyUSB0", { baudRate: 9600 }, write);
 
function write() {
    client.setID(1);
 
    // write the values 0, 0xffff to registers starting at address 5
    // on device number 1.
    client.writeRegisters(5, [0 , 0xffff])
        .then(read);
}
 
function read() {
    // read the 2 registers starting at address 5
    // on device number 1.
    client.readHoldingRegisters(5, 2)
        .then(console.log);
}

/*
//----------------testing
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

// open connection to a serial port
client.connectRTUBuffered("/dev/ttyUSB0", { baudrate: 9600 });
client.setID(1);

// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.
setInterval(function() {
    client.readHoldingRegisters(0, 10, function(err, data) {
        console.log(data.data);
    });
}, 1000);


//------------------------
const SerialPort = require('serialport');
const ModbusMaster = require('modbus-rtu').ModbusMaster;

//create serail port with params. Refer to node-serialport for documentation
const serialPort = new SerialPort("/dev/ttyUSB0", {
   baudRate: 2400
});

//create ModbusMaster instance and pass the serial port object
const master = new ModbusMaster(serialPort);

//Read from slave with address 1 four holding registers starting from 0.
master.readHoldingRegisters(1, 0, 4).then((data) => {
    //promise will be fulfilled with parsed data
    console.log(data); //output will be [10, 100, 110, 50] (numbers just for example)
}, (err) => {
    //or will be rejected with error
});

//Write to first slave into second register value 150.
//slave, register, value
master.writeSingleRegister(1, 2, 150).then(success, error);

//---------------------------------testing2

const {ModbusMaster, DATA_TYPES} = require('modbus-rtu');

const master = new ModbusMaster(serialPort);

master.readHoldingRegisters(1, 0, 4).then((data) => {
    //promise will be fulfilled with parsed data
    console.log(data); //output will be [-10, 100, 110, 50] (numbers just for example)
}, (err) => {
    //or will be rejected with error
    //for example timeout error or crc.
});

master.readHoldingRegisters(1, 0, 4, DATA_TYPES.UINT).then((data) => {
    // data will be treat as unsigned integer
    console.log(data); //output will be [20, 100, 110, 50] (numbers just for example)
});

master.readHoldingRegisters(1, 0, 2, (rawBuffer) => {
    //buffer here contains only data without pdu header and crc
    return rawBuffer.readUInt32BE(0);
}).then((bigNumber) => {
    //promise will be fullfilled with result of callback
    console.log(bigNumber); //2923517522
});



*/