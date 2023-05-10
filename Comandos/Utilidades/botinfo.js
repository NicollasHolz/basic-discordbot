const Discord = require("discord.js")

module.exports = {
  name: "botinfo", // Coloque o nome do comando
  description: "Fornece informações sobre o bot.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let dono = "233269717790359552";
    let membros = client.users.cache.size;
    let servidores = client.guilds.cache.size;
    let canais = client.channels.cache.size;
    let bot = client.user.tag;
    let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
    let linguagem = "JavaScript";
    let livraria = "Discord.Js";
    let ping = client.ws.ping;

    let embed = new Discord.EmbedBuilder()
    .setColor("DarkVividPink")
    .setAuthor({ name: bot, iconURL: avatar_bot })
    .setFooter({ text: bot, iconURL: avatar_bot })
    .setTimestamp(new Date())
    .setThumbnail(avatar_bot)
    .setDescription(`Olá ${interaction.user}, veja minhas informações abaixo:\n\n> 🤖 Nome: \`${bot}\`.\n> 🤖 Dono: ${client.users.cache.get(dono)}.\n> 👾 Membros: \`${membros}\`.\n> 👾 Servidores: \`${servidores}\`.\n> 👾 Canais: \`${canais}\`.\n> 👾 Ping: \`${ping}\`.\n> 💻 Linguagem de programação: \`${linguagem}\`.\n> 💻 Livraria: \`${livraria}\`.`);

    interaction.reply({ embeds: [embed] })


  }
}