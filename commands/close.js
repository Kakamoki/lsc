const fs = require('fs')
 
module.exports = {
    run: async (message, args, client) => {
        const channel = message.mentions.channels.first() || message.channel
        if (!client.db.tickets[channel.id]) return message.channel.send('<:invalid:928050571187986483> **Ce salon n\'est pas un ticket.** <:invalid:928050571187986483>')
        if (!message.member.hasPermission('MANAGE_MESSAGES') && client.db.tickets[channel.id].author !== message.author.id) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission de fermer ce ticket.** <:invalid:928050571187986483>')
        delete client.db.tickets[channel.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        await message.channel.send(`**Le ticket ${channel.name} a été fermé ! <:valid:928050570122653698>**`)
        channel.delete()
    },
    name: 'close',
    guildOnly: true
}