const fs = require('fs')
 
module.exports = {
    run: (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <:invalid:928050571187986483>')
        const channel = message.mentions.channels.first() || message.channel
        if (!client.db.lockedChannels.includes(channel.id)) return message.channel.send('<:invalid:928050571187986483> **Ce salon n\'est pas vérrouillé.** <:invalid:928050571187986483>')
        client.db.lockedChannels.splice(client.db.lockedChannels.indexOf(channel.id), 1)
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.overwritePermissions([{id: message.guild.roles.everyone.id, allow: ["SEND_MESSAGES"]}])
        message.channel.send('**Ce salon a été déverrouillé.** <:valid:928050570122653698>')
    },
    name: 'unlock',
    guildOnly: true
}