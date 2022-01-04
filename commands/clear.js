const Discord = require('discord.js')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <a:denied:853255916275236884>')
        const count = args[1]
        if (!/\d+/.test(count)) return message.channel.send('<:invalid:928050571187986483> **Veuillez indiquer un nombre de messages à supprimer.** <:invalid:928050571187986483>')
        if (count < 1 || count > 99) return message.channel.send('<:invalid:928050571187986483> **Le nombre de message doit être compris entre 1 et 99.** <:invalid:928050571187986483>')
        const { size } = await message.channel.bulkDelete(Number(count) + 1, true)

        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`**${size - 1}** messages ont été supprimés ! <:valid:928050570122653698>`)).then(sent => sent.delete({timeout: 5e3}))

},
name: 'clear',
guildOnly: true
    }