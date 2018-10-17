const Discord = require('discord.js');
const client = new Discord.Client();



        var prefix = ".";

client.on('message', async message =>{
const ms = require("ms");
if (message.author.omar) return;
if (!message.content.startsWith(prefix)) return;
if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I Don't Have `MANAGE_ROLES` Permission**").then(msg => msg.delete(6000))
var command = message.content.split(" ")[0];
command = command.slice(prefix.length);
var args = message.content.split(" ").slice(1);
    if(command == "mute") {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("**يجب عليك المنشن اولاّ**:x: ") .then(m => m.delete(5000));
    if(tomute.hasPermission("MANAGE_MESSAGES"))return      message.channel.send('**لا استطيع اعطاء ميوت لاحد ادراء السرفر**');
    let muterole = message.guild.roles.find(`name`, "Muted");
    //start of create role
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#070000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SPEAK : false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.reply("**يرجى تحديد وقت الميوت**:x:");
 
    await(tomute.addRole(muterole.id));
message.reply(`<@${tomute.id}> ${ms(ms(mutetime))} : **تم اعطائه ميوت ومدة الميوت**`);
setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> **انقضى الوقت وتم فك الميوت عن الشخص**:white_check_mark: `);
    }, ms(mutetime));
 
 
 
  }
if(command === `unmute`) {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("**ليس لديك صلاحية لفك عن الشخص ميوت**:x: ").then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I Don't Have `MANAGE_ROLES` Permission**").then(msg => msg.delete(6000))
 
  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.channel.sendMessage("**عليك المنشن أولاّ**:x: ");
 
  let role = message.guild.roles.find (r => r.name === "Muted");
 
  if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("**لم يتم اعطاء هذه شخص ميوت من الأساس**:x:")
 
  await toMute.removeRole(role)
  message.channel.sendMessage("**لقد تم فك الميوت عن شخص بنجاح**:white_check_mark:");
 
  return;
 
  }
 
});





client.on('message', message => {
    var prefix = "م";
    if (message.content.startsWith(prefix + 'سح')) {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`ماعندك هذا البرمشن[*MANAGE_MESSAGES*] `).catch(console.error);
  message.delete()
  if(!message.channel.guild) return;
  let args = message.content.split(" ").slice(1);
  
  const messagecount = parseInt(args.join(' '));
  
  message.channel.fetchMessages({
  
  limit: messagecount
  
  }).then(messages => message.channel.bulkDelete(messages));
  message.channel.sendMessage("", {embed: {
    title: "**✅ تــم مسح الشات**",
    color: 0x06DF00,
    footer: {
    
    }
    }}).then(msg => {msg.delete(3000)});
  };
  
  });

client.on ("guildMemberAdd", member => {

   var role = member.guild.roles.find ("name", "Zombie.");
   member.addRole (role);

});



client.on('ready', () => {
    console.log('I am ready!');
});


let points = JSON.parse(fs.readFileSync('./fkk/3wasmPTS.json', 'utf8'));
var prefix = "_";//البريفكس

client.on('message', message => {
if (!points[message.author.id]) points[message.author.id] = {
	points: 0,
  };
if (message.content.startsWith(prefix + 'لغز')) {
	if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));

const type = require('./fkk/quiz.json');
const item = type[Math.floor(Math.random() * type.length)];
const filter = response => {
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
message.channel.send('**لديك 15 ثانيه لحل هذه الغز**').then(msg => {

			
msg.channel.send(`${item.type}`).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
		message.channel.send(`${collected.first().author} ✅ **احسنت لقد تمكنت من تفكيك الكلمه بسرعه**`);
		console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            message.channel.send(`:x: **لم يتمكن احد من تفكيك الكلمه في الوقت المناسب**`);
			console.log('[Typing] Error: No one type the word.');
          })
		})
	})
}
});

client.on('message', message => {
  if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    };
  if (message.content.startsWith(prefix + 'فكك')) {
    if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));
  
  const type = require('./fkk/fkk.json');
  const item = type[Math.floor(Math.random() * type.length)];
  const filter = response => {
      return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
  };
  message.channel.send('**لديك 15 ثانيه لتفكيك الكلمه**').then(msg => {
  
        
  msg.channel.send(`${item.type}`).then(() => {
          message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
          .then((collected) => {
      message.channel.send(`${collected.first().author} ✅ **احسنت لقد تمكنت من تفكيك الكلمه بسرعه**`);
      console.log(`[Typing] ${collected.first().author} typed the word.`);
              let won = collected.first().author;
              points[won.id].points++;
            })
            .catch(collected => {
              message.channel.send(`:x: **لم يتمكن احد من تفكيك الكلمه في الوقت المناسب**`);
        console.log('[Typing] Error: No one type the word.');
            })
      })
    })
  }
  });


  client.on('message', message => {
    if (!points[message.author.id]) points[message.author.id] = {
      points: 0,
      };
    if (message.content.startsWith(prefix + 'ركب')) {
      if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));
    
    const type = require('./fkk/RKB.json');
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {
        return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };
    message.channel.send('**لديك 15 ثانيه لتركيب الكلمه**').then(msg => {
    
          
    msg.channel.send(`${item.type}`).then(() => {
            message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
            .then((collected) => {
        message.channel.send(`${collected.first().author} ✅ **احسنت لقد تمكنت من تفكيك الكلمه بسرعه**`);
        console.log(`[Typing] ${collected.first().author} typed the word.`);
                let won = collected.first().author;
                points[won.id].points++;
              })
              .catch(collected => {
                message.channel.send(`:x: **لم يتمكن احد من تركيب الكلمه في الوقت المناسب**`);
          console.log('[Typing] Error: No one type the word.');
              })
        })
      })
    }
    });

  client.on('message', message => {
    if (!points[message.author.id]) points[message.author.id] = {
      points: 0,
      };
    if (message.content.startsWith(prefix + 'رياضيات')) {
      if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));
    
    const type = require('./fkk/math.json');
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {
        return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };
    message.channel.send('**لديك 15 ثانيه لحل المسئله**').then(msg => {
    
          
    msg.channel.send(`${item.type}`).then(() => {
            message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
            .then((collected) => {
        message.channel.send(`${collected.first().author} ✅ **احسنت لقد تمكنت من أجابه عن معادله بسرعه**`);
        console.log(`[Typing] ${collected.first().author} typed the word.`);
                let won = collected.first().author;
                points[won.id].points++;
              })
              .catch(collected => {
                message.channel.send(`:x: **لم يتمكن احد من حل معادله في الوقت المناسب**`);
          console.log('[Typing] Error: No one type the word.');
              })
        })
      })
    }
    });

client.on('message', message => {
if (!points[message.author.id]) points[message.author.id] = {
	points: 0,
  };
if (message.content.startsWith(prefix + 'شقلب')) {
	if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));

const type = require('./fkk/SHAKLEB.json');
const item = type[Math.floor(Math.random() * type.length)];
const filter = response => {
    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
message.channel.send('**لديك 15 ثانيه لشقلبة الكلمه**').then(msg => {

			
msg.channel.send(`${item.type}`).then(() => {
        message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
		message.channel.send(`${collected.first().author} ✅ **احسنت,لقد تمكنت من شقلبة الكلمة في الوقت المناسب**`);
		console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            message.channel.send(`:x: **لم يتمكن احد من شقلبة الكلمه في الوقت المناسب**`);
			console.log('[Typing] Error: No one type the word.');
          })
		})
	})
}
});

    client.on('message', message => {
      if (!points[message.author.id]) points[message.author.id] = {
        points: 0,
        };
      if (message.content.startsWith(prefix + 'كتابه')) {
        if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));
      
      const type = require('./fkk/type.json');
      const item = type[Math.floor(Math.random() * type.length)];
      const filter = response => {
          return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
      };
      message.channel.send('** لديك 15 ثانيه لكتابه هذه الكلمه بسرعة**').then(msg => {
      
            
      msg.channel.send(`${item.type}`).then(() => {
              message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
              .then((collected) => {
          message.channel.send(`${collected.first().author} ✅ **احسنت لقد تمكنت من كتابه هذه الكلمه بسرعه**`);
          console.log(`[Typing] ${collected.first().author} typed the word.`);
                  let won = collected.first().author;
                  points[won.id].points++;
                })
                .catch(collected => {
                  message.channel.send(`:x: **لم يتمكن احد من كتابه هذه الكلمه في الوقت المناسب**`);
            console.log('[Typing] Error: No one type the word.');
                })
          })
        })
      }
      });
client.on('message', message => {
if (message.content.startsWith(prefix + 'نقاطي')) {
	if(!message.channel.guild) return message.reply('**هذا الأمر للسيرفرات فقط**').then(m => m.delete(3000));
	let userData = points[message.author.id];
	let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
	.setColor('#000000')
	.setDescription(`نقاطك: \`${userData.points}\``)
	message.channel.sendEmbed(embed)
  }
  fs.writeFile("./fkk/3wasmPTS.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  })
});

client.on('message', message => {
    var prefix = "_";
    
      if (!message.content.startsWith(prefix)) return;
      var args = message.content.split(' ').slice(1);
      var argresult = args.join(' ');
      if (message.author.id == 358499171810148372) return;
    
    
    if (message.content.startsWith(prefix + 'playing')) {
    if (message.author.id !== '234454368072630283') return message.reply('** هذا الأمر فقط لصاحب البوت و شكراًً **')
    client.user.setGame(argresult);
        message.channel.sendMessage(`**${argresult}** : تم تغيير الحالة`)
    } else
    
     
    if (message.content.startsWith(prefix + 'streem')) {
    if (message.author.id !== '368456032399392768') return message.reply('** هذا الأمر فقط لصاحب البوت و شكراًً **')
    client.user.setGame(argresult, "http://twitch.tv/HP");
        message.channel.sendMessage(`**${argresult}** :تم تغيير الحالة الى ستريمنج`)
    } else
    
    if (message.content.startsWith(prefix + 'setname')) {
    if (message.author.id !== '411564557027508235') return message.reply('** هذا الأمر فقط لصاحب البوت و شكراًً **')
      client.user.setUsername(argresult).then
          message.channel.sendMessage(`**${argresult}** : تم تغير الأسم`)
      return message.reply("**لا تستطيع تغير الأسم الا بعد ساعتين**");
    } else
        
    if (message.content.startsWith(prefix + 'setavatar')) {
    if (message.author.id !== '411564557027508235') return message.reply('** هذا الأمر فقط لصاحب البوت و شكراًً **')
    client.user.setAvatar(argresult);
        message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);
    } else
    
    
    if (message.content.startsWith(prefix + 'watching')) {
    if (message.author.id !== '234454368072630283') return message.reply('** هذا الأمر فقط لصاحب البوت و شكراًً **')
        client.user.setActivity(argresult, {type : 'watching'});
     message.channel.sendMessage(`**${argresult}** : تم تغيير الووتشينق الى`)
    }
    
     });



client.on("message", message => {
 if (message.content === "_help") {
        message.react("✅")
           message.react("📬")
  const embed = new Discord.RichEmbed() 
      .setColor("#ffff00")
     .setDescription(`
══════════ஜ۩۞۩ஜ════════════  
     🎮「العاب」🎮
   🎮_فكك
   🎮_لغز
   
   🎮_كتابه
   🎮_رياضيات
   🎮_شقلب
   🎮_ركب
══════════ஜ۩۞۩ஜ════════════ 
 `)

   message.author.sendEmbed(embed)
   
   }
   }); 



// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
