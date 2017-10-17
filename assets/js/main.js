var data = [
    {
        "command": "whoami",
        "response": "Hi! I'm Kimberli, a senior studying Electrical Engineering and Computer Science at MIT."
    },
    {
        "command": "cd info",
    },
    {
        "command": "ls -1",
        "prompt": "~/info",
        "response": "<a href='/resume'>resume</a><br>" + 
                    "<a href='/github'>github</a><br>" + 
                    "<a href='/linkedin'>linkedin</a><br>" + 
                    "<a href='/medium'>medium</a>"
    }
];

function createLevel() {
    var level = $("<div class='level is-mobile'></div>");
    var levelLeft = $("<div class='level-left'></div>");
    level.append(levelLeft);
    $(".code").append(level);
    return levelLeft;
}

function createTyped(element, text, callback) {
    var typed = new Typed(element, {
        strings: [text],
        onComplete: callback, 
    });
}

function addPrompt(index) {
    var level = createLevel();
    var tagName = "command-" + index;
    var prompt = "~";
    if (data[index] && data[index].prompt) {
        prompt = data[index].prompt;
    } else if (index >= data.length) {
        prompt = data[data.length - 1].prompt;
    }
    level.append($("<span class='prompt'>" + prompt + "</span><span class='triangle'></span>"));
    level.append($("<span class='command' id='" + tagName + "'></span>"));
}

function typeCommand(index) {
    createTyped("#command-" + index, data[index].command, function() {
        $(".typed-cursor").hide();
        setTimeout(function() {
            showResponse(index);
            addPrompt(index + 1);
            if (index + 1 === data.length) {
                var field = $("<input class='input' id='user-prompt'></input>");
                $("#command-" + data.length).append(field);
                field.focus();
            } else {
                setTimeout(function() {
                    typeCommand(index + 1);
                }, 250);
            }
        }, 250);
    });
}

function showResponse(index) {
    if (data[index].response) {
        var response = $("<div class='response'></div>");
        response.html(data[index].response);
        $(".code").append(response);
    }
}

$(document).ready(function() {
    addPrompt(0);
    typeCommand(0);
    setTimeout(function() {
    }, 1000);
});
