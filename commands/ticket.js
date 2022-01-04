const config = require('../config.json'),
    fs = require('fs'),
    Discord = require('discord.js')
 
module.exports = {
    run: async (message, args, client) => {
        if (Object.values(client.db.tickets).some(ticket => ticket.author === message.author.id)) return message.channel.send('<:invalid:928050571187986483> **Vous avez déjà un ticket d\'ouvert.** <:invalid:928050571187986483>')
        const channel = await message.guild.channels.create(`『🔒』ticket ${message.author.username}`, {
            type: 'text',
            parent: config.ticket.category,
            permissionOverwrites: [{
                id: message.guild.id,
                deny: 'VIEW_CHANNEL'
            }, {
                id: message.author.id,
                allow: 'VIEW_CHANNEL'
            }, ...config.ticket.roles.map(id => ({
                id,
                allow: 'VIEW_CHANNEL'
            }))]
        })
        client.db.tickets[channel.id] = {
            author: message.author.id
        }
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        channel.send(`Bonjour ${message.member} <:lscriminals:928045281143058523>`)
        channel.send(new Discord.MessageEmbed()
            .setDescription(`Bienvenue dans votre ticket. Nous allons nous occuper de vous.
En attendant, veuillez nous expliquer votre **problème le plus clairement possible**`))

            message.channel.send(`**Votre ticket ${channel} a été créé.** <:valid:928050570122653698>`)
            .then(message => message.delete({ timeout: 10000 }));
        message.delete()
    },
    name: 'ticket',
    guildOnly: true
}