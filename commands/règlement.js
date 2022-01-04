const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('<a:courronne:853255930068860928> __Règlement du serveur__')
            .setDescription(`:no_entry: | *Il est interdit*
            
<a:fleche:853255854958313503> | De manquer de respect aux personnes présentes sur le discord.
<a:fleche:853255854958313503> | Les propos racistes, sexistes, homophobes... sont formellement interdits !
<a:fleche:853255854958313503> | De spammer sans intérêts
<a:fleche:853255854958313503> | De mentionner inutilement un modérateur.
<a:fleche:853255854958313503> | D'abuser des majuscules et/ou des emojis dans vos messages.
<a:fleche:853255854958313503> | De faire sa propre pub ou de diffuser une pub.
<a:fleche:853255854958313503> | Aucune forme de harcèlement ne sera tolérée, il n'y aura donc aucune indulgence en cas de moqueries ou de réunions pour violenter qui que ce soit.
<a:fleche:853255854958313503> | Nudes interdit
            
**__Le non-respect d'une ou plusieurs de ces règles peut entrainer des sanctions, allant du simple mute au bannissement définitif de la communauté.__**`)
            .setColor('#ff00f3')
            .setAuthor('Neruvia™', 'https://media.discordapp.net/attachments/846810070884155392/853543878346276894/a_e9570907dafae5e943784cb19fabcac5.gif')
            .setFooter('©️ Nxyako', 'https://cdn.discordapp.com/attachments/812276884028129311/813070798339702794/tenor.gif')
            .setTimestamp()
            .setImage('https://media.discordapp.net/attachments/844081294437777458/844330082284732416/1621373461949.jpg?width=1202&height=676')
            .setURL(''))
            message.delete()
            if(message.author.id !== "616526869705129984") return message.channel.send('<a:denied:853255916275236884> **Seul Nxyako y a accès.** <a:denied:853255916275236884>');
    },
    name: 'regle'
}