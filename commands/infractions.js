const moment = require('moment'),
    Discord = require('discord.js')
 
moment.locale('fr')
 
module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <:invalid:928050571187986483>')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('**<:invalid:928050571187986483> Veuillez mentionner le membre dont voir les warns. <:invalid:928050571187986483>**')
        if (!client.db.warns[member.id]) return message.channel.send('<:invalid:928050571187986483> **Ce membre n\'a aucun warn.** <:invalid:928050571187986483>')
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**Total de warns :** ${client.db.warns[member.id].length}\n\n__**10 derniers warns**__\n\n${client.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`))
    },
    name: 'infractions',
    guildOnly: true
}