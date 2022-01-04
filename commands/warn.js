const Discord = require('discord.js')

module.exports = {
    run: async (message, args, client) => {
        
        const member = message.mentions.members.first()

//mettre une permission obligatoire
if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <:invalid:928050571187986483>')
if (!member) return message.channel.send('<:invalid:928050571187986483> **Veuillez mentionner le membre à warn.** <:invalid:928050571187986483>')
const id = member.id
if (!member.id || member.id === message.author.id) return message.channel.send ('<:invalid:928050571187986483> **Vous ne pouvez pas vous report vous même.** <:invalid:928050571187986483>')
if (member.id === message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez pas warn le propriétaire du serveur.** <:invalid:928050571187986483>')
if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez pas warn ce membre.** <:invalid:928050571187986483>')
//enlever les mentions et les virgules du warn
const reason = args.slice(2).join(" ").replace(`${member}`, ` `) 
//mettre une raison obligatoire
if (!reason) return message.channel.send('<:invalid:928050571187986483> **Veuillez indiquer une raison.** <:invalid:928050571187986483>')
message.channel.send(new Discord.MessageEmbed()
            .setTitle('__Warn__')
            .setDescription(`<:valid:928050570122653698> | **${member.user.tag}** a bien été **warn**
Raison: \`\`\`${reason}\`\`\``)
            .setTimestamp())
if (!client.db.warns[member.id]) client.db.warns[member.id] = []
client.db.warns[member.id].unshift({
    reason,
    date: Date.now(),
    mod: message.author.id
})

//send le warn en privé
await client.users.cache.get(id).send(`Vous avez été **warn** dans **${message.guild.name}** par **${message.author.username}**
Raison: \`\`\`${reason}\`\`\``)

},
name: 'warn',
guildOnly: true
}