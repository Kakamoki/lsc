const Discord = require('discord.js')

module.exports = {
    run: async (message, args, client) => {

if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <:invalid:928050571187986483>')
const member = message.mentions.members.first()
if (!member) return message.channel.send('<:invalid:928050571187986483> **Veuillez mentionner le membre à unmute.** <:invalid:928050571187986483>')
const id = member.id
if (!member.id || member.id === message.author.id) return message.channel.send ('<:invalid:928050571187986483> **Vous ne pouvez pas vous report vous même.** <:invalid:928050571187986483>')
if (member.id === message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez unmute le propriétaire du serveur.** <:invalid:928050571187986483>')
if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez pas unmute ce membre.** <:invalid:928050571187986483>')
if (!member.manageable) return message.channel.send('<:invalid:928050571187986483> **Le bot ne peut pas unmute ce membre.** <:invalid:928050571187986483>')
const reason = args.slice(2).join(' ').replace (`${member}`, ` `) || 'Aucune raison fournie.'
const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
if (!muteRole) return message.channel.send('<:invalid:928050571187986483> **Il n\'y a pas de muterole.** <:invalid:928050571187986483>')
if (member.deleted || !member.manageable) return
member.roles.remove(muteRole)
message.channel.send(new Discord.MessageEmbed()
            .setTitle('__Unmute__')
            .setDescription(`<:valid:928050570122653698> | **${member.user.tag}** a bien été **unmute**`)
            .setTimestamp())

await client.users.cache.get(id).send(`Vous pouvez maintenant **parler** dans **${message.guild.name}**`)

},
name: 'unmute',
guildOnly: true
}