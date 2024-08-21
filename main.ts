// import { BluetoothSerialPort } from 'node-bluetooth-serial-port'
import * as usb from 'usb'
import { default as EscPosEncoder } from 'esc-pos-encoder'

// const btSerial = new BluetoothSerialPort()
const devices = usb.getDeviceList()
const encoder = new EscPosEncoder()

const result = encoder
  .initialize()
  .height(2)
  .text('Esse e um teste de impressao via Bluetooth.')
  .height(1)
  .newline()
  .qrcode('https://nielsleenheer.com')
  .newline()
  .newline()
  .underline()
  .cut()
  .encode()

console.log(devices)

// const macAddress = '66:22:90:52:96:BF'

// function sendPrintCommand(channel: number): void {
//   btSerial.connect(
//     macAddress,
//     channel,
//     () => {
//       console.log('Conectado à impressora!')

//       btSerial.write(result as Buffer, (err) => {
//         if (err) {
//           console.error('Erro ao enviar comando:', err)
//         }

//         btSerial.close()
//       })
//     },
//     () => {
//       console.log('Não foi possível conectar ao dispositivo.')
//     }
//   )
// }

// btSerial.findSerialPortChannel(macAddress, sendPrintCommand)
