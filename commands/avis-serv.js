const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('<a:certif:853255928984109067> __Avis du serveur__')
            .setDescription(`Laissez votre avis sur le serveur en [cliquant ici](https://disboard.org/fr/server/846809197223346196)`)
            .setColor('#ff00f3')
            .setFooter('©️ Nxyako', 'https://cdn.discordapp.com/attachments/807305437849845812/807322623351849040/potentielle_futur_pdp.png')
            .setTimestamp())
    },
    name: 'avis'
}