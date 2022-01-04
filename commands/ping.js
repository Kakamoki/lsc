module.exports = {
    run: (message, args, client) => {
      //calculer les pings
      message.reply('Calculating ping...').then((resultMessage) => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp
  
        resultMessage.edit(`**Pong 🏓** ${ping} ms`)
      })
    },
  name: 'ping'
}