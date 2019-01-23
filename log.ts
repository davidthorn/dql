import util from 'util'


const log = (text: string , data?: any) => {

    const { DEBUG } = process.env
 
    if(DEBUG === undefined) return

    console.log(text , { colors: true })
    console.log(util.inspect(data, { compact: false, depth: 5, breakLength: 80 }), { colors: true });
    

}

export { log as dqllog }