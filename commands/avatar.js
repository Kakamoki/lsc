module.exports = {
    run: async (message, client, args) => {
         const member = message.mentions.members.first()
        if (member) {
            message.channel.send(`${member.user.displayAvatarURL({dynamic: true, size: 1024})}`)
        } else {
            message.channel.send(`${message.author.displayAvatarURL({dynamic: true, size: 1024})}`)
        }
    },
    name: 'avatar',
}