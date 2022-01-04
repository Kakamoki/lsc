const Discord = require('discord.js')
const prefixe = "="
 
module.exports = {
    run: (message, args) => {
        if (!args[1]) return message.channel.send('<:invalid:928050571187986483> **Veuillez indiquer du texte à envoyer.** <:invalid:928050571187986483>')
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(message.content.replace(`${prefixe}embed`, ``))
            .setColor('RANDOM'))
            message.delete()

    },
    name: 'embed'
}