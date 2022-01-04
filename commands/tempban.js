const Discord = require('discord.js')
const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
 
module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('<:invalid:928050571187986483> **Vous n\'avez pas la permission d\'utiliser cette commande.** <:invalid:928050571187986483>')
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        if (!member) return message.channel.send('<:invalid:928050571187986483> **Veuillez mentionner le membre à bannir.** <:invalid:928050571187986483>')
        const id = member.id
        if (!member.id || member.id === message.author.id) return message.channel.send ('<:invalid:928050571187986483> **Vous ne pouvez pas vous report vous même.** <:invalid:928050571187986483>')
        if (member.id === message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez pas bannir le propriétaire du serveur.** <:invalid:928050571187986483>')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('<:invalid:928050571187986483> **Vous ne pouvez pas Bannir ce membre.** <:invalid:928050571187986483>')
        if (!member.bannable) return message.channel.send('<:invalid:928050571187986483> **Le bot ne peut pas bannir ce membre.** <:invalid:928050571187986483>')
        const duration = parseDuration(args[2])
        if (!duration) return message.channel.send('<:invalid:928050571187986483> **Veuillez indiquer une durée valide.** <:invalid:928050571187986483>')
        const reason = args.slice(1).join(' ').replace(`${member}`, ` `).replace(`${duration}`, ` `)
        if (!reason) return message.channel.send('<:invalid:928050571187986483> **Veuillez indiquer une raison** <:invalid:928050571187986483>')
        await client.users.cache.get(id).send(`Vous avez été **ban** de **${message.guild.name}** par **${message.author.username}** pendant \`${humanizeDuration(duration, {language: 'fr'})}\``)        
        await member.ban({reason})
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('__Ban__')
            .setDescription(`<:valid:928050570122653698> | **${member.user.tag}** a bien été **ban** pendant \`${humanizeDuration(duration, {language: 'fr'})}\``)
            .setTimestamp())
        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(new Discord.MessageEmbed()
            .setTitle('__Unban__')
            .setDescription(`<:valid:928050570122653698> | **${member.user.tag}** a bien été **unban**`)
            .setTimestamp())
        }, duration)
    },
    name: 'tempban',
    guildOnly: true
}