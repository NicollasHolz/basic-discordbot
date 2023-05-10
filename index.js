const Discord = require("discord.js")
const config = require("./config.json")

const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)




// membro novo
client.on("guildMemberAdd", (member) => {
  let canal_logs = "";
  if (!canal_logs) return;

  let embed = new Discord.EmbedBuilder()
  .setColor("DarkVividPink")
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setTitle("👋 Boas Vindas!")
  .setDescription(`> Salve ${member}!\nSeja Bem-Vindo(a) ao servidor \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.`);

  member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) // Caso queira que o usuário não seja mencionado, retire a parte do "content".
})

// membro saiu
client.on("guildMemberRemove", (member) => {
  let canal_logs = ""; // Coloque o ID do canal de texto
  if (!canal_logs) return;

  let embed = new Discord.EmbedBuilder()
  .setColor("DarkVividPink")
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setTitle(`Até logo ${member.user.username}....`)
  .setDescription(`> O usuário ${member} saiu do servidor!\n> Nos sobrou apenas \`${member.guild.memberCount}\` membros.`);

  member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) // Caso queira que o usuário não seja mencionado, retire a parte do "content". 
})



// ticket
client.on("interactionCreate", (interaction) => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "painel_ticket") {
      //interaction.update({ components: [interaction.message.components][1] })
      let opc = interaction.values[0]
      if (opc === "opc1") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "1086396177303482448" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            },
            {
              id: "1086399950780371006", // id do cargo que verá os tickets
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção Suporte.`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      } else if (opc === "opc2") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "1086396177303482448" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            },
            {
              id: "1086399950780371006", // id do cargo que verá os tickets
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção Denúncia.`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      } else if (opc === "opc3") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "1086396177303482448" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            },
            {
              id: "1086399950780371006", // id do cargo que verá os tickets
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção Bugs.`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      }
    }
  }
  if (interaction.isButton()) {
    if (interaction.customId === "fechar_ticket") {
      interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 3 segundos...`)
      setTimeout ( () => {
        try { 
          interaction.channel.delete()
        } catch (e) {
          return;
        }
      }, 3000)
    }
  }
})


