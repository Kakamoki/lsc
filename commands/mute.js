const Discord = require('discord.js')

module.exports = {
    run: async (message, args, client) => {

        const member = message.mentions.members.first()

if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <:invalid:928050571187986483>')
if (!member) return message.channel.send('<:invalid:928050571187986483> **Veuillez mentionner le membre à mute.** <:invalid:928050571187986483>')
const id = member.id
if (member.id === message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez mute le propriétaire du serveur.** <:invalid:928050571187986483>')
if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez pas mute ce membre.** <:invalid:928050571187986483>')
if (!member.manageable) return message.channel.send('<:invalid:928050571187986483> **Le bot ne peut pas mute ce membre.** <:invalid:928050571187986483>')
const reason = args.slice(2).join(" ").replace(`${member}`, ` `) 
if (!reason) return message.channel.send('<:invalid:928050571187986483> **Veuillez donner une raison à ce mute.** <:invalid:928050571187986483>')
let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')

if (!muteRole) {
    muteRole = await message.guild.roles.create({
        data: {
            name: 'Muted',
            permissions: 0
        }
    })
    message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    }))
}
await member.roles.add(muteRole)
message.channel.send(new Discord.MessageEmbed()
.setTitle('__Mute__')
.setDescription(`<:valid:928050570122653698> | **${member.user.tag}** a bien été **mute**
Raison: \`\`\`${reason}\`\`\``)
.setTimestamp())

await client.users.cache.get(id).send(`Vous avez été **mute** dans **${message.guild.name}** par **${message.author.username}**
Raison: \`\`\`${reason}\`\`\``)

},
name: 'mute',
guildOnly: true
}