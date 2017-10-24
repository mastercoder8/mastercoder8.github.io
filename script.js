 $(document).ready(function(){
     /* Emojis - https://afeld.github.io/emoji-css/ */
        chat_data = `Welcome $flower
Tell me a joke
A Geeky one!.. What does a guy say to a Database Admin girl?
Hmm..! no idea
You're a Primary key!.. Get it!? $smile
Nope.. 
You're Unique.. $heart
Haha!!
Another one?!
No any trivia questions?
Sure, Chandler's crush who's also joey's girlfriend?
Is it Katie?
Almost there, It's Kathy $yes
Ok Bye
GoodBye $wave
`

            emoji_dict = {"$smile": '<i class="em em-wink"></i>',
              "$flower": '<i class="em em-blossom"></i>',
              "$heart": '<i class="em em-heart">',//'<img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/16x16/2764.png">',
              "$yes": '<i class="em  em-thumbsup">',
              "$no": '<i class="em  em-thumbsdown">',
              "$wave": '<i class="em em-wave">'
             }

            chat_lines = chat_data.split("\n")
            $(".chat").append(" <ul> </ul>");
            $(".chat ul:last-child").append("<li> mastercoder8: Hello World!.. </li>")
            users = ["jc", "mastercoder8"];
            user_imagemap = {"jc": "./resources/images/robot.png", "mastercoder8": "./resources/images/boy.png"}
            var i =0;
            var intr = setInterval(data,2000);
            console.log("Preloading images")
            getYesOrNoImage("yes")
            getYesOrNoImage("no")
            function emojifi(text_data){
                console.log("Before Text:"  + text_data)
                for(var emoji_text in emoji_dict){
                    var replaceVal = emoji_text;
                    if(text_data.includes(emoji_text)){
                        if(emoji_text === "$yes")   { console.log("emoji text yes"); replaceVal =  getYesOrNoImage('yes')}
                        else if(emoji_text === "$no") { console.log("emoji text no"); replaceVal =  getYesOrNoImage('no')}
                        else {replaceVal = emoji_dict[emoji_text]}
                        console.log("replacing " + emoji_text + " -> " + replaceVal)
                        if(replaceVal == undefined) {replaceVal = emoji_dict[emoji_text]}
                        text_data = text_data.replace(emoji_text, replaceVal);
                    }
                }
                console.log("After Text:"  + text_data)
                return text_data
            }

            function data(){
                chat(users[i%2], emojifi(chat_lines[i]), ".chat ul:last-child");
                i++;
                if(i==chat_lines.length-1) clearInterval(intr);
            }
            function chat(username, str, elem){
                var time = new Date();
                
                var timestamp = ("0" + time.getHours()).slice(-2)   + ":" + 
                    ("0" + time.getMinutes()).slice(-2) + ":" + 
                    ("0" + time.getSeconds()).slice(-2);
                user_with_image = '<a class="user" href="#"><img alt="'+ username + '" src="' + user_imagemap[username]  + '" /></a>'
                message = '<div class="date">' + timestamp + '</div> <div class="message">' + str + '</div>';
                $(elem).prepend("<li class='" + username + "'>" +  user_with_image + message + "</li>")
            }
            
            function getYesOrNoImage(yesorno){
                /* - https://yesno.wtf/api/?force=yes -*/

                fetch("https://yesno.wtf/api/?force=" + yesorno).then(function(response) {
                    return response.json();
                  }).then(function(data) {
                    console.log("Getting image:"  + data["image"])
                    $("#output").attr(yesorno,"<br><img class='yesno' src='" + data["image"] + "'/>")
                  }).catch(function() {
                    console.log("Booo");
                  });
                // setTimeout(function(){console.log("Getting image:"  + $("#output").attr())}, 1000)
                return $("#output").attr(yesorno)
            }
});