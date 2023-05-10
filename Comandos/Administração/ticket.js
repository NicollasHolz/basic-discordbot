const Discord = require("discord.js")

module.exports = {
  name: "ticket", // Coloque o nome do comando
  description: "Abre o painel de tickets.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor("DarkVividPink")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setTitle(`Sistema de Ticket Automático`)
        .setDescription(`Para abrir um ticket selecione uma opção no menu abaixo:`);

        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.SelectMenuBuilder()
            .setCustomId("painel_ticket")
            .setPlaceholder("➡️ Clique aqui para abrir um ticket!")
            .addOptions(
                {
                    label: "Suporte",
                    description: "Abra um ticket na opção de Suporte.",
                    value: "opc1"
                },
                {
                    label: "Denúncia",
                    description: "Abra um ticket na opção de Denúncia .",
                    value: "opc2"
                },
                {
                    label: "Bug",
                    description: "Abra um ticket na opção de Bugs.",
                    value: "opc3"
                }
            )
        );
        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [painel] })
                
    }
    


  }
}