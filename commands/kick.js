const Discord = require('discord.js')

module.exports = {
    run: async (message, args, client) => {

const member = message.mentions.members.first()

if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <:invalid:928050571187986483>')
if (!member) return message.channel.send('<:invalid:928050571187986483> **Veuillez mentionner le membre à exclure.** <:invalid:928050571187986483>')
const id = member.id
if (!member.id || member.id === message.author.id) return message.channel.send ('<:invalid:928050571187986483> **Vous ne pouvez pas vous report vous même.** <:invalid:928050571187986483>')
if (member.id === message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez pas exclure le propriétaire du serveur.** <:invalid:928050571187986483>')
if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez pas exclure ce membre.** <:invalid:928050571187986483>')
if (!member.kickable) return message.channel.send('<:invalid:928050571187986483> **Le bot ne peut pas exclure ce membre.** <:invalid:928050571187986483>')
const reason = args.slice(2).join(" ").replace(`${member}`, ` `) 
if (!reason) return message.channel.send('<:invalid:928050571187986483> **Veuillez indiquer une raison à cette expulsion !** <:invalid:928050571187986483>')
await member.kick(reason)
message.channel.send(new Discord.MessageEmbed()
.setTitle('__Exclusion__')
.setDescription(`<:valid:928050570122653698> | **${member.user.tag}** a bien été **exclu**
Raison: \`\`\`${reason}\`\`\``)
.setTimestamp())

await client.users.cache.get(id).send(`Vous avez été **kick** de **${message.guild.name}** par **${message.author.username}**
Raison: \`\`\`${reason}\`\`\``)

},
name: 'kick',
guildOnly: true
}