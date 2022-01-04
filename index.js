const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true,
        partials: ['MESSAGE', 'REACTION']
    }),
    config = require('./config.json'),
    fs = require('fs'),
    humanizeDuration = require('humanize-duration')
 
client.login(config.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')
 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on("message", message => {
    if(message.author.bot) return
    const args = message.content.trim().split(/ +/g)
    const commandName = args[0].toLowerCase()
        if (!commandName.startsWith(config.prefix)) return
        const command = client.commands.get(commandName.slice(config.prefix.length))
        if (!command) return
        if (command.guildOnly && !message.guild) return message.channel.send('<:invalid:928050571187986483> **Cette commande ne peut être utilisée que dans un serveur.** <:invalid:928050571187986483>')
        command.run(message, args, client)
    })
 
client.on('ready', () => {
    console.log('Je suis prêt !')
    const statuses = [
        () => `🎮 LSCriminals | ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} joueurs`,
        () => `🎮 LSCriminals | =help`
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'WATCHING'})
        i = ++i % statuses.length
    }, 1e4)})

    client.on('channelCreate', channel => {
        if (!channel.guild) return
        const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return
        channel.createOverwrite(muteRole, {
            SEND_MESSAGES: false,
            CONNECT: false,
            ADD_REACTIONS: false
        })
    })

    client.on('guildMemberAdd', member => {
        member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
        .setDescription(`<:lscriminals:928045281143058523> | ${member} a rejoint le serveur.
<:lscriminals:928045281143058523> | Nous sommes désormais **${member.guild.memberCount}** !`)
.setColor('#ff00f3'))

const id = member.id
    })
     
    client.on('guildMemberRemove', member => {
        member.guild.channels.cache.get(config.leaving.channel).send(new Discord.MessageEmbed()
        .setDescription(`<:lscriminals:928045281143058523> | **${member.user.tag}** a quitté le serveur...
        <:lscriminals:928045281143058523> | Nous sommes désormais **${member.guild.memberCount}**`)
.setColor('#ff00f3'))
    })