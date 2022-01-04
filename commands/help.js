const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('__Commandes du bot__')
            .setDescription(`<:lscriminals:928045281143058523> | **Commandes de modération**
            
\`clear\`, \`warn\`, \`infractions\`, \`mute\`, \`unmute\`, \`tempmute\`, \`lock\`, \`unlock\`, \`templock\`, \`ban\`, \`tempban\`, \`delete-channel\`, \`report\`, \`kick\`

<:lscriminals:928045281143058523> | **Commandes d'informations**

\`user-info\`, \`role-info\`, \`server-info\`

<:lscriminals:928045281143058523> | **Commande de ticket (staff)**

\`ticket\`, \`close\`

<:lscriminals:928045281143058523> | **Commandes autres**

\`say\`, \`embed\`, \`avatar\`

<:lscriminals:928045281143058523> | Le __préfixe__ est \`=\`
<:lscriminals:928045281143058523> **| Laissez votre avis sur le serveur** en [cliquant ici](https://disboard.org/server/917428880485269525)`)
            .setColor('#ff00f3')
            .setFooter('©️ Nxyako', 'https://cdn.discordapp.com/attachments/812276884028129311/813070798339702794/tenor.gif')
            .setTimestamp()
            .setURL(''))
    },
    name: 'help'
}