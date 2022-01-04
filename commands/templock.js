const fs = require('fs')
const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
 
module.exports = {
    run: async (message, args, client) => {

                if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <:invalid:928050571187986483>')
                const channel = message.channel
                if (client.db.lockedChannels.includes(channel.id)) return message.channel.send('<:invalid:928050571187986483> **Ce salon est déjà vérrouillé.** <:invalid:928050571187986483>')
                const duration = parseDuration(args[1])
                if (!duration) return message.channel.send('<:invalid:928050571187986483> **Veuillez indiquer une durée valide.** <:invalid:928050571187986483>')
                client.db.lockedChannels.push(channel.id)
                fs.writeFileSync('./db.json', JSON.stringify(client.db))
                message.channel.overwritePermissions([{id: message.guild.roles.everyone.id, deny: ["SEND_MESSAGES"]}])
        message.channel.send(`Le salon a été **verrouillé** pendant **${humanizeDuration(duration, {language: 'fr'})}** <:valid:928050570122653698>`)
        setTimeout(() => {
            client.db.lockedChannels.splice(client.db.lockedChannels.indexOf(channel.id), 1)
            fs.writeFileSync('./db.json', JSON.stringify(client.db))
            message.channel.overwritePermissions([{id: message.guild.roles.everyone.id, allow: ["SEND_MESSAGES"]}])
            message.channel.send('**Ce salon a été déverrouillé automatiquement <:valid:928050570122653698>**')
        }, duration)

    },
    name: 'templock',
    guildOnly: true
}