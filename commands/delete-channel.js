module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <:invalid:928050571187986483>')
        message.channel.delete()
    },
    name: "delete-channel",
    guildOnly: true
  }