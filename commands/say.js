const config = require('../config.json')
const Discord = require('discord.js')
 
module.exports = {
    run: (message, args) => {
        if (!args[1]) return message.channel.send('<:invalid:928050571187986483> **Veuillez indiquer du texte à envoyer.** <:invalid:928050571187986483>')
        message.delete()
        message.channel.send(message.content.trim().slice(`${config.prefix}say`.length).split("@").join(""))
    },
    name: 'say',
} 