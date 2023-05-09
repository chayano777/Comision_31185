import fs from 'fs';
import __dirname from './utils.js'

export default class ManagerAccess {
    async crearRegistro(metodo){

        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const msg = `\nFecha: ${date} - Hora: ${time} - Metodo: ${metodo}`;

        await fs.promises.appendFile(__dirname+'/log.txt',msg,(error)=>{
            return error
        })
    }
}
