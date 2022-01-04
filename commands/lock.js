const fs = require('fs')
 
module.exports = {
    run: (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <:invalid:928050571187986483>')
        const channel = message.mentions.channels.first() || message.channel
        if (client.db.lockedChannels.includes(channel.id)) return message.channel.send('<:invalid:928050571187986483> **Ce salon est déjà vérrouillé.** <:invalid:928050571187986483>')
        client.db.lockedChannels.push(channel.id)
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.overwritePermissions([{id: message.guild.roles.everyone.id, deny: ["SEND_MESSAGES"]}])
        message.channel.send('**Ce salon a été verrouillé.** <:valid:928050570122653698>')
    },
    name: 'lock',
    guildOnly: true
}