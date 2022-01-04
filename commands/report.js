const Discord = require('discord.js')

module.exports = {
    run: async (message, args, client) => {
const member = message.mentions.members.first()
const reason = args.slice(2).join(" ").replace(`${member}`, ` `)

if (!member) return message.channel.send('<:invalid:928050571187986483> **Veuillez spécifier un membre à signaler!** <:invalid:928050571187986483>')
if (!member.id || member.id === message.author.id) return message.channel.send ('<:invalid:928050571187986483> **Vous ne pouvez pas vous report vous même.** <:invalid:928050571187986483>')
const id = member.id
if (!reason) return message.channel.send('<:invalid:928050571187986483> **Veuillez préciser la raison de ce rapport!** <:invalid:928050571187986483>')
if (!args[0]) return message.channel.send('<:invalid:928050571187986483> **Veuillez indiquer du texte à envoyer.** <:invalid:928050571187986483>')

message.channel.send(new Discord.MessageEmbed()
.setColor('RANDOM')
.setThumbnail(member.avatarURL)
.addField('Membre report', `${member} son id: ${member.id}`)
.addField('Report par', `${message.author} son id: ${message.author.id}`)
.addField('Report il y a', message.createdAt)
.addField('Report dans', message.channel)
.addField('Raison', reason)
.setFooter('Informations du membre report', member.displayAvatarURL)).then(message => message.react(message.guild.emojis.cache.get('793822595707305984')));

await client.users.cache.get(id).send(`Vous avez été **report** (pas warn) dans **${message.guild.name}** par **${message.author.username}** pour
\`\`\`${reason}\`\`\``)

message.delete()
},
name: 'report',
guildOnly: true
}