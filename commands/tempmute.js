const Discord = require('discord.js')
const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
 
module.exports = {
    run: async (message, args, client) => {

        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <:invalid:928050571187986483>')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('<:invalid:928050571187986483> **Veuillez mentionner le membre à mute.** <:invalid:928050571187986483>')
        const id = member.id
        if (!member.id || member.id === message.author.id) return message.channel.send ('<:invalid:928050571187986483> **Vous ne pouvez pas vous report vous même.** <:invalid:928050571187986483>')
        if (member.id === message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez mute le propriétaire du serveur.** <:invalid:928050571187986483>')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez pas mute ce membre.** <:invalid:928050571187986483>')
        if (!member.manageable) return message.channel.send('<:invalid:928050571187986483> **Le bot ne peut pas mute ce membre.** <:invalid:928050571187986483>')
        const duration = parseDuration(args[2])
        if (!duration) return message.channel.send('<:invalid:928050571187986483> **Veuillez indiquer une durée valide.** <:invalid:928050571187986483>')
        const reason = args.slice(3).join(' ').replace (`${member}`, ` `) || 'Aucune raison fournie.'
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
        .setDescription(`<:valid:928050570122653698> | **${member.user.tag}** a bien été **mute** pendant \`${humanizeDuration(duration, {language: 'fr'})}\``)
        .setTimestamp())

        setTimeout(() => {
            const membredm = message.mentions.members.first().id

            client.users.cache.get(membredm).send(`Vous pouvez maintenant **parler** dans **${message.guild.name}**`)
            if (member.deleted || !member.manageable) return
            member.roles.remove(muteRole)
            message.channel.send(new Discord.MessageEmbed()
            .setTitle('__Unmute__')
            .setDescription(`<:valid:928050570122653698> | **${member.user.tag}** a bien été **unmute**`)
            .setTimestamp())
        }, duration)

        await client.users.cache.get(id).send(`Vous avez été **mute** dans **${message.guild.name}** par **${message.author.username}** pendant \`${humanizeDuration(duration, {language: 'fr'})}\` ! Raison :
\`\`\`${reason}\`\`\``)

    },
    name: 'tempmute',
    guildOnly: true
}